// app/purpose/giftthird/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flower2, Pen, Star, Lock, Unlock } from 'lucide-react';
import Link from 'next/link';

export default function GiftThirdPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromise, setShowPromise] = useState(false);
  const [selectedPromise, setSelectedPromise] = useState<number | null>(null);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; size: number; x: number; duration: number; delay: number }>>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Love letter content
  const loveLetter = {
    title: "My Dearest Love 💌",
    content: `From the moment I met you, my world changed in ways I never thought possible. 
    Every day with you feels like a beautiful dream that I never want to wake up from.
    
    Your smile lights up my darkest days, your laughter is the sweetest melody, 
    and your love has given me a purpose I never knew I needed.
    
    I promise to cherish every moment we share, to support you in all your dreams, 
    and to love you with all my heart, today, tomorrow, and always.
    
    You are my greatest adventure, my safest home, and my forever love.
    
    With all my love,
    Your Forever 💕`
  };

  // Promises array
  const promises = [
    {
      id: 1,
      title: "Promise of Forever",
      description: "I promise to stand by your side through every season of life, in sunshine and in rain, in laughter and in tears.",
      icon: "💑",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      title: "Promise of Honesty",
      description: "I promise to always be truthful with you, to share my thoughts and feelings openly, and to listen with an open heart.",
      icon: "💝",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Promise of Support",
      description: "I promise to be your biggest cheerleader, to celebrate your victories, and to lift you up during challenges.",
      icon: "🌟",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      title: "Promise of Growth",
      description: "I promise to grow with you, to learn from our differences, and to build a beautiful future together.",
      icon: "🌱",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      title: "Promise of Romance",
      description: "I promise to keep the spark alive, to surprise you with love notes, and to never stop dating you.",
      icon: "💕",
      color: "from-red-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Generate floating hearts
    const newHearts = [];
    for (let i = 0; i < 25; i++) {
      newHearts.push({
        id: i,
        size: Math.random() * 25 + 10,
        x: Math.random() * window.innerWidth,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 5
      });
    }
    setFloatingHearts(newHearts);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const openLetter = () => {
    setIsOpen(true);
  };

  const showPromiseDetails = (id: number) => {
    setSelectedPromise(id);
    setShowPromise(true);
  };

  const closePromise = () => {
    setShowPromise(false);
    setSelectedPromise(null);
  };

  const selectedPromiseData = promises.find(p => p.id === selectedPromise);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-purple-900 to-pink-900 relative overflow-hidden">
      
      {/* Back Button */}
      <Link href="/purpose">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-md rounded-full p-2 px-4 shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30 text-white text-sm flex items-center gap-2"
        >
          ← Back to Gifts
        </motion.button>
      </Link>

      {/* Background floating hearts */}
      {floatingHearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none">
          {floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ y: windowSize.height, x: heart.x, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 0.2, 0] }}
              transition={{ 
                duration: heart.duration, 
                repeat: Infinity, 
                delay: heart.delay,
                ease: "linear"
              }}
              className="fixed"
            >
              <Heart className="text-pink-400/20" size={heart.size} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Envelope/Letter Preview */
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative cursor-pointer"
                onClick={openLetter}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl" />
                
                <div className="relative bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl shadow-2xl overflow-hidden border border-white/30 p-8 md:p-12 text-center">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-pink-300 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-pink-300 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-pink-300 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-pink-300 rounded-br-2xl" />
                  
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                      <Heart size={48} className="text-white" fill="white" />
                    </div>
                  </motion.div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                    A Special Letter For You 💌
                  </h1>
                  <p className="text-gray-600 mb-6">Click to open your love letter</p>
                  
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Pen className="text-pink-500 mx-auto" size={30} />
                  </motion.div>
                  
                  <p className="text-xs text-gray-400 mt-6">✨ Tap anywhere to open ✨</p>
                </div>
              </motion.div>
            ) : (
              /* Love Letter Content */
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl" />
                
                <div className="relative bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl shadow-2xl overflow-hidden border border-white/30">
                  
                  {/* Letter Header */}
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="text-white mx-auto mb-2" size={40} fill="white" />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{loveLetter.title}</h2>
                  </div>

                  {/* Letter Body */}
                  <div className="p-6 md:p-8">
                    <div className="prose prose-rose max-w-none">
                      {loveLetter.content.split('\n\n').map((paragraph, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="text-gray-700 leading-relaxed mb-4 text-base"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>

                    {/* Promises Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-8 pt-6 border-t-2 border-pink-200"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Star size={20} className="text-pink-500 fill-pink-500" />
                        My Promises to You
                        <Star size={20} className="text-pink-500 fill-pink-500" />
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {promises.map((promise, index) => (
                          <motion.button
                            key={promise.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => showPromiseDetails(promise.id)}
                            className="bg-gradient-to-r from-white/50 to-pink-50/50 rounded-xl p-4 text-left border border-pink-200 hover:shadow-lg transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-2xl">{promise.icon}</div>
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-1">{promise.title}</h4>
                                <p className="text-xs text-gray-600 line-clamp-2">{promise.description}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="mt-6 pt-4 text-center"
                    >
                      <p className="text-pink-500 text-sm flex items-center justify-center gap-2">
                        <Flower2 size={14} />
                        Forever and Always
                        <Flower2 size={14} />
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Promise Detail Modal */}
      <AnimatePresence>
        {showPromise && selectedPromiseData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closePromise}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 rounded-3xl blur-2xl" />
              
              <div className={`relative bg-gradient-to-br ${selectedPromiseData.color} rounded-2xl shadow-2xl overflow-hidden p-6 text-white`}>
                <button
                  onClick={closePromise}
                  className="absolute top-4 right-4 text-white/80 hover:text-white"
                >
                  <X size={24} />
                </button>
                
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{selectedPromiseData.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{selectedPromiseData.title}</h3>
                  <div className="w-20 h-1 bg-white/30 mx-auto rounded-full" />
                </div>
                
                <p className="text-center text-white/90 leading-relaxed">
                  {selectedPromiseData.description}
                </p>
                
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mt-6 text-center"
                >
                  <Heart size={30} className="mx-auto" fill="white" />
                </motion.div>
                
                <p className="text-center text-white/70 text-xs mt-4">
                  I make this promise to you today and forever 💕
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="fixed bottom-4 right-4 opacity-20 pointer-events-none">
        <Flower2 className="text-pink-400" size={40} />
      </div>
      <div className="fixed top-24 right-6 opacity-20 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-pink-400" size={30} />
        </motion.div>
      </div>
    </div>
  );
}

// Add X icon component since it's not imported
function X({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}