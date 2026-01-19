"use client";

import { useEffect, useRef, useState } from "react";

interface TransparentVideoProps {
  src: string;
  loop?: boolean;
  muted?: boolean; // Default true usually
  autoPlay?: boolean;
  className?: string;
  onEnded?: () => void;
}

export default function TransparentVideo({
  src,
  loop = false,
  muted = true,
  autoPlay = true,
  className,
  onEnded,
}: TransparentVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reqIdRef = useRef<number | null>(null);

  // To handle src changes reliably
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl", { alpha: true });
    } catch (e) {
      console.error("WebGL initialization failed", e);
    }

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Shaders
    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `;

    // Fragment Shader - Side-by-Side (Left: RGB, Right: Alpha)
    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        // Left half for color (RGB)
        vec2 colorUV = vec2(v_texCoord.x * 0.5, v_texCoord.y);
        // Right half for alpha (Alpha usually in R channel of grayscale mask)
        vec2 alphaUV = vec2(v_texCoord.x * 0.5 + 0.5, v_texCoord.y);
        
        vec4 color = texture2D(u_image, colorUV);
        vec4 alpha = texture2D(u_image, alphaUV);
        
        // Use Red channel of the right side as alpha
        gl_FragColor = vec4(color.rgb, alpha.r);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    };

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertShader || !fragShader) return;

    const program = createProgram(gl, vertShader, fragShader);
    if (!program) return;

    // Buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 1.0,
        1.0, 1.0,
        0.0, 0.0,
        0.0, 0.0,
        1.0, 1.0,
        1.0, 0.0,
      ]),
      gl.STATIC_DRAW
    );

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // Removed as it flips video upside down
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Attributes
    const positionLoc = gl.getAttribLocation(program, "a_position");
    const texCoordLoc = gl.getAttribLocation(program, "a_texCoord");

    // Render loop
    const render = () => {
      if (!gl || !video || !canvas) return;

      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        // Resize canvas to match the HALF width of the video (since it's side-by-side)
        // We use clientHeight/clientWidth to respond to layout changes
        const displayWidth = video.videoWidth / 2;
        const displayHeight = video.videoHeight;

        // Update canvas internal resolution if needed
        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          canvas.width = displayWidth || 1;
          canvas.height = displayHeight || 1;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(texCoordLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      reqIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      // Basic cleanup
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteTexture(texture);
      }
    };
  }, [src]); // Re-init on src change

  // Handle video element props
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.src !== window.location.origin + src && videoRef.current.src !== src) {
        videoRef.current.src = src;
        videoRef.current.load();
        if (autoPlay) {
          videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
        }
      }
    }
  }, [src, autoPlay]);


  return (
    <div ref={containerRef} className={`relative ${className} flex items-end`}>
      <video
        ref={videoRef}
        muted={muted}
        loop={loop}
        onEnded={onEnded}
        playsInline
        className="hidden" // Hide the raw video
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className="w-full h-auto object-contain pointer-events-none"
      />
    </div>
  );
}
