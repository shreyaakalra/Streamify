import Background from "@/components/Background";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar"


export default function Home() {
  return (
      <div className="relative min-h-screen w-full">
        <Background />
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </div>
  );
}