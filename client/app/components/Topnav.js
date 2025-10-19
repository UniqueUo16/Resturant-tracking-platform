import React from "react";
import Link from "next/link";

function Topnav() {
  return (
    <div>
      <main
        style={{ fontFamily: "monospace" }}
        className="text-[0.9rem] bg-orange-500 p-2 flex flex-wrap gap-2"
      >
        {/* Always visible */}
        <Link href="/">Gmail</Link>
        <Link href="/">Phone +0902342421</Link>

        {/* Icons hidden on small screens */}
        <Link href="/" className="hidden md:inline ml-12">
          Icon 1
        </Link>
        <Link href="/" className="hidden md:inline">
          Icon 2
        </Link>
        <Link href="/" className="hidden md:inline">
          Icon 3
        </Link>
        <Link href="/" className="hidden md:inline">
          Icon 4
        </Link>
        <Link href="/" className="hidden md:inline">
          Icon 5
        </Link>

        {/* Always visible */}
        <Link href="/">Location icon</Link>
        <Link href="/">Shopping Icon</Link>
      </main>
    </div>
  );
}

export default Topnav;
