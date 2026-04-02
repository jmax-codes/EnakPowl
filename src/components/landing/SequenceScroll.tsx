"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface SequenceScrollProps {
  frameCount: number;
}

export const SequenceScroll = ({ frameCount }: SequenceScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [1, frameCount]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const promises = [];

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/sequence/extracted/ezgif-frame-${frameNumber}.jpg`;
        
        const promise = new Promise((resolve) => {
          img.onload = resolve;
        });
        
        promises.push(promise);
        loadedImages.push(img);
      }

      await Promise.all(promises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, [frameCount]);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const render = () => {
      const index = Math.floor(frameIndex.get());
      const img = images[index - 1] || images[0];

      if (img) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate aspect ratio for "cover" effect
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
          drawHeight = canvas.width / imgAspect;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgAspect;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        context.save();
        // Enable high quality smooth scaling
        context.imageSmoothingEnabled = true;
        (context as any).imageSmoothingQuality = 'high';
        
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        context.restore();
      }
    };

    // Update canvas on frame index change
    const unsubscribe = frameIndex.on("change", render);
    
    // Initial render
    render();

    // Handle resize with High DPI support
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      // Set the "actual" size of the canvas (drawing buffer)
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale the context so drawing operations match the CSS pixels if we were using paths,
      // but for drawImage filling the screen, we just want to fill the buffer.
      // However, our calculations above (drawWidth, drawHeight) were based on canvas.width
      // which is now scaled. So the math works out perfectly to fill the high-res buffer.
      
      // Ensure the visible size remains correct
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      render();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-brand-red">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
        
        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ opacity: opacity1 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white italic drop-shadow-2xl">EnakPowl</h1>
            <p className="text-xl md:text-2xl mt-4 text-brand-yellow font-medium italic drop-shadow-xl">Young Pepowl&apos;s Favorite RiceBowl</p>
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-start px-12 pointer-events-none">
          <motion.div 
            style={{ opacity: opacity2 }}
            className="max-w-xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white drop-shadow-2xl">Authentic Taste</h2>
            <p className="text-lg md:text-xl mt-4 text-white drop-shadow-xl">Crafted with passion for the next generation.</p>
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-end px-12 pointer-events-none">
          <motion.div 
            style={{ opacity: opacity3 }}
            className="max-w-xl text-right"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase text-white drop-shadow-2xl">Fresh Ingredients</h2>
            <p className="text-lg md:text-xl mt-4 text-white drop-shadow-xl">Only the best quality for your daily bowl.</p>
          </motion.div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ opacity: opacity4 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-8 text-white drop-shadow-2xl">Ready to Powl?</h1>
            <button className="px-8 py-4 bg-black text-white rounded-full text-xl font-bold pointer-events-auto hover:scale-110 transition-transform">
              Order Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
