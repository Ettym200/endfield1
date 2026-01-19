"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"bar" | "close" | "open" | "done">("bar");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fase 1: Barra caindo
    const barTimer = setTimeout(() => {
      setPhase("close");
    }, 1500);

    // Fase 2: Tela fechando em amarelo
    const closeTimer = setTimeout(() => {
      setPhase("open");
    }, 1900);

    // Fase 3: Abrindo o site
    const openTimer = setTimeout(() => {
      setPhase("done");
      setTimeout(() => {
        onComplete();
      }, 400);
    }, 2500);

    // Animação de progresso
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 3;
      });
    }, 30);

    return () => {
      clearTimeout(barTimer);
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] overflow-hidden"
        >
          {/* Background com imagem */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/img/initial.jpg')",
            }}
          >
            {/* Overlay para escurecer/clarear conforme a fase */}
            <motion.div
              animate={{
                backgroundColor:
                  phase === "close" || phase === "open"
                    ? "rgba(255, 215, 0, 0.8)"
                    : "rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            />
          </motion.div>

          {/* Fase 1: Barra caindo do canto superior esquerdo */}
          <AnimatePresence>
            {phase === "bar" && (
              <motion.div
                initial={{ x: "-100%", y: "-100%" }}
                animate={{ x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 100,
                }}
                className="absolute top-0 left-0 w-1 bg-white z-10"
                style={{ height: `${progress}%` }}
              >
                {/* Indicador de progresso na barra */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-0 left-0 w-full h-1 bg-yellow-400"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fase 2 e 3: Animação de fechar/abrir em amarelo */}
          {(phase === "close" || phase === "open") && (
            <>
              {/* Parte superior fechando */}
              <motion.div
                initial={
                  phase === "close"
                    ? { y: "-100%" }
                    : { y: "-100%", backgroundColor: "#FFD700" }
                }
                animate={
                  phase === "close"
                    ? { y: 0, backgroundColor: "#FFD700" }
                    : { y: "-100%", backgroundColor: "#000000" }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-yellow-400 z-20"
              />

              {/* Parte inferior fechando */}
              <motion.div
                initial={
                  phase === "close"
                    ? { y: "100%" }
                    : { y: "100%", backgroundColor: "#FFD700" }
                }
                animate={
                  phase === "close"
                    ? { y: 0, backgroundColor: "#FFD700" }
                    : { y: "100%", backgroundColor: "#000000" }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-yellow-400 z-20"
              />
            </>
          )}

          {/* Logo/texto no centro durante o loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase === "close" ? 0 : 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold text-white mb-4"
              >
                ENDFIELD
              </motion.h1>
              {phase === "bar" && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "200px" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-1 bg-white/30 mx-auto mt-4 overflow-hidden"
                >
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-white"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

