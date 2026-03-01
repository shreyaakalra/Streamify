import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage : "url('/images/hero.jpg')" }}
      >
      <div className="absolute inset-0 bg-black/75" />
      </div>
      <div className="relative z-10">
        <Navbar />
      </div>
      
    </div>
  );
}
