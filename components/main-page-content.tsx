"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/hero-section";
import OperatorsSection from "@/components/operators-section";
import MediaSection from "@/components/media-section";
import GameplaySection from "@/components/gameplay-section";
import GoalsSection from "@/components/goals-section";
import NewsSection from "@/components/news-section";
import Footer from "@/components/footer";
import LoadingScreen from "@/components/loading-screen";
import ParticleBackground from "@/components/particle-background";
import Sidebar from "@/components/sidebar";

interface MainPageContentProps {
  skipLoading?: boolean;
  scrollToSection?: string;
}

export default function MainPageContent({
  skipLoading = false,
  scrollToSection
}: MainPageContentProps) {
  const [isLoading, setIsLoading] = useState(!skipLoading);

  useEffect(() => {
    // Prevenir scroll durante o loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";

      // Scrollar para a seção se especificado
      if (scrollToSection) {
        setTimeout(() => {
          const element = document.getElementById(scrollToSection);
          if (element) {
            element.scrollIntoView({ behavior: "auto", block: "start" });
          }
        }, 100);
      }
    }
  }, [isLoading, scrollToSection]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <main className="relative bg-black text-white overflow-hidden">
        <Sidebar />
        <div className="md:ml-20">
          <ParticleBackground />
          <HeroSection />
          <GoalsSection />
          <OperatorsSection />
          <MediaSection />
          <GameplaySection />
          <NewsSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
