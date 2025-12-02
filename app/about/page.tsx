"use client";

import { useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar,
  Target,
  Lightbulb,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Header Title Animation
      tl.fromTo(
        ".header-text",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        // Story Section Slide Up
        .fromTo(
          ".story-section",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
        // Cards Stagger
        .fromTo(
          ".value-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      className="flex flex-col min-h-screen bg-slate-50 font-sans"
      ref={containerRef}
    >
      <Header />

      <main className="flex-grow">
        {/* ================= HERO HEADER ================= */}
        <div className="bg-white border-b border-slate-100 pt-16 pb-12 md:py-20 px-6 text-center">
          <div className="header-text max-w-3xl mx-auto space-y-4">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide uppercase mb-2">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Pioneering Excellence in <br className="hidden md:block" />
              <span className="text-blue-600">Education Management</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Transforming how schools operate with innovative technology and
              comprehensive solutions.
            </p>
          </div>
        </div>

        {/* ================= MAIN STORY SECTION ================= */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="story-section bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
            {/* Left: Illustration / Visual */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-10 flex flex-col justify-between text-white relative overflow-hidden">
              {/* Decorative Circle */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl"></div>

              <div className="z-10">
                <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-sm mb-6">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Est. 2018</h3>
                <p className="text-blue-100">
                  Over 5+ years of dedicated service to the education sector.
                </p>
              </div>

              <div className="z-10 mt-10 md:mt-0">
                <div className="flex items-center gap-2 font-medium opacity-90">
                  <CheckCircle2 className="w-5 h-5" /> Trusted by Institutes
                </div>
                <div className="flex items-center gap-2 font-medium opacity-90 mt-2">
                  <CheckCircle2 className="w-5 h-5" /> ERP Specialists
                </div>
              </div>
            </div>

            {/* Right: The Content Text */}
            <div className="w-full md:w-3/5 p-10 md:p-14 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Our Journey
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  At{" "}
                  <span className="font-semibold text-blue-600">
                    Reno Platforms
                  </span>
                  , our journey began in 2018 with a clear vision: to transform
                  education management through innovative and comprehensive
                  solutions.
                </p>
                <p>
                  Founded with a passion for leveraging technology to
                  revolutionize the educational landscape, we embarked on a
                  mission to empower educational institutes with cutting-edge{" "}
                  <span className="font-semibold text-slate-800">
                    ERP software
                  </span>
                  .
                </p>
                <p>
                  We believe that technology should simplify complexity,
                  allowing educators to focus on what matters most—shaping the
                  future of students.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUES / VISION SECTION ================= */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Vision */}
            <div className="value-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To become the global standard in education management, bridging
                the gap between traditional schooling and modern technology.
              </p>
            </div>

            {/* Card 2: Mission */}
            <div className="value-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed">
                To empower educational institutes with intuitive, reliable, and
                cutting-edge ERP software that streamlines operations.
              </p>
            </div>

            {/* Card 3: Growth */}
            <div className="value-card bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Rocket className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Innovation
              </h3>
              <p className="text-slate-600 leading-relaxed">
                We constantly evolve, integrating the latest tech trends to
                ensure our partners stay ahead in the educational landscape.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
