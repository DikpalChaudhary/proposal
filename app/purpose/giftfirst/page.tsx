'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CapturedMemoriesPage() {
  // तपाईंले आफ्नो public/ folder मा रहेका इमेजका path हरू यहाँ राख्न सक्नुहुन्छ
  const memories = [
    {
      id: 1,
      src: "/", // आफ्नो इमेज path हाल्नुहोस्
      caption: "memories with you",
      rotation: -3,
      className: "col-span-1 row-span-1"
    },
    {
      id: 2,
      src: "/",
      caption: "us, in frames",
      rotation: 4,
      className: "col-span-1 row-span-1 md:col-start-3"
    },
    {
      id: 3,
      src: "/",
      caption: "",
      rotation: 2,
      className: "col-span-1 row-span-2 md:col-start-2 md:row-start-1"
    }
  ];

  return (
    <div className="min-h-screen bg-[#fbf8ed] text-[#4a2c11] font-sans antialiased relative overflow-hidden px-4 py-12 md:py-20">
      
      {/* Back to Home Button */}
      <Link href="/">
        <button className="fixed top-6 left-6 z-50 bg-[#4a2c11]/10 backdrop-blur-sm rounded-full p-2 px-4 shadow-sm hover:bg-[#4a2c11]/20 transition-all duration-300 text-xs font-medium">
          ← Back
        </button>
      </Link>

      {/* Floating Sparkles Background */}
      <div className="absolute top-1/4 left-10 opacity-40 pointer-events-none animate-pulse">
        <Sparkles className="text-pink-400" size={20} />
      </div>
      <div className="absolute bottom-1/3 right-12 opacity-40 pointer-events-none animate-bounce duration-1000">
        <Sparkles className="text-pink-400" size={24} />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header Text (POV) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-2 uppercase">
            Memories with you, in frames, captured in moments
          </h1>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase">
            but can't
          </h2>
        </motion.div>

        {/* Polaroid Memories Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full items-center justify-center my-4">
          
          {/* Left Frame: Memories with you */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            className="bg-white p-4 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-sm border border-gray-100 max-w-xs mx-auto w-full"
          >
            <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden rounded-sm relative">
              <img 
                src="/photo1.jpg" 
                alt="Memories with you" 
                className="w-full h-full object-cover grayscale-[10%]"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600" }}
              />
            </div>
            <p className="font-serif italic text-center text-pink-600/80 mt-6 text-lg tracking-wide">
              memories with you
            </p>
          </motion.div>

          {/* Middle Frame: Photo Strip / Long Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            className="bg-white p-4 pb-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-sm border border-gray-100 max-w-[260px] mx-auto w-full flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="aspect-[4/3] bg-gray-100 overflow-hidden rounded-sm">
                  <img 
                    src={`/strip-${index}.jpg`} 
                    alt="Captured Moment Strip" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400" }}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Frame: Us, in frames */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
            className="bg-white p-4 pb-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-sm border border-gray-100 max-w-xs mx-auto w-full"
          >
            <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden rounded-sm">
              <img 
                src="/photo2.jpg" 
                alt="Us in frames" 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600" }}
              />
            </div>
            <p className="font-serif italic text-center text-pink-600/80 mt-6 text-lg tracking-wide">
              us, in frames
            </p>
          </motion.div>

        </div>

        {/* Footer Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="font-serif italic text-3xl md:text-4xl text-rose-700/80 tracking-wide font-medium">
            Captured memories
          </h3>
        </motion.div>

      </div>
    </div>
  );
}