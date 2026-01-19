"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Videos oficiais do Arknights: Endfield
const mediaItems = [
  {
    id: 1,
    title: "Vídeo promocional do Beta Test II de [Arknights: Endfield]",
    date: "31/10/2025",
    type: "Beta Test II",
    videoSrc: "https://web-static.hg-cdn.com/upload/video/20251031/8b5a6a80385a8e0fef33f3b6ae0a919a.mp4",
    thumbnail: "/video1-thumb.jpg",
  },
  {
    id: 2,
    title: "Endfield: Those Who Stayed - Trailer Oficial",
    date: "31/10/2025",
    type: "Trailer",
    videoSrc: "https://web-static.hg-cdn.com/upload/video/20251031/9b64cb21f874e7770db6541da08b3ae9.mp4",
    thumbnail: "/video2-thumb.jpg",
  },
  {
    id: 3,
    title: "Arknights: Endfield - Teaser Oficial",
    date: "31/10/2025",
    type: "Teaser",
    videoSrc: "https://web-static.hg-cdn.com/upload/video/20251031/4822bd96bbd037fe24a4ddd7bee30462.mp4",
    thumbnail: "/video3-thumb.jpg",
  },
  {
    id: 4,
    title: "Arknights: Endfield - Teaser Demo",
    date: "31/10/2025",
    type: "Teaser Demo",
    videoSrc: "https://web-static.hg-cdn.com/upload/video/20251031/cd990ba3093db8c9f42d55045f44b447.mp4",
    thumbnail: "/video4-thumb.jpg",
  },
  {
    id: 5,
    title: "Arknights: Endfield - Gameplay Demo 2",
    date: "31/10/2025",
    type: "Gameplay Demo",
    videoSrc: "https://web-static.hg-cdn.com/upload/video/20251031/a5e3e0f808648a62aaf383ac5104082c.mp4",
    thumbnail: "/video5-thumb.jpg",
  },
];

export default function MediaSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const currentItem = mediaItems[currentIndex];

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="midia" className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.video
            key={currentItem.videoSrc} // Key change triggers animation
            src={currentItem.videoSrc}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-8 h-full relative z-20 flex flex-col justify-between md:justify-center pointer-events-none py-20 md:py-0">

        {/* Header */}
        <div className="relative md:absolute md:top-12 md:left-12 pointer-events-auto mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-xs"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}>
              ↘
            </div>
            <span className="text-white text-sm tracking-widest font-bold">INFORMATION</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter uppercase">
            MÍDIA
          </h2>
        </div>

        {/* Main Info Display */}
        <div className="relative md:mt-auto md:mb-12 md:max-w-2xl pointer-events-auto flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="bg-white/20 px-2 py-1 text-xs text-white/80 uppercase backdrop-blur-sm">
                {currentItem.type}
              </span>
              <span className="text-[#FFE600] font-mono text-sm font-bold">
                {currentItem.date}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-white leading-tight min-h-[3rem] md:min-h-0">
              {currentItem.title}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 md:w-16 md:h-16 bg-[#FFE600] flex items-center justify-center text-black hover:bg-white transition-colors shrink-0">
              <Play className="fill-current w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button className="h-12 md:h-16 px-6 md:px-8 border border-white/20 bg-black/50 text-white hover:bg-white/10 transition-colors backdrop-blur-sm uppercase text-xs md:text-sm font-bold tracking-widest flex items-center gap-2 whitespace-nowrap">
              <span className="w-1 h-3 md:w-1 md:h-4 bg-[#FFE600] mr-2" />
              Mais vídeos
            </button>
          </div>
        </div>

        {/* Shadcn Carousel */}
        <div className="relative md:absolute md:bottom-12 md:right-12 pointer-events-auto mt-8 md:mt-0 w-full md:w-auto">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="w-full max-w-full md:max-w-[600px]"
          >
            <CarouselContent className="-ml-3 md:-ml-4">
              {mediaItems.map((item, index) => {
                const isActive = index === currentIndex;
                return (
                  <CarouselItem key={item.id} className="pl-3 md:pl-4 basis-1/2 md:basis-1/3 min-w-0">
                    <button
                      onClick={() => {
                        setCurrentIndex(index);
                        api?.scrollTo(index);
                      }}
                      className={`relative w-full aspect-video transition-all duration-300 group
                                   ${isActive ? "border-2 border-[#FFE600]" : "border border-white/20 opacity-60 hover:opacity-100"}
                                 `}
                    >
                      {/* Thumbnail Placeholder */}
                      <div className="w-full h-full bg-gray-800 relative overflow-hidden">
                        <video src={item.videoSrc} className="w-full h-full object-cover pointer-events-none" muted />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />

                        {/* Overlay Text */}
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/90 to-transparent text-left">
                          {isActive && (
                            <div className="text-[#FFE600] text-[8px] md:text-[10px] font-bold uppercase mb-1">
                              NOW PLAYING
                            </div>
                          )}
                          <div className="text-white text-[10px] md:text-xs font-bold truncate">
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="absolute -top-10 right-0 flex gap-2">
              <CarouselPrevious className="static translate-y-0 translate-x-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 border-0" />
              <CarouselNext className="static translate-y-0 translate-x-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 border-0" />
            </div>
          </Carousel>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
          <div
            className="h-full bg-[#FFE600] transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / mediaItems.length) * 100}%` }}
          />
        </div>

      </div>
    </section>
  );
}
