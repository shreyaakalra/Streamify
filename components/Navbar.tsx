import { Button } from "@/components/ui/button"
import Image from 'next/image';

export default function Navbar(){
    return (
        <div>
            <nav>
                <div className="w-full bg-black/20 backdrop-blur-5xl">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        <Image 
                            src="/images/logo-streamify.png"
                            alt="Streamify logo"
                            width={120}
                            height={50}
                        />
                        <Button>
                            Sign In
                        </Button>
                    </div>
                </div>
            </nav>
        </div>
    );
}