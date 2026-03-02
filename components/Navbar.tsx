import Link from "next/link";
import { Button } from "./ui/button"
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full backdrop-brightness-75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 py-10">
        <Image
          src="/images/logo-streamify.png"
          alt="Streamify logo"
          width={100}
          height={50}
          priority
        />
        <Link href="/sign-in">
          <Button variant="destructive" className="rounded-sm font-semibold px-5 hover:underline">
            Sign In
          </Button>
        </Link>
      </div>
    </nav>
  );
}