'use client';

import Link from "next/link";

export default function Nav() {

    return (
       <nav className="relative w-full py-4 px-28 flex justify-between items-center inter">
      {/* 로고 */}
      <div className="text-2xl font-light text-gradient ">
        <Link href="/">🚀Galaxia Journeys</Link></div>

      {/* 메뉴 목록 */}
      <ul className="flex gap-8">
        <li>
          <Link href="/" className="nav-text-set">Home</Link>
        </li>
        {/* <li>
          <Link href="../pages/Section3" className="nav-text-set">Servies</Link>
        </li> */}
        <li>
          <Link href="../pages/FAQ" className="nav-text-set">FAQ</Link>
        </li>
         <li>
          <Link href="https://cham8cham.vercel.app/pages/Contact" className="nav-text-set">Blog</Link>
        </li>
         <li>
          <Link href="https://cham8cham.vercel.app/pages/Contact" className="nav-text-set">Contact</Link>
        </li>
      </ul>
    </nav>
    );
}
