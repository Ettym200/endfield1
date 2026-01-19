"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import EnhancedThreeScene from "@/components/enhanced-three-scene";
import ModelLoader from "@/components/model-loader";
import CharacterVideo from "@/components/character-video";

// Modelos disponíveis na pasta public/models
const availableModels = [
  "/models/just_a_girl.glb",
  "/models/sitting_girl.glb",
  "/models/fox_in_a_cape.glb",
  "/models/free_1972_datsun_240k_gt.glb",
];

const operators = [
  {
    id: 1,
    name: "Endministrator",
    faction: "Endfield Industries",
    race: "Não divulgado",
    description:
      "O Endministrator da Endfield Industries. Na história registrada de Talos-II, o Endministrator é um guardião fundamental que protegeu a civilização neste planeta e salvou a humanidade de inúmeros desastres catastróficos. Os feitos heroicos de Endmin deram origem a muitas histórias, contos e até rumores. No entanto, a identidade de Endmin permanece desconhecida.",
    model3D: availableModels[0],
    image: "/img/operator-1-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/endministrator1.ec409283.png",
    videoIntro: "/personagem/endimistration1.mp4",
    videoLoop: "/personagem/endimistration2.mp4",
  },
  {
    id: 2,
    name: "Perlica",
    faction: "Endfield Industries",
    race: "Liberi",
    description:
      "Uma operadora dedicada da Endfield Industries com habilidades excepcionais de reconhecimento e supervisão. Conhecida por sua lealdade e eficiência nas missões.",
    model3D: availableModels[1],
    image: "/personagem/perlica.b24be972.png",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/perlica.b24be972.png",
    videoIntro: "/personagem/perlica1.mp4",
    videoLoop: "/personagem/perlica2.mp4",
  },
  {
    id: 3,
    name: "Wulfgard",
    faction: "Wild Unit",
    race: "Lupo",
    description:
      "Um guerreiro feroz e leal, especialista em combate corpo a corpo. Wulfgard protege seus aliados com ferocidade implacável e instintos aguçados de caçador.",
    model3D: availableModels[2],
    image: "/img/operator-3-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/wulfgard.53a6686b.png",
    videoIntro: "/personagem/wulfgard1.mp4",
    videoLoop: "/personagem/wulfgard2.mp4",
  },
  {
    id: 4,
    name: "Xaihi",
    faction: "Mechanical Division",
    race: "Savra",
    description:
      "Especialista em tecnologia e sistemas mecânicos avançados. Xaihi combina inteligência aguçada com habilidades técnicas excepcionais para resolver qualquer problema.",
    model3D: availableModels[3],
    image: "/img/operator-4-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/xaihi.43d608d9.png",
    videoIntro: "/personagem/xaihi1.mp4",
    videoLoop: "/personagem/xaihi2.mp4",
  },
  {
    id: 5,
    name: "Estella",
    faction: "Endfield Industries",
    race: "Vouivre",
    description:
      "Uma guerreira determinada com poderes dracônicos. Estella é conhecida por sua força incomparável e seu espírito inabalável em batalha.",
    model3D: availableModels[0],
    image: "/img/operator-5-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/estella.fbad0dc2.png",
    videoIntro: "/personagem/estella1.mp4",
    videoLoop: "/personagem/estella2.mp4",
  },
  {
    id: 6,
    name: "Avywenna",
    faction: "Endfield Industries",
    race: "Elafia",
    description:
      "Uma operadora graciosa e habilidosa, especializada em suporte e cura. Avywenna traz esperança ao campo de batalha com suas habilidades místicas.",
    model3D: availableModels[1],
    image: "/img/operator-6-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/avywenna.3346feee.png",
    videoIntro: "/personagem/Avywenna1.mp4",
    videoLoop: "/personagem/Avywenna2.mp4",
  },
  {
    id: 7,
    name: "Laevatain",
    faction: "Endfield Industries",
    race: "Sarkaz",
    description:
      "Uma guerreira lendária empunhando uma espada flamejante. Laevatain é temida por seus inimigos e respeitada por seus aliados por seu poder devastador.",
    model3D: availableModels[2],
    image: "/img/operator-7-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/laevatain.d0ca2837.png",
    videoIntro: "/personagem/Laevatain1.mp4",
    videoLoop: "/personagem/Laevatain2.mp4",
  },
  {
    id: 8,
    name: "Yvonne",
    faction: "Endfield Industries",
    race: "Liberi",
    description:
      "Uma estrategista brilhante com visão aguçada. Yvonne coordena operações complexas e guia sua equipe com precisão e inteligência.",
    model3D: availableModels[3],
    image: "/img/operator-8-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/yvonne.a74396e6.png",
    videoIntro: "/personagem/Yvonne1.mp4",
    videoLoop: "/personagem/Yvonne2.mp4",
  },
  {
    id: 9,
    name: "Fluerite",
    faction: "Endfield Industries",
    race: "Cautus",
    description:
      "Uma especialista em cristais e energia elemental. Fluerite manipula forças místicas para proteger aliados e devastar inimigos.",
    model3D: availableModels[0],
    image: "/img/operator-9-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/fluorite.9071d26e.png",
    videoIntro: "/personagem/fluerite1.mp4",
    videoLoop: "/personagem/fluerite2.mp4",
  },
  {
    id: 10,
    name: "Snowshine",
    faction: "Endfield Industries",
    race: "Ursus",
    description:
      "Uma operadora com o poder do gelo eterno. Snowshine congela seus inimigos com habilidades criocinéticas e traz a calma do inverno ao caos da batalha.",
    model3D: availableModels[1],
    image: "/img/operator-10-thumb.jpg",
    image2D: "https://web-static.hg-cdn.com/endfield/official-v4/_next/static/media/snowshine.1f6d3a0e.png",
    videoIntro: "/personagem/snowshine1.mp4",
    videoLoop: "/personagem/snowshine2.mp4",
  },
];

export default function OperatorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [is3D, setIs3D] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const currentOperator = operators[currentIndex];

  const handleToggle = () => {
    setIsGlitching(true);
    // Glitch effect duration - rapid flickers
    setTimeout(() => {
      setIs3D(!is3D);
      setTimeout(() => setIsGlitching(false), 200);
    }, 400);
  };

  const nextOperator = () => {
    setCurrentIndex((prev) => (prev + 1) % operators.length);
  };

  const prevOperator = () => {
    setCurrentIndex((prev) => (prev - 1 + operators.length) % operators.length);
  };

  return (
    <section
      id="operadores"
      className="relative min-h-screen bg-white text-black overflow-hidden flex items-center"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-gray-200 to-transparent" />
      </div>

      {/* Background Typography "ENDFIELD" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[15vw] font-black text-transparent leading-none opacity-10 tracking-widest"
          style={{ WebkitTextStroke: "2px #e5e5e5" }}>
          ENDFIELD
        </h1>
      </div>

      {/* Layout Container */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-screen flex flex-col md:flex-row gap-8 items-center justify-center">

        {/* Left Sidebar - Navigation */}
        <div className="hidden md:flex flex-col items-center gap-4 mr-12 z-20">
          <button
            onClick={prevOperator}
            className="p-3 border border-black/20 rounded-full hover:bg-black/10 transition-colors bg-white shadow-md"
          >
            <ChevronUp className="w-5 h-5 text-black/70" />
          </button>

          <div className="flex flex-col gap-3 relative">
            {/* Connector Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2 -z-10" />

            {/* Show only 3 operators at a time, centered on current */}
            {(() => {
              const visibleCount = 3;
              let startIndex = currentIndex - 1;

              // Adjust start index to keep 3 visible
              if (startIndex < 0) startIndex = 0;
              if (startIndex > operators.length - visibleCount) startIndex = operators.length - visibleCount;

              const visibleOperators = operators.slice(startIndex, startIndex + visibleCount);

              return visibleOperators.map((op) => {
                const actualIndex = operators.findIndex(o => o.id === op.id);
                return (
                  <button
                    key={op.id}
                    onClick={() => setCurrentIndex(actualIndex)}
                    className={`relative w-14 h-14 rounded-full border-2 overflow-hidden transition-all duration-300 ${actualIndex === currentIndex
                      ? "border-[#FFE600] scale-110 shadow-lg ring-4 ring-[#FFE600]/30"
                      : "border-gray-300 opacity-60 hover:opacity-100"
                      }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className={`text-sm font-bold ${actualIndex === currentIndex ? 'text-black' : 'text-gray-400'}`}>
                        {op.id}
                      </span>
                    </div>
                  </button>
                );
              });
            })()}
          </div>

          {/* Page indicator */}
          <div className="text-xs font-mono text-gray-400">
            {String(currentIndex + 1).padStart(2, '0')}/{String(operators.length).padStart(2, '0')}
          </div>

          <button
            onClick={nextOperator}
            className="p-3 border border-black/20 rounded-full hover:bg-black/10 transition-colors bg-white shadow-md"
          >
            <ChevronDown className="w-5 h-5 text-black/70" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full relative grid grid-cols-1 md:grid-cols-2 gap-0 items-center">

          {/* Info Column (Left overlap) */}
          <div className="relative z-20 md:pr-12 pointer-events-none md:pointer-events-auto">
            <motion.div
              key={`info-${currentIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header Tags */}
              <div className="flex items-center gap-4 mb-6 text-xs font-mono text-gray-400 tracking-wider">
                <span className="flex items-center gap-2">
                  [ <span className="w-2 h-2 rounded-full bg-[#FFE600]" /> REC ]
                </span>
                <span className="w-px h-3 bg-gray-300" />
                <span>{currentOperator.name.toUpperCase()}</span>
                <span className="ml-auto text-black font-bold">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(operators.length).padStart(2, '0')}
                </span>
              </div>

              {/* Faction Icons (Decoration) */}
              <div className="flex gap-1 mb-8 opacity-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-black clip-path-polygon" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
                ))}
              </div>

              {/* Main Name */}
              <div className="mb-2 flex items-center gap-4">
                {/* Icon placeholder */}
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-bold">
                  op
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-black tracking-tighter">
                  {currentOperator.name}
                </h2>
              </div>

              {/* Stats Bar */}
              <div className="w-full h-1 bg-gray-200 mb-8 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  className="absolute h-full bg-gradient-to-r from-black via-[#FFE600] to-cyan-400"
                />
              </div>

              {/* Data Grid */}
              <div className="flex gap-4 mb-6">
                <div className="bg-black text-white px-4 py-1 text-sm font-bold skew-x-[-10deg]">
                  Facção
                </div>
                <div className="bg-gray-100 px-4 py-1 text-sm font-medium text-gray-600 min-w-[150px]">
                  {currentOperator.faction}
                </div>
                <div className="bg-black text-white px-4 py-1 text-sm font-bold skew-x-[-10deg]">
                  Raça
                </div>
                <div className="bg-gray-100 px-4 py-1 text-sm font-medium text-gray-600 min-w-[150px]">
                  {currentOperator.race}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed max-w-xl text-sm md:text-base border-l-2 border-[#FFE600] pl-4">
                {currentOperator.description}
              </p>

              {/* 3D Toggle */}
              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleToggle}
                  disabled={isGlitching}
                  className={`w-12 h-20 rounded-full bg-gray-900 shadow-xl flex flex-col items-center justify-between py-2 border border-gray-700 transition-all ${isGlitching ? 'opacity-50' : 'hover:border-gray-500'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${is3D ? 'bg-[#FFE600] text-black' : 'bg-transparent text-gray-500'}`}>3D</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${!is3D ? 'bg-white text-black' : 'bg-transparent text-gray-500'}`}>2D</div>
                </button>
              </div>

            </motion.div>
          </div>

          {/* Character Column (Right overlap) */}
          <div className="relative h-[300px] -mt-8 md:mt-0 md:h-[800px] flex items-start justify-center md:items-end md:absolute md:right-[-20%] md:top-1/2 md:-translate-y-1/2 z-10 w-full pointer-events-none">

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${is3D}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                {/* Yellow Background Element behind character */}
                <div className="absolute top-0 right-0 w-[60%] h-full bg-[#FFE600] -skew-x-12 -z-10 mix-blend-multiply opacity-0 md:opacity-100" />

                {/* Simple Blink Animation */}
                <style>{`
                  @keyframes blink-glitch {
                    0% { opacity: 1; }
                    12% { opacity: 0; }
                    24% { opacity: 1; }
                    36% { opacity: 0; }
                    48% { opacity: 1; }
                    60% { opacity: 0; }
                    72% { opacity: 1; }
                    84% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                `}</style>

                {!is3D && (currentOperator as any).image2D ? (
                  /* 2D Image - when toggle is set to 2D */
                  <div
                    className="w-full h-full flex items-start justify-center md:items-center md:transform md:scale-110 md:origin-bottom md:relative md:left-10 md:translate-x-24 md:translate-y-12"
                    style={{
                      animation: isGlitching ? 'blink-glitch 0.4s steps(1) forwards' : 'none'
                    }}
                  >
                    <img
                      src={(currentOperator as any).image2D}
                      alt={currentOperator.name}
                      className="h-full w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                ) : (currentOperator as any).videoIntro ? (
                  /* Character Video - default 3D mode */
                  <div
                    className="w-full h-full flex items-start justify-center md:items-center md:transform md:scale-125 md:origin-bottom md:relative md:left-10 md:translate-x-24 md:translate-y-24"
                    style={{
                      animation: isGlitching ? 'blink-glitch 0.4s steps(1) forwards' : 'none'
                    }}
                  >
                    <CharacterVideo
                      introSrc={(currentOperator as any).videoIntro}
                      loopSrc={(currentOperator as any).videoLoop}
                    />
                  </div>
                ) : is3D && currentOperator.model3D ? (
                  /* 3D Model */
                  <div className="w-full h-[120%] pointer-events-auto">
                    <ModelLoader modelPath={currentOperator.model3D} />
                  </div>
                ) : (
                  /* Fallback */
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl font-bold text-gray-200">NO IMAGE</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-[#FFE600] z-20 flex items-center px-8">
        <div className="text-xs font-bold tracking-widest text-black">
          SYSTEM STATUS: NORMAL // CONNECTION STABLE
        </div>
        <div className="ml-auto flex gap-2">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-black rounded-full animate-pulse delay-150" />
        </div>
      </div>

    </section>
  );
}
