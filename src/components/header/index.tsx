import Image from 'next/image';
import Link from 'next/link';

import { LiaGamepadSolid } from 'react-icons/lia';
export function Header() {
  return (
    <header className="w-full h-28 bg-slate-100 text-zinc-900 px-2">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              quality={100}
              priority={true}
              width={200}
              height={200}
              alt="Logo do site"
              className="w-full"
            />
          </Link>

          <Link href="/">Home</Link>
          <Link href="/profile">Perfil</Link>
        </nav>

        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid size={34} color="#475564" />
          </Link>
        </div>
      </div>
    </header>
  );
}
