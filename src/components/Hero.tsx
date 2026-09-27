"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play, Eye } from "lucide-react";

interface BannerSlide {
  image: string;
  link: string;
  title: string;
}

const defaultSlides: BannerSlide[] = [
  {
    image: "https://www.kienkaka.pro/storage/uploads/1a-2.webp",
    link: "/post/1a-2-zip-stock-nang-chieu-hoang-hon",
    title: "1a-2.zip (Stock Nắng Chiều Hoàng Hôn RAW Pack)",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
    link: "/post/stock-chan-dung-indoor-nhe-nhang-mua-he",
    title: "Stock Nàng Thơ Bên Khung Cửa Sổ RAW Pack",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1920",
    link: "/post/stock-cuc-tan-an-do-duong-pho-ha-noi",
    title: "Stock Cúc Tần Ấn Độ Đường Phố Hà Nội",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1920",
    link: "/post/stock-vintage-film-aesthetic-35mm-raw-pack",
    title: "Stock Vintage Film Aesthetic 35mm RAW Pack",
  },
  {
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
    link: "/post/preset-lightroom-tone-han-quoc-trong-treo",
    title: "Preset Lightroom Tone Hàn Quốc Trong Trẻo",
  },
];

export default function Hero() {
  const [slides, setSlides] = useState<BannerSlide[]>(defaultSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        let livePosts: any[] = [];
        try {
          const postsRes = await fetch("/api/admin/posts");
          if (postsRes.ok) {
            const postsData = await postsRes.json();
            if (postsData.posts && Array.isArray(postsData.posts)) {
              livePosts = postsData.posts;
            }
          }
        } catch {
          // quiet
        }

        const res = await fetch("/api/banners");
        if (res.ok) {
          const data = await res.json();
          if (data.banners && Array.isArray(data.banners) && data.banners.length > 0) {
            setSlides(
              data.banners.map((item: any, idx: number) => {
                const image = typeof item === "string" ? item : item?.image || "";
                const customLink = typeof item === "object" ? item?.link || "" : "";
                const customTitle = typeof item === "object" ? item?.title || "" : "";

                const matched = livePosts.find((p) => p.imageUrl === image) || livePosts[idx % Math.max(1, livePosts.length)];
                const defaultSlug = matched?.slug || defaultSlides[idx % defaultSlides.length]?.link || "/post/1a-2-zip-stock-nang-chieu-hoang-hon";
                const fallbackLink = defaultSlug.startsWith("/") ? defaultSlug : `/post/${defaultSlug}`;

                return {
                  image,
                  link: customLink ? customLink : fallbackLink,
                  title: customTitle || matched?.title || defaultSlides[idx % defaultSlides.length]?.title || "Xem bài viết chi tiết",
                };
              })
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
              parsed.map((item: any, idx: number) => {
                const image = typeof item === "string" ? item : item?.image || "";
                const customLink = typeof item === "object" ? item?.link || "" : "";
                const customTitle = typeof item === "object" ? item?.title || "" : "";
                const fallbackLink = defaultSlides[idx % defaultSlides.length]?.link || "/post/1a-2-zip-stock-nang-chieu-hoang-hon";

                return {
                  image,
                  link: customLink || fallbackLink,
                  title: customTitle || defaultSlides[idx % defaultSlides.length]?.title || "Xem bài viết chi tiết",
                };
              })
            );
          }
        }
      } catch {
        // Fallback to default
      }
    };

    fetchBanners();
    const interval = setInterval(fetchBanners, 3000);
    return () => clearInterval(interval);
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

  return (
    <section id="hero" className="relative w-full h-[55vh] min-h-[380px] max-h-[600px] overflow-hidden bg-slate-900 shadow-lg rounded-2xl group border border-slate-200/80">
      {/* Background Images with Link */}
      {slides.map((slide, index) => {
        const isExternal = slide.link.startsWith("http://") || slide.link.startsWith("https://");
        const slideContent = (
          <>
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
                Bấm vào banner để chuyển hướng đến bài viết / link tài nguyên
              </p>
            </div>
          </>
        );

        if (isExternal) {
          return (
            <a
              key={`${slide.image}-${index}`}
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slideContent}
            </a>
          );
        }

        return (
          <Link
            key={`${slide.image}-${index}`}
            href={slide.link.startsWith("/") ? slide.link : `/${slide.link}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {slideContent}
          </Link>
        );
      })}

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

