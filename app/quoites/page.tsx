// app/quotes/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Quote, ChevronLeft, ChevronRight, Star, Flower2 } from 'lucide-react';
import Link from 'next/link';

export default function QuotesPage() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hearts, setHearts] = useState<Array<{ id: number; size: number; x: number; duration: number; delay: number }>>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Romantic quotes collection
  const quotes = [
    {
      id: 1,
      text: "Every love story is beautiful, but ours will be my favorite.",
      author: "Unknown",
      emoji: "💕",
      category: "Romantic"
    },
    {
      id: 2,
      text: "In a sea of people, my eyes will always search only for you.",
      author: "Unknown",
      emoji: "👀",
      category: "Romantic"
    },
    {
      id: 3,
      text: "You are my today and all of my tomorrows.",
      author: "Leo Christopher",
      emoji: "💖",
      category: "Promise"
    },
    {
      id: 4,
      text: "I look at you and see the rest of my life in front of my eyes.",
      author: "Unknown",
      emoji: "👁️",
      category: "Future"
    },
    {
      id: 5,
      text: "Whatever our souls are made of, his and mine are the same.",
      author: "Emily Brontë",
      emoji: "✨",
      category: "Soulmate"
    },
    {
      id: 6,
      text: "You have bewitched me, body and soul, and I love, I love, I love you.",
      author: "Jane Austen",
      emoji: "💫",
      category: "Love"
    },
    {
      id: 7,
      text: "I wish I knew how to quit you.",
      author: "Brokeback Mountain",
      emoji: "🏔️",
      category: "Deep"
    },
    {
      id: 8,
      text: "You are the finest, loveliest, tenderest, and most beautiful person I have ever known.",
      author: "F. Scott Fitzgerald",
      emoji: "🌸",
      category: "Beautiful"
    },
    {
      id: 9,
      text: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
      author: "Angelita Lim",
      emoji: "💗",
      category: "Real Love"
    },
    {
      id: 10,
      text: "You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.",
      author: "Oscar Wilde",
      emoji: "🎵",
      category: "Deep"
    },
    {
      id: 11,
      text: "I swear I couldn't love you more than I do right now, and yet I know I will tomorrow.",
      author: "Leo Christopher",
      emoji: "📈",
      category: "Growing"
    },
    {
      id: 12,
      text: "When I see you, I fall in love all over again.",
      author: "Unknown",
      emoji: "💘",
      category: "Romantic"
    },
    {
      id: 13,
      text: "You make me want to be a better person.",
      author: "Unknown",
      emoji: "🌟",
      category: "Inspiration"
    },
    {
      id: 14,
      text: "If I know what love is, it is because of you.",
      author: "Hermann Hesse",
      emoji: "📖",
      category: "Wisdom"
    },
    {
      id: 15,
      text: "I love you without knowing how, or when, or from where. I love you simply, without problems or pride.",
      author: "Pablo Neruda",
      emoji: "🖋️",
      category: "Poetry"
    }
  ];

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Generate random hearts for background
    const newHearts = [];
    for (let i = 0; i < 30; i++) {
      newHearts.push({
        id: i,
        size: Math.random() * 30 + 15,
        x: Math.random() * window.innerWidth,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5
      });
    }
    setHearts(newHearts);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const nextQuote = () => {
    setDirection(1);
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setDirection(-1);
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  const goToQuote = (index: number) => {
    setDirection(index > currentQuoteIndex ? 1 : -1);
    setCurrentQuoteIndex(index);
  };

  const currentQuote = quotes[currentQuoteIndex];

  // Animation variants
  const quoteVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 90 : -90,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotateY: direction > 0 ? -90 : 90,
      transition: {
        duration: 0.4
      }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 relative overflow-hidden">
      
      {/* Back to Home Button */}
      <Link href="/">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
        >
          <Heart className="text-pink-300" size={24} fill="#f9a8d4" />
        </motion.button>
      </Link>

      {/* Background floating hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: windowSize.height, x: heart.x, opacity: 0 }}
            animate={{ y: -100, opacity: [0, 0.5, 0] }}
            transition={{ 
              duration: heart.duration, 
              repeat: Infinity, 
              delay: heart.delay,
              ease: "linear"
            }}
            className="fixed"
          >
            <Heart 
              className="text-pink-400/20" 
              size={heart.size} 
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3), transparent)",
            "radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3), transparent)",
            "radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3), transparent)",
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Quote className="text-pink-400 mx-auto mb-4" size={50} />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3"
                style={{ fontFamily: "'Great Vibes', 'Brush Script MT', cursive" }}>
              Love Quotes
            </h1>
            <p className="text-pink-200 text-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Words that speak the language of my heart
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <Heart key={i} className="text-pink-400 fill-pink-400" size={16} />
              ))}
            </div>
          </motion.div>

          {/* Quote Card */}
          <div className="relative">
            {/* Decorative outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-30" />
            
            {/* Main Quote Card */}
            <motion.div
              key={currentQuoteIndex}
              custom={direction}
              variants={quoteVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-tl-full" />
              
              {/* Quote Content */}
              <div className="p-8 md:p-12 text-center relative z-10">
                {/* Quote Emoji */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-6xl md:text-7xl mb-6"
                >
                  {currentQuote.emoji}
                </motion.div>
                
                {/* Quote Text - CURSIVE AND BOLD */}
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl leading-relaxed mb-6 text-white"
                  style={{ 
                    fontFamily: "'Great Vibes', 'Brush Script MT', 'Dancing Script', 'Pacifico', cursive",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    letterSpacing: "0.5px"
                  }}
                >
                  "{currentQuote.text}"
                </motion.p>
                
                {/* Quote Author - CURSIVE */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-2 text-pink-200"
                >
                  <div className="w-12 h-px bg-gradient-to-r from-transparent to-pink-400" />
                  <span 
                    className="text-lg md:text-xl italic"
                    style={{ 
                      fontFamily: "'Great Vibes', 'Brush Script MT', cursive",
                      fontWeight: '500'
                    }}
                  >
                    — {currentQuote.author}
                  </span>
                  <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-400" />
                </motion.div>
                
                {/* Category Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-pink-200 text-sm">
                    {currentQuote.category}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 gap-4">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevQuote}
                className="bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <ChevronLeft className="text-white" size={24} />
              </motion.button>
              
              {/* Quote Indicators */}
              <div className="flex gap-2 flex-wrap justify-center">
                {quotes.map((_, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => goToQuote(idx)}
                    className={`transition-all duration-300 ${
                      idx === currentQuoteIndex
                        ? 'w-8 h-2 bg-pink-400 rounded-full'
                        : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextQuote}
                className="bg-white/20 backdrop-blur-md rounded-full p-3 md:p-4 shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                <ChevronRight className="text-white" size={24} />
              </motion.button>
            </div>
          </div>

          {/* Quote Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-pink-300/60 text-sm">
              {currentQuoteIndex + 1} / {quotes.length} Quotes
            </p>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <div className="flex justify-center gap-2">
              <Sparkles className="text-yellow-400" size={16} />
              <p className="text-pink-300/50 text-sm" style={{ fontFamily: "'Great Vibes', cursive" }}>
                Every word comes from the heart
              </p>
              <Sparkles className="text-yellow-400" size={16} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-1/4 left-4 md:left-8 opacity-30 pointer-events-none">
        <Flower2 className="text-pink-400" size={40} />
      </div>
      <div className="fixed bottom-1/4 right-4 md:right-8 opacity-30 pointer-events-none">
        <Star className="text-yellow-400" size={40} />
      </div>
    </div>
  );
}