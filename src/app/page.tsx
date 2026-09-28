import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ResourcesSection from "@/components/ResourcesSection";
import LatestPosts from "@/components/LatestPosts";
import Metrics from "@/components/Metrics";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/postStore";
import { getAllBanners } from "@/lib/bannerStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const allPosts = getAllPosts();
  const allBanners = getAllBanners();

  return (
    <div className="min-h-screen bg-[#edf3f8] text-[#0f172a] flex flex-col font-sans">
      {/* Navigation Sidebar Header */}
      <Header />

      {/* Main Content Area (Offset 240px on desktop for sidebar) */}
      <div className="xl:pl-[240px] flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Full Width Hero Slider */}
        <div className="pt-14 xl:pt-0">
          <Hero initialBanners={allBanners} />
        </div>

        {/* Main Sections Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <ResourcesSection initialPosts={allPosts} />
          <LatestPosts initialPosts={allPosts} />
          <Metrics />
          <Testimonials />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

