"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Mock data matching the reference design
const newsItems = [
  {
    id: 1,
    type: "Avisos",
    date: "29/12/2025",
    title: "O Beta Test II foi encerrado oficialmente",
    image: "/img/div1-2.jpg",
  },
  {
    id: 2,
    type: "Avisos",
    date: "12/12/2025",
    title: "O PlayStation®5 Technical Test de Arknights: Endfield já começou!",
    subtitle: "[ PlayStation®5 Technical Test ]",
    tagline: "Está no ar!",
    image: "/img/fdd0d0c82f36274d5de47aa7881c7b63.jpg",
  },
  {
    id: 3,
    type: "Avisos",
    date: "28/11/2025",
    title: "O Beta Test II termina em breve",
    image: "/img/74d249bb256c8e8795fbeb76605fbddb.jpg",
  },
  {
    id: 4,
    type: "Avisos",
    date: "25/11/2025",
    title: "Dev Comm: Feedback do Beta Test",
    subtitle: "[ Beta Test II ]",
    image: "/img/6f1b1c6b3dc63f12ea4ce1df81d61076.jpg",
  },
  {
    id: 5,
    type: "Eventos",
    date: "20/11/2025",
    title: "Novo trailer de gameplay revelado!",
    subtitle: "[ Gameplay ]",
    image: "/img/div1-2.jpg",
  },
  {
    id: 6,
    type: "Avisos",
    date: "15/11/2025",
    title: "Pré-registro aberto para todos os jogadores",
    image: "/img/fdd0d0c82f36274d5de47aa7881c7b63.jpg",
  },
];

export default function NewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const currentNews = newsItems[currentIndex];

  const handlePrev = () => {
    if (startIndex > 0) {
      const newStartIndex = startIndex - 1;
      setStartIndex(newStartIndex);
      // Update current index to first visible item
      setCurrentIndex(newStartIndex);
    }
  };

  const handleNext = () => {
    if (startIndex + visibleCount < newsItems.length) {
      const newStartIndex = startIndex + 1;
      setStartIndex(newStartIndex);
      // Update current index to first visible item
      setCurrentIndex(newStartIndex);
    }
  };

  const handleCardClick = (itemId: number) => {
    const itemIndex = newsItems.findIndex(n => n.id === itemId);
    setCurrentIndex(itemIndex);

    // If clicked card is outside visible range, adjust startIndex
    if (itemIndex < startIndex) {
      setStartIndex(itemIndex);
    } else if (itemIndex >= startIndex + visibleCount) {
      setStartIndex(itemIndex - visibleCount + 1);
    }
  };

  const visibleItems = newsItems.slice(startIndex, startIndex + visibleCount);


  return (
    <section id="novidades" className="flex min-h-[700px] w-full bg-white pl-32">
      {/* Left Sidebar (Yellow) */}
      <div className="w-20 md:w-28 bg-[#FFE600] flex flex-col items-center justify-between py-8 relative border-r border-black/10 shrink-0">
        {/* Top Icon/Structure - Tower graphic */}
        <div className="w-full px-3">
          <div className="relative w-full aspect-[1/1.5]">
            {/* Simple tower structure */}
            <img src="/tower.png" alt="Tower" className="w-full h-full object-contain" />

          </div>
        </div>

        {/* Vertical Text */}
        <div
          className="text-2xl md:text-3xl font-black tracking-[0.2em] text-black/90 uppercase"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          ENDFIELD
        </div>

        {/* Bottom Line */}
        <div className="w-0.5 h-16 bg-black/70" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-gray-400 font-medium text-sm tracking-widest">
            <span className="text-lg">↘</span> NOTICE
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight uppercase">
            NOVIDADES
          </h2>
        </div>

        {/* Selected News Info */}
        <div className="mb-6 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span className="font-medium">// {currentNews.type}</span>
            <span>{currentNews.date}</span>
          </div>
          <motion.h3
            key={currentNews.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-bold text-black"
          >
            {currentNews.title}
          </motion.h3>
        </div>

        {/* News Carousel */}
        <div className="flex-1 relative">
          <div className="flex gap-4 h-[300px] md:h-[350px]">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, idx) => {
                const isSelected = item.id === currentNews.id;
                const isFirst = idx === 0;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      flex: isFirst && isSelected ? 2 : 1
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => handleCardClick(item.id)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer group ${isSelected ? "ring-2 ring-[#FFE600]" : ""
                      }`}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* Logo Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-black/80 px-2 py-1 flex items-center gap-1">
                        <div className="w-4 h-4 border border-white/50 flex items-center justify-center text-[8px] text-white font-bold">
                          E
                        </div>
                        <span className="text-white text-[10px] font-bold tracking-wide">ENDFIELD</span>
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 md:p-6">
                      {item.subtitle && (
                        <div className="mb-2">
                          <span className="bg-[#FFE600] text-black px-2 py-1 text-xs font-bold uppercase">
                            {item.subtitle}
                          </span>
                        </div>
                      )}

                      <h4 className={`font-black text-white uppercase leading-tight ${isFirst && isSelected ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
                        }`}>
                        {item.tagline || item.title}
                      </h4>

                      {/* Caption line */}
                      <div className="mt-3 flex items-center gap-2 text-white/60 text-[10px]">
                        <span>→ CAPTION</span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#FFE600]/0 group-hover:bg-[#FFE600]/10 transition-colors duration-300" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-6">
            {/* Arrow buttons */}
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + visibleCount >= newsItems.length}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* More Info Button */}
            <button className="h-10 bg-[#222] text-white px-6 font-bold text-xs uppercase tracking-wider flex items-center gap-3 hover:bg-black transition-colors ml-2">
              <div className="w-1 h-4 bg-[#FFE600]" />
              Mais Informações
            </button>
          </div>
        </div>
      </div>
    </section >
  );
}

