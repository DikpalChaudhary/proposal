'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Heart, Sparkles, Flower2, X, Gift } from 'lucide-react';
import Link from 'next/link';

export default function ProposePage() {
  const [response, setResponse] = useState<'pending' | 'yes' | 'no'>('pending');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [shakeYes, setShakeYes] = useState(false);
  const [showDesperateMessage, setShowDesperateMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; size: number; x: number; duration: number; delay: number }>>([]);
  const [showLastChance, setShowLastChance] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const desperateMessages = [
    "Wait! 🥺",
    "Don't go! 💔",
    "Think about it! 😢",
    "Give me a chance! 🙏",
  ];

  // Gift data with titles and links
  const gifts = [
    {
      id: 1,
      title: "Captured Memories",
      emoji: "📸",
      href: "/purpose/giftfirst",
      color: "from-red-500 to-pink-500",
      description: "Our beautiful moments"
    },
    {
      id: 2,
      title: "Video Memories",
      emoji: "🎬",
      href: "/purpose/video", // Video player page
      color: "from-purple-500 to-pink-500",
      description: "Watch our story unfold"
    },
    {
      id: 3,
    title: "Love Letter & Promises",
    emoji: "💌",
    href: "/purpose/giftthird",
    color: "from-amber-500 to-orange-500",
    description: "My promises to you"
    }
  ];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    
    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: i,
        size: Math.random() * 30 + 15,
        x: Math.random() * window.innerWidth,
        duration: Math.random() * 8 + 4,
        delay: Math.random() * 5
      });
    }
    setFloatingHearts(newHearts);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (response === 'yes') {
      setShowConfetti(true);
      setTimeout(() => setShowLoveLetter(true), 800);
      setTimeout(() => setShowGifts(true), 1200);
    }
  }, [response]);

  const handleYes = () => {
    setResponse('yes');
  };

  const handleNo = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    
    if (newCount >= 5) {
      // Show last chance and remove No button
      setShowLastChance(true);
      setCurrentMessage("Last Chance! 💕");
      setShowDesperateMessage(true);
      setTimeout(() => setShowDesperateMessage(false), 2000);
    } else {
      setCurrentMessage(desperateMessages[newCount - 1]);
      setShowDesperateMessage(true);
      
      setShakeYes(true);
      setTimeout(() => setShakeYes(false), 500);
      setTimeout(() => setShowDesperateMessage(false), 1500);
      
      // Calculate a random safe bound within the card component dynamically
      if (cardRef.current) {
        const cardWidth = cardRef.current.clientWidth;
        const cardHeight = cardRef.current.clientHeight;

        // Keep coordinates within container padding boundaries safely
        // Generates an offset relative to its original rendered layout position
        const randomX = (Math.random() - 0.5) * (cardWidth - 120);
        const randomY = (Math.random() - 0.5) * (cardHeight - 160);
        
        setNoButtonPosition({ x: randomX, y: randomY });
      }
    }
  };

  const resetProposal = () => {
    setResponse('pending');
    setShowConfetti(false);
    setShowLoveLetter(false);
    setNoClickCount(0);
    setNoButtonPosition({ x: 0, y: 0 });
    setShowDesperateMessage(false);
    setCurrentMessage("");
    setShowLastChance(false);
    setShowGifts(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 relative overflow-hidden">
      
      {/* Back to Home Button */}
      <Link href="/">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-md rounded-full p-2 px-4 shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30 text-white text-sm"
        >
          ← Home
        </motion.button>
      </Link>

      {/* Background floating hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: windowSize.height, x: heart.x, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.3, 0] }}
            transition={{ 
              duration: heart.duration, 
              repeat: Infinity, 
              delay: heart.delay,
              ease: "linear"
            }}
            className="fixed"
          >
            <Heart 
              className="text-white/20" 
              size={heart.size}
            />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={400}
          recycle={false}
          colors={['#ff6b81', '#ffa502', '#ff7f50', '#ff9ff3', '#c44569', '#ff4757']}
        />
      )}

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          
          <AnimatePresence mode="wait">
            {response === 'pending' && (
              <motion.div
                key="pending"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/40 via-rose-500/40 to-red-500/40 rounded-3xl blur-2xl" />
                
                {/* Main Card */}
                <div 
                  ref={cardRef}
                  className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30 min-h-[400px] flex flex-col justify-between"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 py-5 px-4 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="text-white mx-auto" size={40} fill="white" />
                    </motion.div>
                  </div>

                  {/* Question Section */}
                  <div className="p-6 text-center flex-grow flex flex-col justify-center items-center relative">
                    <AnimatePresence>
                      {showDesperateMessage && currentMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -30, scale: 0 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -30, scale: 0 }}
                          className={`absolute top-2 z-50 text-white px-4 py-2 rounded-full shadow-2xl font-bold whitespace-nowrap text-sm ${showLastChance ? 'bg-gradient-to-r from-orange-500 to-red-500 animate-pulse' : 'bg-red-500'}`}
                        >
                          <div className="flex items-center gap-1">
                            {showLastChance ? <Heart size={14} fill="white" /> : <X size={14} />}
                            {currentMessage}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                      {showLastChance ? "Last Chance! 💕" : "Will you go on a date with me?"}
                    </h2>
                    
                    <p className="text-gray-500 text-base mb-8">
                      {showLastChance ? "Please say yes! 🥺" : "क्या तुम मेरे साथ डेट पे चलोगी?"}
                    </p>

                    {/* Interactive Buttons Container */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center min-h-[120px] w-full relative">
                      {/* Yes Button - Always visible */}
                      <motion.button
                        animate={shakeYes ? { x: [0, -8, 8, -8, 0] } : { x: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYes}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-8 rounded-full text-base shadow-lg z-10"
                      >
                        हाँ जी! ❤️
                      </motion.button>

                      {/* No Button - Hide when last chance is shown */}
                      {!showLastChance && (
                        <motion.button
                          animate={{ 
                            x: noButtonPosition.x,
                            y: noButtonPosition.y
                          }}
                          transition={{ type: "spring", damping: 15, stiffness: 250 }}
                          whileHover={{ scale: 0.95 }}
                          onClick={handleNo}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-full text-base shadow-md transition-colors"
                        >
                          नहीं 💔
                        </motion.button>
                      )}
                    </div>

                    {/* Attempt Counter - Hide when last chance is shown */}
                    {noClickCount > 0 && noClickCount < 5 && !showLastChance && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4"
                      >
                        <p className="text-gray-400 text-xs">
                          {5 - noClickCount} attempts remaining
                        </p>
                        <div className="flex justify-center gap-1 mt-1">
                          {[...Array(5 - noClickCount)].map((_, i) => (
                            <Heart key={i} className="text-pink-400" size={10} fill="#f472b6" />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="pb-4 text-center">
                    <p className="text-pink-400 text-xs">
                      ✨ My heart is waiting for your answer ✨
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* No Response - After trying to escape */}
            {response === 'no' && (
              <motion.div
                key="no"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/30">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.8 }}
                  >
                    <Heart className="text-gray-400 mx-auto mb-4" size={60} />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">Okay... 💔</h2>
                  <p className="text-gray-500 mb-3 text-sm">I'll wait for you forever...</p>
                  <p className="text-pink-400 italic mb-5 text-sm">"I'll ask again sometime"</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={resetProposal}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-2 px-5 rounded-full text-sm"
                  >
                    Try Again 💕
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Yes Response - Celebration */}
            {response === 'yes' && (
              <motion.div
                key="yes"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30">
                  
                  <div className="bg-gradient-to-r from-yellow-500 via-pink-500 to-rose-500 py-6 px-4 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Heart className="text-white mx-auto mb-2" size={50} fill="white" />
                    </motion.div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                      हाँ जी! 🎉
                    </h1>
                    <p className="text-yellow-100 text-sm">You said YES!</p>
                  </div>

                  <div className="p-6 text-center">
                    {showLoveLetter && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <p className="text-gray-700 text-base leading-relaxed">
                          You just made me the happiest person in the world!
                        </p>
                        <p className="text-pink-500 font-semibold text-lg">
                          I can't wait for our date! 💕
                        </p>
                        
                        {/* Three Big Gift Icons */}
                        {showGifts && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="mt-6 pt-4 border-t-2 border-pink-200"
                          >
                            <h3 className="text-gray-700 font-semibold mb-4 text-sm">
                              Here are your surprise gifts! 🎁
                            </h3>
                            <div className="flex flex-wrap justify-center gap-6">
                              {gifts.map((gift, index) => (
                                <motion.div
                                  key={gift.id}
                                  initial={{ opacity: 0, y: 30 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.5 + index * 0.2 }}
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Link
                                    href={gift.href}
                                    target="_self"
                                    rel="noopener noreferrer"
                                    className="block"
                                  >
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`w-24 h-24 bg-gradient-to-br ${gift.color} rounded-2xl shadow-xl flex items-center justify-center transform transition-all duration-300 hover:shadow-2xl`}>
                                        <Gift size={48} className="text-white" strokeWidth={1.5} />
                                      </div>
                                      <div className="text-center">
                                        <p className="text-xs font-semibold text-gray-700">
                                          {gift.emoji} {gift.title}
                                        </p>
                                        <p className="text-[10px] text-gray-500 mt-1">
                                          {gift.description}
                                        </p>
                                      </div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                            <p className="text-gray-400 text-xs mt-4">
                              Click on any gift to open! ✨
                            </p>
                          </motion.div>
                        )}
                        
                        <div className="flex justify-center gap-2 mt-4">
                          <Heart className="text-pink-400" size={16} fill="#f472b6" />
                          <Heart className="text-pink-400" size={20} fill="#f472b6" />
                          <Heart className="text-pink-400" size={16} fill="#f472b6" />
                        </div>
                      </motion.div>
                    )}
                    
                    <button
                      onClick={resetProposal}
                      className="text-pink-500 text-xs mt-4 hover:text-pink-600 transition"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed bottom-4 right-4 opacity-30 pointer-events-none">
        <Flower2 className="text-white" size={30} />
      </div>
      <div className="fixed top-20 right-4 opacity-30 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-yellow-300" size={25} />
        </motion.div>
      </div>
    </div>
  );
}