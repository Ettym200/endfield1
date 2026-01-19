"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Custom SVG Icons matching the official site
const CrosshairIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <path d="M12 8l4 4-4 4-4-4 4-4z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const FlagIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 21V4" />
    <path d="M4 4h12l-2 6 2 6H4" />
  </svg>
);

const OperatorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <circle cx="12" cy="9" r="3" />
    <path d="M8 17h8" />
    <path d="M8 14h8" />
  </svg>
);

const StoryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4z" />
    <path d="M8 8h8M8 12h8M8 16h4" />
    <path d="M16 4v4h4" />
  </svg>
);

const MediaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const GamepadIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="6" width="12" height="12" rx="1" />
    <path d="M12 9v6M9 12h6" />
  </svg>
);

const NewsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4z" />
    <path d="M8 8h8M8 12h8M8 16h4" />
    <circle cx="17" cy="7" r="2" fill="currentColor" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3 7h7l-5.5 5 2 7L12 17l-6.5 4 2-7L2 9h7z" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15 9a3 3 0 010 6M18 6a7 7 0 010 12" />
  </svg>
);

export default function Sidebar() {
  const [activeIcon, setActiveIcon] = useState("home");
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");
  const [userCount, setUserCount] = useState("12,847,293");
  const pathname = usePathname();

  // Mapear ícones para seções da página
  const mainIcons = [
    { id: "home", icon: CrosshairIcon, label: "Início", href: "/" },
    { id: "metas", icon: FlagIcon, label: "Metas de Pré-Inscrição", href: "/metas" },
    { id: "operadores", icon: OperatorIcon, label: "Operadores", href: "/operadores" },
    { id: "historia", icon: StoryIcon, label: "História", href: "/historia" },
    { id: "midia", icon: MediaIcon, label: "Mídia", href: "/midia" },
    { id: "jogabilidade", icon: GamepadIcon, label: "Jogabilidade", href: "/jogabilidade" },
    { id: "novidades", icon: NewsIcon, label: "Novidades", href: "/novidades" },
  ];

  // Atualizar horário
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toISOString().replace("T", " ").slice(0, 19);
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Detectar seção atual no scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = mainIcons.map(icon => icon.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIcon(mainIcons[i].id);
          const newUrl = mainIcons[i].id === "home" ? "/" : `/${mainIcons[i].id}`;
          if (pathname !== newUrl) {
            window.history.replaceState(null, "", newUrl);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Função para navegação
  const navigateToSection = (item: typeof mainIcons[0]) => {
    setActiveIcon(item.id);
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", item.href);
    }
  };

  return (
    <>
      {/* Sidebar Principal */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 top-0 z-50 hidden md:flex flex-col"
        style={{
          width: "80px",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Linha de gradiente colorida na borda direita */}
        <div
          className="absolute right-0 top-0 bottom-0 w-[2px]"
          style={{
            background: "linear-gradient(180deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%)",
          }}
        />

        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center py-6">
            <div className="text-white font-bold text-[10px] leading-tight tracking-wider">
              <div className="flex flex-col items-center">
                <span>END</span>
                <div className="flex items-center gap-0.5">
                  <span>FIELD</span>
                  <div className="w-1.5 h-1.5 bg-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation Icons */}
          <nav className="flex-1 flex flex-col items-center gap-1 px-2">
            {mainIcons.map((item) => {
              const Icon = item.icon;
              const isActive = activeIcon === item.id;
              const isHovered = hoveredIcon === item.id;

              return (
                <motion.button
                  key={item.id}
                  onMouseEnter={() => setHoveredIcon(item.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  onClick={() => navigateToSection(item)}
                  className="relative w-full py-3 flex items-center justify-center transition-all duration-200"
                  style={{
                    backgroundColor: isActive || isHovered ? "rgba(255, 255, 255, 0.95)" : "transparent",
                    color: isActive || isHovered ? "#000" : "#888",
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={item.label}
                  title={item.label}
                >
                  <Icon />

                  {/* Tooltip com label */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-full ml-4 px-3 py-2 whitespace-nowrap z-50"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          color: "#000",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {item.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          {/* Ícones secundários (Conta, Criadores, Som) */}
          <div className="flex flex-col items-center gap-1 px-2 mb-4">
            <div
              className="w-full py-2 flex flex-col items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            >
              <div className="text-gray-500 hover:text-white transition-colors">
                <UserIcon />
              </div>
              <div className="text-gray-500 hover:text-white transition-colors">
                <StarIcon />
              </div>
              <div className="text-gray-500 hover:text-white transition-colors">
                <VolumeIcon />
              </div>
            </div>
          </div>

          {/* Status Footer HUD estilo */}
          <div
            className="px-2 py-3 text-center border-t border-gray-800"
            style={{ fontSize: "7px", color: "#555", fontFamily: "monospace" }}
          >
            <div className="leading-relaxed">
              <div>{`>> -\\ ENDFIELD`}</div>
              <div>{`> X: ${userCount}`}</div>
              <div>{`>> [${currentTime}]`}</div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Botão de Pré-Inscrição Vertical */}
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="fixed hidden md:flex flex-col items-center justify-start z-40 cursor-pointer hover:opacity-90 transition-opacity"
        style={{
          left: "82px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "200px",
          backgroundColor: "#000",
          border: "1px solid #333",
        }}
      >
        {/* Ícone da seta amarela */}
        <div
          className="w-full flex items-center justify-center"
          style={{
            backgroundColor: "#FFD700",
            height: "32px",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Texto vertical */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontSize: "10px",
            color: "#fff",
            letterSpacing: "2px",
            fontWeight: 500,
          }}
        >
          PRÉ-INSCRIÇÃO
        </div>
      </motion.button>
    </>
  );
}


