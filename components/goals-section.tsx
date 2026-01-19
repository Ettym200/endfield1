"use client";

import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

const milestones = [
  { id: 1, value: "15.000.000", image: "/metas/15.png", reward: "T-Creds×30000", achieved: true },
  { id: 2, value: "20.000.000", image: "/metas/20.png", reward: "Registro de Combate Avançado×20", achieved: true },
  { id: 3, value: "25.000.000", image: "/metas/25.png", reward: "permissão básica de CT×5", achieved: true },
  { id: 4, value: "30.000.000", image: "/metas/30.png", reward: "Operador 5★ Snowshine", achieved: true },
  { id: 5, value: "35.000.000", image: "/metas/35.png", reward: "permissão básica de CT×10", achieved: true },
];

// All milestones achieved = 100%
const progressPercent = 100;
const achievedCount = 5;

export default function GoalsSection() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Reversed milestones for mobile (35M -> 15M from top to bottom)
  const reversedMilestones = [...milestones].reverse();

  return (
    <section id="metas" className="w-full min-h-screen bg-white flex flex-col lg:flex-row">
      {/* LEFT CONTENT */}
      <div className="flex-1 p-4 md:p-10 lg:p-16 relative lg:ml-30">
        {/* Header */}
        <div className="mb-6 lg:mb-12 relative z-10">
          <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
            <span className="inline-block -rotate-45">↘</span> SIGN UP
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black uppercase leading-tight max-w-lg">
            Metas De Pré-Inscrição Globais Da Endfield
          </h2>

          <div className="mt-4 lg:mt-6 text-xs md:text-sm text-gray-500 max-w-md font-medium flex items-start gap-2">
            <span className="text-[#FFE600] text-lg">✦</span>
            <p>Todas as nossas metas globais de pré-inscrição foram alcançadas. Agradecemos o seu apoio, Endministrator!</p>
          </div>
        </div>

        {/* MOBILE: Vertical List Layout */}
        <div className="lg:hidden space-y-3 px-2">
          {reversedMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
              className="flex items-stretch gap-0"
            >
              {/* Left: Number and Status */}
              <div className="w-20 shrink-0 flex flex-col justify-center pr-2">
                <div className="font-black text-base text-black">{milestone.value}</div>
                <div className="text-[9px] text-gray-500 font-medium">
                  {milestone.achieved ? 'Conquistada' : 'Não conquistada'}
                </div>
              </div>

              {/* Main Card: Yellow background with content and image */}
              <div className="flex-1 bg-[#FFE600] flex items-center relative min-h-[65px] overflow-visible">
                {/* Diagonal pattern */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 16px)'
                  }}
                />

                {/* Content: Icon and Text */}
                <div className="flex items-center gap-2 px-2 py-2 relative z-10 flex-1 min-w-0">
                  {/* Circle Icon */}
                  <div className="w-4 h-4 rounded-full border-2 border-black/30 shrink-0" />

                  {/* Reward Text */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[7px] font-bold text-black/50 uppercase tracking-wider">ENDFIELD</div>
                    <div className="text-[10px] font-bold text-black leading-tight break-words">{milestone.reward}</div>
                  </div>
                </div>

                {/* Right: Reward Image - positioned inside the card */}
                <div className="relative w-14 h-full shrink-0 flex items-center justify-center overflow-visible">
                  {milestone.id === 4 ? (
                    // Snowshine - larger image that extends beyond
                    <img
                      src={milestone.image}
                      alt="Reward"
                      className="absolute -top-4 -right-1 w-20 h-auto object-contain z-20"
                    />
                  ) : milestone.id === 5 ? (
                    // 35M - larger image
                    <img
                      src={milestone.image}
                      alt="Reward"
                      className="absolute -top-4 -right-2 w-20 h-auto object-contain z-10"
                    />
                  ) : (
                    <img
                      src={milestone.image}
                      alt="Reward"
                      className="w-12 h-12 object-contain relative z-10"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP: Horizontal Timeline Layout */}
        <div className="hidden lg:block relative z-10 mt-20">
          {/* Horizontal Line Background */}
          <div className="absolute top-[140px] xl:top-[180px] left-0 w-full h-1 bg-gray-200" />

          {/* Progress Line */}
          <motion.div
            className="absolute top-[140px] xl:top-[180px] left-0 h-1 bg-[#FFE600]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-5 gap-2">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.2) }}
                className="flex flex-col items-center text-center relative group"
              >
                {/* Reward Image Box */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 xl:w-28 xl:h-28 flex items-center justify-center p-2 relative">
                    {milestone.id === 4 ? (
                      /* Snowshine - Large Desktop */
                      <div className="absolute -top-[300px] xl:-top-[380px] left-1/2 -translate-x-1/2 w-[380px] xl:w-[550px] h-[380px] xl:h-[550px] z-20 pointer-events-none">
                        <img
                          src={milestone.image}
                          alt="Reward"
                          className="w-full h-full object-contain drop-shadow-2xl"
                        />
                      </div>
                    ) : milestone.id === 5 ? (
                      /* Last milestone - 35M with decorative frame */
                      <div className="absolute -top-16 xl:-top-20 left-1/2 -translate-x-1/2 w-[180px] xl:w-[220px] h-[180px] xl:h-[220px] z-20 pointer-events-none">
                        {/* Decorative square - smaller than the image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] xl:w-[150px] h-[120px] xl:h-[150px]">
                          {/* Yellow gradient background */}
                          <div
                            className="absolute inset-1 z-0"
                            style={{
                              background: 'linear-gradient(225deg, rgba(255, 250, 0, 0) 20%, #fffa00 60%, #fffa00 100%)'
                            }}
                          />
                          {/* White border frame with shadow */}
                          <div
                            className="absolute inset-0 z-10 pointer-events-none"
                            style={{
                              border: '1.5rem solid #fff',
                              boxSizing: 'border-box',
                              filter: 'drop-shadow(0 0.1875rem 0.5rem rgba(38, 38, 38, 0.375))'
                            }}
                          />
                        </div>
                        {/* Image - larger than the square */}
                        <img
                          src={milestone.image}
                          alt="Reward"
                          className="absolute inset-0 w-full h-full object-contain z-20"
                        />
                      </div>
                    ) : (
                      /* Standard Reward */
                      <Fragment>
                        <motion.div
                          className={`absolute inset-0 -skew-x-6 ${milestone.achieved ? 'bg-[#FFE600]' : 'bg-gray-200'}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1 + (index * 0.2) }}
                        />
                        <img
                          src={milestone.image}
                          alt="Reward"
                          className="relative z-10 object-contain w-full h-full drop-shadow-xl"
                        />
                      </Fragment>
                    )}

                    {/* Connection Dot */}
                    <div className={`absolute -bottom-8 xl:-bottom-10 left-1/2 -translate-x-1/2 w-3 h-3 xl:w-4 xl:h-4 rounded-full border-4 border-white z-20 ${milestone.achieved ? 'bg-[#FFE600]' : 'bg-gray-300'}`} />
                  </div>
                </div>

                {/* Text Info */}
                <div className="pt-8 w-full px-2">
                  <div className="font-black text-xl xl:text-2xl mb-2 text-black">{milestone.value}</div>

                  {/* Status Bar */}
                  <div className={`w-full h-6 text-[10px] font-bold uppercase flex items-center justify-center mb-2 skew-x-[-10deg] ${milestone.achieved
                    ? 'bg-[#FFE600] text-black'
                    : 'bg-gray-300 text-gray-600'
                    }`}>
                    {milestone.achieved ? 'Conquistada' : 'Não conquistada'}
                  </div>

                  <div className="text-xs font-bold text-gray-600 leading-tight">
                    {milestone.reward}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (Social Media) - MOBILE VERSION */}
      <div className="lg:hidden w-full bg-gradient-to-b from-gray-100 to-[#FFE600] relative p-6 mt-6">
        {/* Diagonal pattern */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
          }}
        />

        <div className="relative z-10 flex items-start gap-4 ">
          {/* Left Content */}
          <div className="flex-1">
            {/* Yellow Header */}
            <div className="bg-[#FFE600] py-2 px-4 mb-3 inline-block">
              <h3 className="text-lg font-black uppercase leading-tight">Meta de Mídias Sociais</h3>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Recompensas de bônus desbloqueadas ao alcançarmos <span className="font-bold text-black">5.000.000</span> de seguidores nas mídias sociais oficiais
            </p>

            {/* Status Button */}
            <div className="bg-[#FFE600] py-1 px-4 inline-block mb-3">
              <span className="text-xs font-bold uppercase text-black">Conquistada</span>
            </div>

            {/* Rewards */}
            <div className="text-sm font-bold text-black">
              <div>Arma 5★ Finishing Call</div>
              <div>permissão básica de CT×5</div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-24 sm:w-32 shrink-0 relative">
            <img
              src="/metas/midias.png"
              alt="Social Reward"
              className="w-full object-contain drop-shadow-xl rotate-12"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white font-black text-xl p-1 rounded shadow-lg rotate-12">
              ×5
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR (Social Media) - DESKTOP VERSION */}
      <div className="hidden lg:block w-[280px] xl:w-[320px] 2xl:w-[350px] bg-gradient-to-b from-gray-100 to-[#FFE600] relative shrink-0 border-l border-gray-200 mr-20 mt-20 mb-20 ml-10">
        <div className="absolute top-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <img src="/metas/iconsEndfield.png" alt="Icon" className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm tracking-tighter">ENDFIELD</span>
          </div>
        </div>

        <div className="h-full flex flex-col items-center justify-center p-8 text-center pt-20">
          {/* Weapon/Social Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="mb-8 relative"
          >
            <img src="/metas/midias.png" alt="Social Reward" className="w-full max-w-[180px] xl:max-w-[200px] object-contain drop-shadow-2xl rotate-12" />

            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white font-black text-4xl p-2 rounded-lg shadow-lg rotate-12">
              ×5
            </div>
          </motion.div>

          <h3 className="text-2xl font-black uppercase mb-4 leading-tight text-black">
            Meta de Mídias<br />Sociais
          </h3>

          <p className="text-[10px] text-gray-600 mb-6 max-w-[200px] leading-relaxed">
            Recompensas de bônus desbloqueadas ao alcançarmos <span className="font-bold text-black">5.000.000</span> de seguidores nas mídias sociais oficiais
          </p>

          {/* Social Media Status */}
          <div className="w-full bg-[#222] text-[#FFE600] py-2 font-bold text-sm uppercase mb-2 shadow-lg">
            CONQUISTADA
          </div>

          <div className="text-xs font-bold text-black uppercase">
            <div>Arma 5★ Finishing Call</div>
            <div>permissão básica de CT×5</div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
      </div>
    </section>
  );
}
