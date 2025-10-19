"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <b className="text-yellow-300 ml-82  font-cursive mt-[2.5rem] 
         sm:mt-[4rem] ">
          Navbar Logo
        </b>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none "
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-base font-semibold text-white mt-[3.5rem]">
          <Link href="/" className="hover:text-yellow-300">HomePage</Link>
          <Link href="/Ex/Menu" className="hover:text-yellow-300">Buy a Food</Link>
          <Link href="/" className="hover:text-yellow-300">Transactions</Link>
          <Link href="/Ex/About" className="hover:text-yellow-300">About Us</Link>
          <Link href="/Ex/Contact" className="hover:text-yellow-300">Contact</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-sm">
          <nav className="flex flex-col gap-2 py-4 text-base font-semibold text-white">
            <Link
              href="/"
              className="px-4 py-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              HomePage
            </Link>
            <Link
              href="/"
              className="px-4 py-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Sales
            </Link>
            <Link
              href="/"
              className="px-4 py-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Transactions
            </Link>
            <Link
              href="/"
              className="px-4 py-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/Ex/Contact"
              className="px-4 py-2 hover:text-yellow-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
