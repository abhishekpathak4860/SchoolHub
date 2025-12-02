"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Loader2,
  UploadCloud,
  School,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin
gsap.registerPlugin(useGSAP);

// ZOD SCHEMA
const formSchema = z.object({
  name: z.string().min(3, "School name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  contact: z
    .string()
    .min(10, "Contact must be 10 digits")
    .max(10, "Contact must be 10 digits"),
  email_id: z.string().email("Invalid email address"),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required")
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file?.[0]?.type),
      "Only PNG, JPG or JPEG allowed"
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterSchool() {
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // Used to preview file name if needed
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Watch image to show filename (optional UX enhancement)
  const imageFile = watch("image");

  // GSAP Animation
  useGSAP(
    () => {
      gsap.fromTo(
        ".form-container",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    },
    { scope: containerRef }
  );

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setSuccessMsg("");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      const res = await fetch("/api/add-school", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.log("🔥 SERVER ERROR:", errorText);
        alert("Backend Error! Check console.");
        return;
      }

      const result = await res.json();
      if (result.success) {
        setSuccessMsg("🎉 School added successfully!");
        reset();
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.log("❌ Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-slate-50 font-sans"
      ref={containerRef}
    >
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6">
        <div className="form-container max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
          {/* Form Header */}
          <div className="bg-blue-600 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Register a New School
            </h2>
            <p className="text-blue-100">
              Enter the details below to add a school to the Reno Platform.
            </p>
          </div>

          <div className="p-8 md:p-10">
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg flex items-center gap-2">
                <School className="w-5 h-5" />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* --- Grid Layout for Inputs --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* School Name (Full Width) */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <School className="w-4 h-4 text-blue-600" /> School Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition outline-none text-slate-800"
                    placeholder="e.g. St. Xavier's High School"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Address (Full Width) */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" /> Address
                  </label>
                  <input
                    {...register("address")}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition outline-none text-slate-800"
                    placeholder="e.g. 123 Education Lane, Gomti Nagar"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    City
                  </label>
                  <input
                    {...register("city")}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition outline-none text-slate-800"
                    placeholder="e.g. Lucknow"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    State
                  </label>
                  <input
                    {...register("state")}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition outline-none text-slate-800"
                    placeholder="e.g. Uttar Pradesh"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" /> Contact Number
                  </label>
                  <input
                    {...register("contact")}
                    maxLength={10}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition outline-none text-slate-800"
                    placeholder="9876xxxxxx"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.contact.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" /> Email ID
                  </label>
                  <input
                    {...register("email_id")}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:bg-white transition outline-none text-slate-800"
                    placeholder="admin@school.com"
                  />
                  {errors.email_id && (
                    <p className="text-red-500 text-xs font-medium">
                      {errors.email_id.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- File Upload Section --- */}
              <div className="space-y-2 pt-4">
                <label className="text-sm font-semibold text-slate-700">
                  School Image
                </label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition p-6 text-center group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-sm text-slate-600">
                      {imageFile && imageFile.length > 0 ? (
                        <span className="text-blue-600 font-semibold">
                          {imageFile[0].name}
                        </span>
                      ) : (
                        <span>
                          <span className="font-semibold text-blue-600">
                            Click to upload
                          </span>{" "}
                          or drag and drop
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      PNG, JPG or JPEG (Max 5MB)
                    </p>
                  </div>
                </div>
                {errors.image?.message && (
                  <p className="text-red-500 text-xs font-medium">
                    {String(errors.image.message)}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Register School"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
