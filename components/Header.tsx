import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header(): React.ReactNode {
  return (
    <header className="flex items-center justify-between sticky top-0 z-10 h-20 bg-background backdrop-blur-sm border-b px-6">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <Link href="/">
          <div className="flex gap-2 items-center w-fit py-3">
            <Image
              src="/next-scene-icon.png"
              alt="NEXTSCENE BRAND ICON"
              width={80}
              height={60}
            />
            <Image
              src="/next-scene-icon-text.png"
              alt="NEXTSCENE BRAND ICON TEXT"
              width={120}
              height={80}
            />
          </div>
        </Link>
        <Link
          href="/favourites"
          className="flex items-center gap-2 font-semibold hover:underline hover:text-red-base underline-offset-2 decoration-red-base duration-300"
        >
          <Heart className="size-7 hover:fill-red-base text-red-base" />
        </Link>
      </div>
    </header>
  );
}
