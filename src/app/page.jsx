import Hero from "@/app/components/Hero";
import Philosophy from "@/app/components/Philosophy";
import Work from "@/app/components/Work";
import HomeWrapper from "@/app/components/HomeWrapper";
import CTA from "@/app/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Work />
      <HomeWrapper />
      <CTA />
    </>
  );
}
