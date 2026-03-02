import { Button } from "./ui/button"
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Image
          src="/images/logo-streamify.png"
          alt="Streamify logo"
          width={120}
          height={50}
          priority
        />
        <Button variant="destructive" className="rounded-sm font-semibold px-5">
          Sign In
        </Button>
      </div>
    </nav>
  );
}