"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const sliderImages = [
  "https://www.kienkaka.pro/storage/uploads/51352104347-9eb284f1d4-o-1.webp",
  "https://www.kienkaka.pro/storage/uploads/51061317511-1ef821608f-o.webp",
  "https://www.kienkaka.pro/storage/uploads/51061805888-bf9f4c2c72-o-2.webp",
  "https://www.kienkaka.pro/storage/uploads/51706467542-68750b43e5-o-1.webp",
  "https://www.kienkaka.pro/storage/uploads/KKK-8074.webp",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section id="hero" className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden bg-slate-900 shadow-md">
      {/* Background Images */}
      {sliderImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Floating Controls at Bottom Right */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-sm rounded">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded bg-[#1e232a] text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-9 h-9 rounded bg-[#1e232a] text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Toggle Auto Slide"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[#00b4d8]" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded bg-[#1e232a] text-white flex items-center justify-center hover:bg-black transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {sliderImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? "w-6 bg-[#00b4d8]" : "w-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
