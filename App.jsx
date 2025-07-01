import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import Messages from './components/Messages';
import WishesForm from './components/WishesForm';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/birthday-song.mp3');
    audioRef.current.loop = true;

    const timer = setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => alert("Tap the page to enable sound."));
    }
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <p>Preparing your celebration...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <HeroSection toggleMusic={toggleMusic} isPlaying={isPlaying} />
      <Gallery />
      <Messages />
      <WishesForm />
      <Footer />
    </div>
  );
};

export default App;