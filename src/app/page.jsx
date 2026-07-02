import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Philosophy from "@/app/components/Philosophy";
import Work from "@/app/components/Work";
import HomeWrapper from "@/app/components/HomeWrapper";
import CTA from "@/app/components/CTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Nav />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Philosophy />
        <Work />
        <HomeWrapper />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
