import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-200 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl text-black font-bold">
          <Link href="/">
            Swayam
          </Link>
        </div>
      </div>
    </header>
  );
}