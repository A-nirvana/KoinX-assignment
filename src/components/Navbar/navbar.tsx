import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../toggle";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-[100] flex items-center justify-between py-3 md:py-5 px-3 md:px-10 lg:px-20 bg-component text-foreground shadow-xl w-full">
        <div className="text-lg font-bold">
            <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={100} width={100} />
            </Link>
        </div>
        <div>
        <ModeToggle/>
        </div>
        </nav>
    );
    }