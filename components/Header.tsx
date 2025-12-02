"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, GraduationCap } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Helper function to check active state for styling
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* 
          TOP HEADER (Logo + Desktop Nav)
   */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          {/* Logo - Always visible */}
          <h1 className="text-2xl font-bold text-blue-600">Reno Platform</h1>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-8 text-lg font-medium">
              <li>
                <Link
                  href="/"
                  className={`hover:text-blue-600 transition ${
                    isActive("/") ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`hover:text-blue-600 transition ${
                    isActive("/about") ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/schools"
                  className={`hover:text-blue-600 transition ${
                    isActive("/schools") ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  Schools
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/*
          BOTTOM NAVIGATION BAR (Mobile Only)
    */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16">
          {/* Home Link */}
          <Link
            href="/"
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <Home
              size={24}
              className={
                isActive("/") ? "text-blue-600 fill-blue-100" : "text-gray-500"
              }
              strokeWidth={isActive("/") ? 2.5 : 2}
            />
            <span
              className={`text-[10px] mt-1 font-medium ${
                isActive("/") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Home
            </span>
          </Link>

          {/* About Link */}
          <Link
            href="/about"
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <Info
              size={24}
              className={
                isActive("/about")
                  ? "text-blue-600 fill-blue-100"
                  : "text-gray-500"
              }
              strokeWidth={isActive("/about") ? 2.5 : 2}
            />
            <span
              className={`text-[10px] mt-1 font-medium ${
                isActive("/about") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              About
            </span>
          </Link>

          {/* Schools Link */}
          <Link
            href="/schools"
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <GraduationCap
              size={24}
              className={
                isActive("/schools")
                  ? "text-blue-600 fill-blue-100"
                  : "text-gray-500"
              }
              strokeWidth={isActive("/schools") ? 2.5 : 2}
            />
            <span
              className={`text-[10px] mt-1 font-medium ${
                isActive("/schools") ? "text-blue-600" : "text-gray-500"
              }`}
            >
              Schools
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
