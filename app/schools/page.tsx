"use client";

import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header"; // Assuming this path exists based on your code
import Footer from "@/components/Footer"; // Assuming this path exists based on your code
import {
  MapPin,
  School as SchoolIcon,
  Loader2,
  ArrowRight,
  Building,
  Landmark,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: string;
}

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  // Ref for GSAP scoping
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/get-schools");
        const data = await res.json();

        if (data.success) {
          setSchools(data.data);
        }
      } catch (error) {
        console.log("FETCH ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // GSAP Animation Hook
  useGSAP(() => {
    if (!loading && schools.length > 0) {
      // Animate cards staggering in
      gsap.fromTo(
        ".school-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );

      // Animate the title
      gsap.fromTo(
        ".page-title",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [loading, schools]);

  return (
    // 1. Min-h-screen and flex-col forces footer to bottom
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <Header />

      {/* Main Content grows to fill space */}
      <main className="flex-grow w-full" ref={containerRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="mb-10 page-title">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Schools
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Find the best educational institutions near you.
            </p>
          </div>

          {/* Content Area */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Curating list...</p>
            </div>
          ) : schools.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
              <SchoolIcon className="w-16 h-16 text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700">
                No schools found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="school-card group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
                >
                  {/* Image Container with Zoom Effect */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        school.image
                          ? `/schoolImages/${school.image}`
                          : "/placeholder-school.jpg"
                      } // Fallback image logic recommended
                      alt={school.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                      {school.city}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2  group-hover:text-blue-600 transition-colors">
                        {school.name}
                      </h3>

                      <div className="flex items-start gap-2 text-slate-600 mb-3">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-500" />
                        <p className="text-sm leading-relaxed line-clamp-2">
                          {school.address}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 text-slate-600 mb-3">
                        <Landmark className="w-4 h-4 inline text-gray-600" />
                        <p className="text-sm leading-relaxed line-clamp-2">
                          {school.city}
                        </p>
                      </div>
                    </div>

                    {/* Footer of the Card */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-medium text-sm  group-hover:opacity-100 transition-opacity duration-300 ">
                      <span>View Campus</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
