"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronUp, Globe } from "lucide-react";
import { useState } from "react";

const footerLinks = [
  { label: "Termos do Serviço", href: "#" },
  { label: "Política de Privacidade", href: "#" },
  { label: "Contactar-nos", href: "#" },
];

export default function Footer() {
  const [language, setLanguage] = useState("Português");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer className="relative">
      {/* Main Banner Section */}
      <div className="relative bg-white">
        {/* Black Header Bar */}


        {/* Content Area with Black Sidebar */}
        <div className="flex">
          {/* Black Left Sidebar */}


          {/* Main Content */}
          <div className="flex-1 relative">
            {/* White/Gray Area with Construction Image extending up */}
            <div className="bg-gradient-to-b from-gray-100 to-[#FFE600] min-h-[200px] relative overflow-visible">
              {/* Yellow Banner with centered text */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#FFE600] py-8 md:py-12">
                <div className="text-center">
                  <div className="text-black/70 text-sm md:text-base font-medium mb-2 flex items-center justify-center gap-1">
                    <span className="text-[#E91E63] text-lg">■</span> Pré-inscrição concluída
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase tracking-tight leading-none">
                    BOAS-VINDAS A TALOS-II
                  </h2>
                </div>
              </div>

              {/* Construction Image - positioned to extend from yellow into white area */}
              <div className="absolute right-4 md:right-12 lg:right-20 bottom-0 w-[250px] md:w-[350px] lg:w-[450px] h-[200px] md:h-[280px] lg:h-[320px] pointer-events-none z-10">
                <img
                  src="/constructionfooter.png"
                  alt="Construction"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Selector - Black bar */}
      <div className="bg-[#1a1a1a] py-6">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="text-center">
            <div className="text-white/50 text-xs mb-2">Selecionar idioma</div>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-6 py-3 border border-white/30 bg-transparent hover:border-white/50 transition-colors min-w-[200px] justify-between"
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-white/60" />
                  <span className="text-white text-sm">{language}</span>
                </div>
                <ChevronUp className={`w-4 h-4 text-white/60 transition-transform ${isOpen ? "" : "rotate-180"}`} />
              </button>
              {isOpen && (
                <div className="absolute bottom-full left-0 w-full bg-[#222] border border-white/20 mb-1 z-20">
                  {["Português", "English", "Español", "日本語", "한국어", "中文"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-white/70 hover:bg-white/10 hover:text-white text-sm transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Black */}
      <div className="bg-black py-12">
        <div className="container mx-auto px-4 flex flex-col items-center">
          {/* Endfield Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-center">
              <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] mb-1">Arknights</div>
              <div className="text-white text-4xl font-black tracking-wider flex items-center gap-2">
                ENDFIELD
                <span className="text-white/30 text-sm font-normal">明日方舟：终末地</span>
              </div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8"
          >
            {footerLinks.map((link, index) => (
              <div key={link.label} className="flex items-center gap-4 md:gap-8">
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="text-white/20 hidden md:inline">|</span>
                )}
              </div>
            ))}
          </motion.div>

          {/* PEGI Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <img
              src="/img/PEGI.36702e64a7e0452b7bcf.png"
              alt="PEGI 12"
              className="h-16 object-contain"
            />
          </motion.div>

          {/* Legal Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-white/30 text-[10px] leading-relaxed max-w-4xl mb-8 px-4"
          >
            <p className="mb-2">
              "PlayStation Family Mark", "PlayStation" and "PS5 logo" are registered trademarks or trademarks of Sony Interactive Entertainment Inc.
            </p>
            <p>
              Epic, Epic Games, Epic Games Store, the Epic Games Store logo, and Epic Online Services are trademarks and/or registered trademarks of Epic Games. All other trademarks are the property of their respective owners.
            </p>
          </motion.div>

          {/* Company Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6"
          >
            <img
              src="/img/copyright.160113cbd1f4597b075d.png"
              alt="Company Logos"
              className="h-6 object-contain opacity-60"
            />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

