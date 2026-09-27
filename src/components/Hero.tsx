"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Eye } from "lucide-react";

interface BannerSlide {
  image: string;
  slug: string;
  title: string;
}

const defaultSlides: BannerSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
    slug: "1a-2-zip-stock-nang-chieu-hoang-hon",
    title: "Bộ Stock Chân Dung Nắng Chiều Hoàng Hôn RAW Pack",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
    slug: "stock-cuc-tan-an-do-duong-pho-ha-noi",
    title: "Stock Cúc Tần Ấn Độ Đường Phố Hà Nội",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
    slug: "stock-vintage-film-aesthetic-35mm-raw-pack",
    title: "Stock Vintage Film Aesthetic 35mm RAW Pack",
  },
  {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
    slug: "preset-lightroom-tone-han-quoc-trong-treo",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
  },
  {
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1920",
    slug: "bo-500-preset-doc-quyen-zunphoto-full-pack",
    title: "Bộ 500+ Preset Độc Quyền ZunPhoto Full Pack",
  },
];

export default function Hero() {
  const [slides, setSlides] = useState<BannerSlide[]>(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banners");
        if (res.ok) {
          const data = await res.json();
          if (data.banners && Array.isArray(data.banners) && data.banners.length > 0) {
            setSlides(
              data.banners.map((imgUrl: string, idx: number) => ({
                image: imgUrl,
                slug: defaultSlides[idx % defaultSlides.length]?.slug || "1a-2-zip-stock-nang-chieu-hoang-hon",
                title: defaultSlides[idx % defaultSlides.length]?.title || "Xem bài viết tài nguyên chi tiết",
              }))
            );
            return;
          }
        }
      } catch {
        // Fallback
      }

      try {
        const saved = localStorage.getItem("zunphoto_hero_banners");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSlides(
              parsed.map((imgUrl: string, idx: number) => ({
                image: imgUrl,
                slug: defaultSlides[idx % defaultSlides.length]?.slug || "1a-2-zip-stock-nang-chieu-hoang-hon",
                title: defaultSlides[idx % defaultSlides.length]?.title || "Xem bài viết tài nguyên chi tiết",
              }))
            );
          }
        }
      } catch {
        // Fallback to default
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (!isPlaying || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handleNext = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[currentIndex] || slides[0];

  return (
    <section id="hero" className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden bg-slate-900 shadow-lg rounded-2xl group border border-slate-200/80">
      {/* Background Images with Link */}
      {slides.map((slide, index) => (
        <Link
          key={`${slide.image}-${index}`}
          href={`/post/${slide.slug}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Slide Title Banner */}
          <div className="absolute bottom-10 left-6 sm:left-10 max-w-xl text-white space-y-2 z-20">
            <span className="px-3 py-1 rounded-full bg-[#0284c7] text-white text-xs font-bold shadow-md inline-flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> BÀI VIẾT NỔI BẬT
            </span>
            <h2 className="text-xl sm:text-3xl font-black line-clamp-2 drop-shadow-md leading-tight text-white">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 line-clamp-1 font-medium">
              Bấm vào banner để xem toàn bộ bài viết hướng dẫn & link download file RAW/Preset
            </p>
          </div>
        </Link>
      ))}

      {/* Floating Controls at Bottom Right */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80">
        <button
          onClick={handlePrev}
          className="w-9 h-9 rounded-lg bg-sky-50 text-slate-700 flex items-center justify-center hover:bg-[#0284c7] hover:text-white transition-colors cursor-pointer border border-sky-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-9 h-9 rounded-lg bg-sky-50 text-slate-700 flex items-center justify-center hover:bg-[#0284c7] hover:text-white transition-colors cursor-pointer border border-sky-100"
          aria-label="Toggle Auto Slide"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-[#0284c7]" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={handleNext}
          className="w-9 h-9 rounded-lg bg-sky-50 text-slate-700 flex items-center justify-center hover:bg-[#0284c7] hover:text-white transition-colors cursor-pointer border border-sky-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? "w-6 bg-[#0284c7]" : "w-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

