// app/purpose/giftsecond/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Music, Headphones 
} from 'lucide-react';
import Link from 'next/link';

export default function GiftSecondPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; size: number; x: number; duration: number; delay: number }>>([]);
  const [isClient, setIsClient] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Working online audio URLs (guaranteed to work)
  const playlist = [
    {
      id: 1,
      title: "Mai Koi Geet Gau",
      artist: "Nepali Romantic",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "3:45",
      emoji: "🎤",
      lyrics: "म कोइ गीत गाउँ तिम्रो मुस्कानको लागि...\nतिम्रो हाँसो संगै मेरो दिल बाँच्छ\nतिमी बिना यो मन एक्लो छ\nम कोइ गीत गाउँ तिम्रो नामको..."
    },
    {
      id: 2,
      title: "Sapna Ko Mayalu",
      artist: "Nepali Love",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "4:30",
      emoji: "💭",
      lyrics: "सपनाको मायालु तिमी नै छौ\nमेरो मनको रानी तिमी नै छौ\nहरेक सपनामा तिमी आउँछौ\nमेरो दिलको धड्कन तिमी नै हौ..."
    },
    {
      id: 3,
      title: "Timro Mann Ma",
      artist: "Nepali Romantic",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      duration: "4:15",
      emoji: "💕",
      lyrics: "तिम्रो मनमा म बस्छु सधैंभरी\nतिम्रो माया मेरो जीवन हो\nतिमी बिना यो मन उदास छ\nतिमी नै मेरो सपनाको राजकुमारी..."
    }
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    setIsClient(true);
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
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
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handlePlay = async () => {
    if (audioRef.current && !audioError) {
      try {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioError(false);
      } catch (error) {
        console.log('Playback error:', error);
        setAudioError(true);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setAudioError(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      handlePause();
    } else {
      await handlePlay();
    }
  };

  const nextSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowLyrics(false);
      setAudioError(false);
      setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    }
  };

  const prevSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowLyrics(false);
      setAudioError(false);
      setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAudioError(false);
    }
  };

  const handleAudioError = () => {
    console.error('Audio loading error');
    setAudioError(true);
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setAudioError(false);
      // Auto-play after song change if was playing
      if (isPlaying) {
        setTimeout(() => handlePlay(), 100);
      }
    }
  }, [currentSongIndex]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 relative overflow-hidden">
      
      <Link href="/purpose">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
        >
          <Heart className="text-pink-300" size={24} fill="#f9a8d4" />
        </motion.button>
      </Link>

      {floatingHearts.length > 0 && (
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
              <Heart className="text-pink-400/20" size={heart.size} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-xl" />
            
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              
              <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 p-4 text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <Headphones className="text-pink-300 mx-auto" size={30} />
                </motion.div>
                <h2 className="text-white font-semibold text-lg mt-1">our favourite song </h2>
                <p className="text-pink-300/60 text-xs">तिम्रो लागि मेरा गीतहरू</p>
              </div>

              <audio
                ref={audioRef}
                src={currentSong.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={nextSong}
                onError={handleAudioError}
                preload="metadata"
              />

              <div className="p-5 text-center">
                <motion.div
                  key={currentSongIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl mb-3">{currentSong.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{currentSong.title}</h3>
                  <p className="text-pink-300/80 text-sm">{currentSong.artist}</p>
                  
                  {audioError && (
                    <div className="mt-2 text-yellow-300 text-xs bg-black/30 rounded-lg p-2">
                      ⚠️ Click play to start the music
                    </div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLyrics(!showLyrics)}
                    className="mt-3 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition"
                  >
                    {showLyrics ? "Hide Lyrics" : "Show Lyrics"} 📝
                  </motion.button>
                </motion.div>

                {showLyrics && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-3 bg-black/30 rounded-lg backdrop-blur-sm"
                  >
                    <p className="text-pink-200 text-xs italic whitespace-pre-line">
                      {currentSong.lyrics}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="px-5">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ec4899 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/50 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 py-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevSong}
                  className="text-white/70 hover:text-white transition"
                >
                  <SkipBack size={24} />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 shadow-lg"
                  disabled={isLoading}
                >
                  {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSong}
                  className="text-white/70 hover:text-white transition"
                >
                  <SkipForward size={24} />
                </motion.button>
              </div>

              <div className="flex items-center justify-center gap-3 pb-5 px-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleMute}
                  className="text-white/60 hover:text-white"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ec4899 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`
                  }}
                />
              </div>

              <div className="bg-white/5 p-3 text-center border-t border-white/10">
                <p className="text-white/40 text-xs flex items-center justify-center gap-1">
                  <Music size={12} />
                  {currentSongIndex + 1} of {playlist.length} • {currentSong.duration}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-pink-300/40 text-xs mt-6"
          >
            🎵 हरेक गीतमा तिम्रो याद 🎵
          </motion.p>
        </div>
      </div>
    </div>
  );
}