'use client';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Link from "next/link";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative  w-full p-4 flex  items-center">
      {/* 로고 */}
      <div className="text-xl font-bold text-gradient">🚀Galaxy Journeys</div>

      {/* 메뉴 버튼 */}
      <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer p-2">
        {isMenuOpen ? (
          <XMarkIcon className="h-8 w-8 text-fuchsia-400" />
        ) : (
          <Bars3Icon className="h-8 w-8 text-teal-400" />
        )}
      </div>

      {/* 메뉴 목록 (햄버거 메뉴 클릭 시 토글) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 p-6 shadow-lg rounded-b-xl z-50 
        transition-transform ease-in-out ">
          <ul className="flex flex-col items-center gap-4">
            <li>
          <Link href="/" className="nav-text-set">Home</Link>
        </li>
        <li>
          <Link href="/gallery" className="nav-text-set">Servies</Link>
        </li>
        <li>
          <Link href="/contact" className="nav-text-set">FAQ</Link>
        </li>
         <li>
          <Link href="/contact" className="nav-text-set">Blog</Link>
        </li>
         <li>
          <Link href="/contact" className="nav-text-set">Contact</Link>
        </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
