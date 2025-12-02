"use client";

import { useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  School,
  ShieldCheck,
  BarChart3,
  CheckCircle,
} from "lucide-react";

// Register GSAP
gsap.registerPlugin(useGSAP);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Text & Content Entrance
      tl.fromTo(
        ".hero-text-element",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      )
        // 2. Buttons Pop In
        .fromTo(
          ".hero-btn",
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        // 3. Image Slides In
        .fromTo(
          ".hero-image-container",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        )
        // 4. Features Section Fade Up
        .fromTo(
          ".feature-card",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.5"
        );

      // 5. Continuous Floating Animation for Image
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          y: 15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      className="flex flex-col min-h-screen bg-white font-sans"
      ref={containerRef}
    >
      <Header />

      {/* Main Content Area - Grows to push footer down */}
      <main className="flex-grow w-full">
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Side: Content */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10">
            <div className="hero-text-element inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              The #1 School Management System
            </div>

            <h1 className="hero-text-element text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Simplify School <br />
              Management with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Reno Platform
              </span>
            </h1>

            <p className="hero-text-element text-lg text-slate-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Your trusted partner for organizing school data. Streamline
              admissions, track performance, and connect with parents—all in one
              place.
            </p>

            <div className="hero-text-element flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <Link
                href="/register-school"
                className="hero-btn group relative flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 hover:-translate-y-1 transition-all"
              >
                Register School
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/schools"
                className="hero-btn flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:-translate-y-1 transition-all"
              >
                <School className="w-5 h-5" />
                Browse Schools
              </Link>
            </div>

            <div className="hero-text-element pt-6 flex items-center justify-center md:justify-start gap-6 text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" /> Free to Start
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" /> Fully Secure
              </span>
            </div>
          </div>

          {/* Right Side: Image with Floating Effect */}
          <div className="hero-image-container w-full md:w-1/2 flex justify-center relative">
            {/* Decorative blob behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

            <img
              ref={heroImageRef}
              src="/school.avif"
              className="w-full max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl z-10"
              alt="School Management Dashboard"
              // Fallback if image fails, we keep the space clean
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="bg-slate-50 py-16 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900">
                Why choose Reno?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Secure Data
                </h3>
                <p className="text-slate-600">
                  Enterprise-grade security to keep all your student and staff
                  records safe and private.
                </p>
              </div>

              <div className="feature-card bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  <BarChart3 size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Smart Analytics
                </h3>
                <p className="text-slate-600">
                  Get detailed insights into school performance, attendance, and
                  financial growth.
                </p>
              </div>

              <div className="feature-card bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4">
                  <School size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Easy Management
                </h3>
                <p className="text-slate-600">
                  Add, edit, and manage school profiles with just a few clicks.
                  Designed for efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
