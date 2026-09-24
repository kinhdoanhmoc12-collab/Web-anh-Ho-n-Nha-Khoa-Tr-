"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const defaultBanners = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1920",
];

export default function Hero() {
  const [sliderImages, setSliderImages] = useState<string[]>(defaultBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zunphoto_hero_banners");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSliderImages(parsed);
        }
      }
    } catch {
      // Fallback to default
    }
  }, []);

  useEffect(() => {
    if (!isPlaying || sliderImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, sliderImages.length]);

  const handleNext = () => {
    if (sliderImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    if (sliderImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <section id="hero" className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden bg-slate-900 shadow-md">
      {/* Background Images */}
      {sliderImages.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt={`Banner Slide ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Floating Controls at Bottom Right */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-sm rounded">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded bg-[#1e232a] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-9 h-9 rounded bg-[#1e232a] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
          aria-label="Toggle Auto Slide"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[#00b4d8]" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded bg-[#1e232a] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
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
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? "w-6 bg-[#00b4d8]" : "w-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
