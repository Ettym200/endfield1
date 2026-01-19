"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

const gameplayItems = [
  {
    id: 1,
    title: "Combate em Equipe",
    description: "Lidere sua equipe na batalha, trabalhando em sincronia e usando combos de habilidades para derrotar todos os tipos de inimigos. Unam-se para proteger nossa Terra.",
    image: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/video/02.9ab299.mp4", // Placeholder
  },
  {
    id: 2,
    title: "Exploração de Mundo",
    description: "Viaje por vastos terrenos e descubra segredos antigos enterrados sob a superfície. Cada região oferece desafios únicos e recompensas valiosas.",
    image: "/gameplay/gameplay2.mp4",
  },
  {
    id: 3,
    title: "Construção de Base",
    description: "Estabeleça postos avançados e automatize a produção de recursos. Sua base é o coração de suas operações em Talos-II.",
    image: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/video/04.7beddb.mp4",
  }
];

export default function GameplaySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const changingSlide = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
    }, 400); // Wait for half the animation (cover screen)
    setTimeout(() => {
      setIsAnimating(false);
    }, 800); // Total animation duration
  };

  const nextSlide = () => {
    changingSlide((currentIndex + 1) % gameplayItems.length);
  };

  const prevSlide = () => {
    changingSlide((currentIndex - 1 + gameplayItems.length) % gameplayItems.length);
  };

  return (
    <section id="jogabilidade" className="relative min-h-screen bg-white overflow-hidden pb-20">

      {/* Top Scrolling Header */}
      <div className="w-full overflow-hidden border-b border-black/10 py-4 mb-12">
        <motion.div
          className="whitespace-nowrap text-[120px] md:text-[180px] leading-none font-black text-black tracking-tighter"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          ENDFIELD // ENDFIELD // ENDFIELD // ENDFIELD //
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-16">

        {/* Left Sidebar Info */}
        <div className="w-full md:w-64 shrink-0 pt-8">
          <div className="mb-8">
            <div className="bg-gray-200 px-2 py-1 text-xs font-mono inline-block mb-2">
              GAMEPLAY
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight">JOGABILIDADE</h2>
          </div>

          {/* Decorative Tech Elements */}
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-1 w-24 opacity-30">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`w-full aspect-square ${i === 7 ? "bg-[#FFE600]" : "bg-black"}`} />
              ))}
            </div>

            <div className="w-1 bg-gradient-to-b from-[#00ffcc] via-yellow-400 to-transparent h-16" />
          </div>

          {/* Bottom Icon (Placeholder) */}
          <div className="mt-24 w-16 h-20 bg-gray-200" />
        </div>

        {/* Main Showcase */}
        <div className="flex-1 max-w-5xl">
          <div className="relative">
            {/* Image Container */}
            <div className="relative aspect-video w-full bg-gray-900 group overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-[#222]">
                    {/* Placeholder for actual image */}
                    {gameplayItems[currentIndex].image && (
                      gameplayItems[currentIndex].image.endsWith(".mp4") || gameplayItems[currentIndex].image.includes(".mp4") ? (
                        <video
                          key={gameplayItems[currentIndex].image}
                          src={gameplayItems[currentIndex].image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover opacity-80"
                          onError={(e) => {
                            console.error("Erro ao carregar vídeo:", gameplayItems[currentIndex].image);
                          }}
                        />
                      ) : (
                        <img
                          src={gameplayItems[currentIndex].image}
                          alt={gameplayItems[currentIndex].title}
                          className="w-full h-full object-cover opacity-80"
                        />
                      )
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Wipe Animation Overlays */}
              {/* Wipe Animation Overlays */}
              <motion.div
                className="absolute inset-0 bg-[#FFE600] z-40 pointer-events-none"
                initial={{ x: "100%" }}
                animate={isAnimating ? { x: ["100%", "0%", "-100%"] } : { x: "100%" }}
                transition={isAnimating ? { duration: 0.8, ease: "easeInOut", times: [0, 0.4, 1] } : { duration: 0 }}
              />
              <motion.div
                className="absolute inset-0 bg-[#222] z-30 pointer-events-none"
                initial={{ x: "100%" }}
                animate={isAnimating ? { x: ["100%", "0%", "-100%"] } : { x: "100%" }}
                transition={isAnimating ? { duration: 0.8, ease: "easeInOut", delay: 0.15, times: [0, 0.4, 1] } : { duration: 0 }}
              />

              {/* Yellow Vertical Bar */}
              <div className="absolute top-0 right-0 w-32 md:w-40 h-full bg-[#FFE600] flex flex-col items-center justify-start pt-40 border-l border-white/20 z-50">
                <div
                  className="vertical-rl text-black font-black text-3xl md:text-5xl tracking-widest uppercase whitespace-nowrap rotate-90 "
                >
                  GAMEPLAY
                </div>

                <div className="absolute bottom-8 w-12 h-12 border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-black rounded-full" />
                </div>
              </div>

              {/* Navigation Buttons (Overlaid on Bottom Left of Image) */}
              <div className="absolute bottom-6 left-6 flex gap-2 z-20">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-lg"
                >
                  <ChevronLeft className="text-black" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors shadow-lg"
                >
                  <ChevronRight className="text-black" />
                </button>
              </div>
            </div>
          </div>

          {/* Text Description Details */}
          <div className="mt-8 max-w-2xl">
            <div className="flex items-baseline gap-2 mb-2 font-mono text-sm text-gray-500 font-bold">
              {currentIndex + 1} / {gameplayItems.length}
            </div>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-black">{gameplayItems[currentIndex].title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {gameplayItems[currentIndex].description}
              </p>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}


