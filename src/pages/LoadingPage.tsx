import { useState, useEffect } from "react";

const LoadingPage = ({ onComplete }: { onComplete: () => void }) => {
  const [loadingText, setLoadingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const fullText = "Loading Portfolio...";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setLoadingText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Show content after typing is complete
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 500); // 500ms for fade out
        }, 500);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, fullText.length, onComplete]);

  return (
    <div className={`fixed inset-0 bg-background flex items-center justify-center z-50 ${isExiting ? 'animate-fade-out' : ''}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-border/20 animate-pulse"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo/Name */}
        <div className="mb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-2">
            Elwalid Ben Hariz
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>

        {/* Loading text with typewriter effect */}
        <div className="mb-12">
          <h2 className="text-xl lg:text-2xl text-muted-foreground">
            {loadingText}
            <span className="animate-pulse ml-1">|</span>
          </h2>
        </div>

        {/* Loading animation video */}
        <div className="relative w-32 h-32 mx-auto mb-8 rounded-xl overflow-hidden">
          <video
            src="/assets/load.webm"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            onError={(e) => {
              // Hide video if it fails to load
              (e.target as HTMLVideoElement).style.display = 'none';
            }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-muted/30 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"
            style={{
              width: `${(currentIndex / fullText.length) * 100}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>

        {/* Loading percentage */}
        <div className="mt-4">
          <span className="text-sm text-muted-foreground">
            {Math.round((currentIndex / fullText.length) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

