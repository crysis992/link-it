import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import LinkShortener from "@/components/LinkShortener";
import Pricing from "@/components/Pricing";


export default function Home() {

  return (

    <main className="container mx-auto">
      <HeroSection />
      <LinkShortener />
      <Features />
      <div className="mt-56" />
      <Pricing />
    </main>
  )
}