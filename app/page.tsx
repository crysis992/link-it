import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import LinkShortener from "@/components/LinkShortener";


export default function Home() {

  return (

    <main className="container mx-auto">
      <HeroSection />
      <LinkShortener />
      <Features />
    </main>
  )
}