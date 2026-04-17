import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
  range: [number, number];
}

const Word = ({ word, index, total, progress, range }: WordProps) => {
  const [start, end] = range;
  const wordStart = start + (index / total) * (end - start);
  const wordEnd = start + ((index + 1) / total) * (end - start);
  const opacity = useTransform(progress, [wordStart, wordEnd], [0.15, 1]);
  return <motion.span style={{ opacity }}>{word}</motion.span>;
};

interface ScrollTextBlockProps {
  children: React.ReactNode;
  progress: any;
  enterRange: [number, number];
  exitRange?: [number, number];
  wrapperClass?: string;
}

const ScrollTextBlock = ({ children, progress, enterRange, exitRange, wrapperClass = "flex items-center justify-center" }: ScrollTextBlockProps) => {
  // If exitRange is provided, animate out. Otherwise, enter and stay.
  const y = useTransform(
    progress, 
    exitRange ? [enterRange[0], enterRange[1], exitRange[0], exitRange[1]] : [enterRange[0], enterRange[1]], 
    exitRange ? ["100%", "0%", "0%", "-100%"] : ["100%", "0%"]
  );
  // Opacity jumps instantly to 1 so the slide-up mask works without hiding the Word-reveal!
  const opacity = useTransform(
    progress, 
    exitRange ? [enterRange[0] - 0.001, enterRange[0], exitRange[0], exitRange[1]] : [enterRange[0] - 0.001, enterRange[0]], 
    exitRange ? [0, 1, 1, 0] : [0, 1]
  );

  return (
    <div className={`hero-scroll-parent absolute inset-0 pointer-events-none ${wrapperClass}`}>
      <div className="hero-fix-padding-cut overflow-hidden p-4"> {/* Padding prevents descenders from clipping inside the mask */}
        <motion.div style={{ y, opacity }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile/tablet layout detection — adjusts animation timing only below 1024px
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsCompact(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsCompact(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Base Animations for Bowls (Retained perfectly)
  const bowlFrontY = useTransform(
    scrollYProgress, 
    isCompact ? [0, 0.45] : [0, 0.3], 
    isCompact ? ["0dvh", "180dvh"] : ["0%", "150%"]
  );
  const bowlFrontOpacity = useTransform(
    scrollYProgress, 
    isCompact ? [0.35, 0.45] : [0.1, 0.3], 
    [1, 0]
  );
  
  const bowlTopY = useTransform(
    scrollYProgress, 
    [0.3, 0.55], 
    isCompact ? ["220dvh", "0dvh"] : ["150%", "0%"]
  );
  const bowlTopRotate = useTransform(scrollYProgress, [0.6, 0.95], [0, -200]);
  const bowlTopScale = useTransform(scrollYProgress, [0.6, 0.95], [1, 0.55]);
  const bowlTopMoveY = useTransform(scrollYProgress, [0.6, 0.95], [0, -150]);

  return (
    <section id="home" ref={containerRef} className="relative h-[400vh] lg:h-[800vh] bg-brand-red w-full">
      <div className="sticky top-0 h-screen w-full lg:overflow-hidden flex flex-col items-center justify-center bg-brand-red font-sans">
        
        {/* 3D Depth Layout */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
          
          {/* Timeline Phase 1: ENAK POWL */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0, 0]} 
            exitRange={isCompact ? [0.12, 0.18] : [0.2, 0.28]} 
            wrapperClass="flex items-start justify-center pt-[15vh]"
          >
            <h1 className="hero-h1-tablet text-[16vw] leading-[0.8] font-black text-brand-yellow uppercase tracking-tighter">
              ENAK POWL
            </h1>
          </ScrollTextBlock>

          {/* Timeline Phase 2: AUTHENTIC TASTE */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={isCompact ? [0.14, 0.22] : [0.21, 0.29]} 
            exitRange={isCompact ? [0.30, 0.36] : undefined}
            wrapperClass="flex items-start justify-center pt-[15vh] z-0 lg:z-10"
          >
            <h1 className="hero-h1-tablet text-[16vw] lg:text-[11vw] leading-[0.8] font-black text-brand-yellow uppercase tracking-tighter mobile-hero-text">
              {"AUTHENTIC TASTE".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={isCompact ? [0.22, 0.28] : [0.29, 0.36]} />{i !== a.length - 1 && " "}</span>)}
            </h1>
          </ScrollTextBlock>

          {/* Foreground Bowl Front (Image 4) */}
          <motion.div
            style={{ y: bowlFrontY, opacity: bowlFrontOpacity }}
            className="hero-bowl-front absolute z-20 w-[105vw] md:w-[60vw] lg:w-[60vw] max-w-[900px] mt-[210px] max-lg:mt-[120px]"
          >
            <img src="/bowl-front.png" alt="Ricebowl Front" className="w-full object-contain" />
          </motion.div>

          {/* Foreground Bowl Top (Image 5) */}
          <motion.div className="hero-bowl-top absolute z-30 w-[100vw] md:w-[60vw] lg:w-[70vw] max-w-[900px] mt-[400px] max-lg:mt-[240px]">
            <motion.div style={{ y: bowlTopY, rotate: bowlTopRotate, scale: bowlTopScale, translateY: bowlTopMoveY }}>
              <img src="/bowl-top.png" alt="Ricebowl Top" className="w-full object-contain" />
            </motion.div>
          </motion.div>

          {/* Timeline Phase 3: YOUNG PEPOWL'S (Left aligned - NO Word Reavel) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={isCompact ? [0.38, 0.44] : [0.4, 0.45]} 
            exitRange={isCompact ? [0.55, 0.60] : [0.55, 0.6]} 
            wrapperClass="flex items-start justify-start pl-[5vw] pr-[15vw] lg:pr-[55vw] pt-[15vh] lg:pt-[33vh]"
          >
            <h2 className="hero-fix-text-cut text-4xl md:text-[3.5vw] lg:text-5xl xl:text-7xl font-black text-brand-yellow uppercase tracking-tighter leading-none italic drop-shadow-lg mobile-hero-text max-lg:max-w-[280px] md:max-w-[80vw] lg:max-w-none">
              YOUNG PEPOWL'S FAVORITE RICEBOWL.
            </h2>
          </ScrollTextBlock>

          {/* Timeline Phase 4: CRAVING SATISFACTION (Right aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={isCompact ? [0.60, 0.65] : [0.56, 0.65]} 
            exitRange={isCompact ? [0.72, 0.77] : [0.75, 0.8]} 
            wrapperClass="flex items-start justify-end pr-[5vw] pl-[15vw] lg:pl-[55vw] text-right pt-[18vh] lg:pt-[38vh]"
          >
            <h2 className="hero-fix-text-cut text-4xl md:text-[3.5vw] lg:text-5xl xl:text-7xl font-black text-brand-yellow uppercase tracking-tighter leading-none italic drop-shadow-lg mobile-hero-text max-lg:max-w-[250px] md:max-w-[80vw] lg:max-w-none">
              {"CRAVING SATISFACTION".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={isCompact ? [0.65, 0.70] : [0.65, 0.7]} />{i !== a.length - 1 && " "}</span>)}
            </h2>
          </ScrollTextBlock>

          {/* Timeline Phase 4: NEW PARAGRAPH (Left aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={isCompact ? [0.60, 0.65] : [0.55, 0.65]} 
            exitRange={isCompact ? [0.72, 0.77] : [0.75, 0.8]} 
            wrapperClass="flex items-start justify-start pl-[5vw] pr-[15vw] lg:pr-[55vw] pt-[30vh] lg:pt-[44vh]"
          >
            <p className="hero-fix-p-cut text-base md:text-[1.8vw] lg:text-base xl:text-lg font-medium text-[#E6B800] leading-normal drop-shadow-md lg:max-w-[310px] max-lg:w-[170px] md:w-auto md:max-w-[60vw] lg:max-w-[310px] mobile-hero-text">
              {"Authentic Indonesian flavors, elevated for the modern hustle. Every bowl is a masterpiece of spice and soul.".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={isCompact ? [0.65, 0.70] : [0.65, 0.7]} />{i !== a.length - 1 && " "}</span>)}
            </p>
          </ScrollTextBlock>

          {/* Timeline Phase 5: SPICE. FLAVOR. SATISFACTION. (Left aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={isCompact ? [0.78, 0.84] : [0.7, 0.85]} 
            exitRange={isCompact ? [0.96, 1] : [0.95, 1]} 
            wrapperClass="flex items-start justify-start pl-[5vw] pr-[15vw] lg:pr-[55vw] pt-[14vh] lg:pt-[42vh]"
          >
            <h2 className="hero-fix-text-cut text-4xl md:text-[3.5vw] lg:text-5xl xl:text-7xl font-black text-brand-yellow uppercase tracking-tighter leading-none italic drop-shadow-lg mobile-hero-text max-lg:max-w-[250px] md:max-w-[80vw] lg:max-w-none">
              {"SPICE. FLAVOR. SATISFACTION.".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={isCompact ? [0.84, 0.90] : [0.85, 0.9]} />{i !== a.length - 1 && " "}</span>)}
            </h2>
          </ScrollTextBlock>

          {/* Timeline Phase 5: NEW PARAGRAPH (Right aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={isCompact ? [0.78, 0.84] : [0.75, 0.85]} 
            exitRange={isCompact ? [0.96, 1] : [0.95, 1]} 
            wrapperClass="flex items-start justify-end pr-[5vw] pl-[15vw] lg:pl-[55vw] text-right pt-[46vh] lg:pt-[47.5vh]"
          >
            <p className="hero-fix-p-cut text-[13px] md:text-[1.5vw] lg:text-base xl:text-xl font-black text-brand-yellow leading-tight lg:leading-none drop-shadow-2xl lg:max-w-[420px] max-lg:w-[240px] md:w-auto md:max-w-[60vw] lg:max-w-[420px] ml-auto mobile-hero-text text-right italic tracking-tighter uppercase">
              {"Not just a meal, but a lifestyle choice for the young and the hungry. Bold Indonesian Flavors in every bite.".split(" ").map((w, i, a) => (
                <span key={i} className={(w.toUpperCase() === "BOLD" || w.toUpperCase() === "INDONESIAN" || w.toUpperCase() === "FLAVORS" || w.toUpperCase() === "BITE") ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" : ""}>
                  <Word word={w} index={i} total={a.length} progress={scrollYProgress} range={isCompact ? [0.84, 0.90] : [0.85, 0.9]} />
                  {i !== a.length - 1 && " "}
                </span>
              ))}
            </p>
          </ScrollTextBlock>

        </div>
      </div>
    </section>
  );
};
