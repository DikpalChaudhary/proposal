// app/photos/layout1/page.tsx
'use client';

import { Heart } from 'lucide-react';

export default function PolaroidHeartCollage() {
  // First section: Polaroid Photo Wall - 3 photos
  const polaroidPhotos1 = [
    { id: 1, url: "/image/1.jpg", rotate: -3 },
    { id: 2, url: "/image/2.jpg", rotate: 2 },
    { id: 3, url: "/image/3.jpg", rotate: -2 },
  ];

  // Third section: Heart Shape Photo Collage - 3 images
  const heartPhotos = [
    { id: 1, url: "/image/4.jpg", rotate: -3, position: "top" },
    { id: 2, url: "/image/5.jpg", rotate: 2, position: "left" },
    { id: 3, url: "/image/6.jpg", rotate: -2, position: "right" },
  ];

  // Fourth section: Polaroid Photo Wall - 2 photos
  const polaroidPhotos2 = [
    { id: 1, url: "/image/7.jpg", rotate: -4 },
    { id: 2, url: "/image/8.jpg", rotate: 3 },
  ];

  // Small message (quote with small height)
  const message = {
    text: "तिमी बिना यो मन उदास छ, तिमी संगै यो जीवन खास छ ।",
    author: "अज्ञात"
  };

  // Get position styles for heart shape (3 photos)
  const getPositionStyle = (position: string) => {
    const positions: Record<string, string> = {
      top: "top-0 left-1/2 transform -translate-x-1/2",
      left: "top-1/2 left-0 transform -translate-y-1/2",
      right: "top-1/2 right-0 transform -translate-y-1/2",
    };
    return positions[position];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* SECTION 1: Polaroid Photo Wall - 3 Photos */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-pink-600">✨ Most beautyfull ✨</h2>
            <div className="flex justify-center gap-1 mt-2">
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {polaroidPhotos1.map((photo) => (
              <div
                key={photo.id}
                className="bg-white p-3 pb-6 shadow-xl rounded-sm hover:shadow-2xl transition-all duration-300"
                style={{ transform: `rotate(${photo.rotate}deg)` }}
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-56 h-56 md:w-64 md:h-64 object-cover"
                />
                <div className="text-center mt-3">
                  <Heart className="inline-block text-pink-400" size={16} fill="#f472b6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Small Quote Message - Small Height */}
        <div className="my-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 max-w-2xl mx-auto p-3 px-6">
            <div className="flex items-center justify-center gap-3">
              <Heart className="text-pink-400" size={20} fill="#f472b6" />
              <p 
                className="text-pink-700 text-center text-sm md:text-base py-2"
                style={{ 
                  fontFamily: "'Great Vibes', 'Brush Script MT', 'Dancing Script', cursive",
                  fontWeight: 'bold'
                }}
              >
                "{message.text}"
              </p>
              <Heart className="text-pink-400" size={20} fill="#f472b6" />
            </div>
            <p className="text-pink-400 text-center text-xs">— {message.author}</p>
          </div>
        </div>

        {/* SECTION 3: Heart Shape Photo Collage - 3 Images */}
        <div className="my-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-pink-600">❤️ always on my heart ❤️</h2>
            <div className="flex justify-center gap-1 mt-2">
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
            </div>
          </div>
          
          <div className="relative min-h-[350px] flex items-center justify-center">
            {/* Center Heart */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
              <div className="text-7xl md:text-8xl opacity-30 animate-pulse">❤️</div>
            </div>

            {/* 3 Photos in Heart Shape */}
            {heartPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`absolute ${getPositionStyle(photo.position)} z-10 transition-all duration-300 hover:scale-110 hover:z-20`}
                style={{ transform: `rotate(${photo.rotate}deg)` }}
              >
                <div className="bg-white p-2 pb-4 shadow-xl rounded-sm">
                  <img
                    src={photo.url}
                    alt=""
                    className="w-32 h-32 md:w-40 md:h-40 object-cover"
                  />
                  <div className="text-center mt-2">
                    <Heart className="inline-block text-pink-400" size={12} fill="#f472b6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Polaroid Photo Wall - 2 Photos */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-pink-600">💕 Favourite 💕</h2>
            <div className="flex justify-center gap-1 mt-2">
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
              <Heart className="text-pink-400" size={14} fill="#f472b6" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
            {polaroidPhotos2.map((photo) => (
              <div
                key={photo.id}
                className="bg-white p-3 pb-6 shadow-xl rounded-sm hover:shadow-2xl transition-all duration-300"
                style={{ transform: `rotate(${photo.rotate}deg)` }}
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-64 h-64 md:w-72 md:h-72 object-cover"
                />
                <div className="text-center mt-3">
                  <Heart className="inline-block text-pink-400" size={18} fill="#f472b6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex gap-2">
            <Heart className="text-pink-400" size={20} fill="#f472b6" />
            <Heart className="text-pink-400" size={24} fill="#f472b6" />
            <Heart className="text-pink-400" size={20} fill="#f472b6" />
          </div>
          <p className="text-pink-400 text-sm mt-3">Every picture tells your beauty </p>
        </div>
      </div>
    </div>
  );
}