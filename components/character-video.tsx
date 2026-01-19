"use client";

import { useState } from "react";
import TransparentVideo from "./transparent-video";

interface CharacterVideoProps {
  introSrc?: string;
  loopSrc?: string;
}

export default function CharacterVideo({
  introSrc,
  loopSrc = "/personagem1.mp4",
}: CharacterVideoProps) {
  const [currentSrc, setCurrentSrc] = useState(introSrc || loopSrc);
  const [isLooping, setIsLooping] = useState(!introSrc);

  const handleEnded = () => {
    if (introSrc && !isLooping && loopSrc) {
      setIsLooping(true);
      setCurrentSrc(loopSrc);
    }
  };

  return (
    <div className="relative w-full flex items-end justify-center pointer-events-none">
      <TransparentVideo
        src={currentSrc!}
        loop={isLooping}
        onEnded={handleEnded}
        className="w-full h-auto max-w-full"
      />
    </div>
  );
}
