import React, { useRef } from "react";
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
    <div className={`absolute inset-0 pointer-events-none ${wrapperClass}`}>
      <div className="overflow-hidden p-4"> {/* Padding prevents descenders from clipping inside the mask */}
        <motion.div style={{ y, opacity }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Base Animations for Bowls (Retained perfectly)
  const bowlFrontY = useTransform(scrollYProgress, [0, 0.3], ["0%", "150%"]);
  const bowlFrontOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const bowlTopY = useTransform(scrollYProgress, [0.3, 0.55], ["150%", "0%"]);
  const bowlTopRotate = useTransform(scrollYProgress, [0.6, 0.95], [0, -200]);
  const bowlTopScale = useTransform(scrollYProgress, [0.6, 0.95], [1, 0.55]);
  const bowlTopMoveY = useTransform(scrollYProgress, [0.6, 0.95], [0, -150]);

  return (
    <section id="home" ref={containerRef} className="relative h-[800vh] bg-brand-red w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-brand-red font-sans">
        
        {/* 3D Depth Layout */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
          
          {/* Timeline Phase 1: ENAK POWL */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0, 0]} 
            exitRange={[0.2, 0.28]} 
            wrapperClass="flex items-start justify-center pt-[15vh]"
          >
            <h1 className="text-[16vw] leading-[0.8] font-black text-brand-yellow uppercase tracking-tighter">
              ENAK POWL
            </h1>
          </ScrollTextBlock>

          {/* Timeline Phase 2: AUTHENTIC TASTE */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0.21, 0.29]} 
            wrapperClass="flex items-start justify-center pt-[15vh] z-10"
          >
            <h1 className="text-[11vw] leading-[0.8] font-black text-brand-yellow uppercase tracking-tighter">
              {"AUTHENTIC TASTE".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={[0.29, 0.36]} />{i !== a.length - 1 && " "}</span>)}
            </h1>
          </ScrollTextBlock>

          {/* Foreground Bowl Front (Image 4) */}
          <motion.div
            style={{ y: bowlFrontY, opacity: bowlFrontOpacity }}
            className="absolute z-20 w-[80vw] md:w-[60vw] lg:w-[60vw] max-w-[900px] mt-[210px]"
          >
            <img src="/bowl-front.png" alt="Ricebowl Front" className="w-full object-contain" />
          </motion.div>

          {/* Foreground Bowl Top (Image 5) */}
          <motion.div className="absolute z-30 w-[80vw] md:w-[60vw] lg:w-[70vw] max-w-[900px] mt-[400px]">
            <motion.div style={{ y: bowlTopY, rotate: bowlTopRotate, scale: bowlTopScale, translateY: bowlTopMoveY }}>
              <img src="/bowl-top.png" alt="Ricebowl Top" className="w-full object-contain" />
            </motion.div>
          </motion.div>

          {/* Timeline Phase 3: YOUNG PEPOWL'S (Left aligned - NO Word Reavel) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0.4, 0.45]} 
            exitRange={[0.55, 0.6]} 
            wrapperClass="flex items-start justify-start pl-[5vw] pr-[55vw] pt-[33vh]"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-yellow uppercase tracking-tighter leading-none italic drop-shadow-lg">
              YOUNG PEPOWL'S FAVORITE RICEBOWL.
            </h2>
          </ScrollTextBlock>

          {/* Timeline Phase 4: CRAVING SATISFACTION (Right aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0.56, 0.65]} 
            exitRange={[0.75, 0.8]} 
            wrapperClass="flex items-start justify-end pr-[5vw] pl-[55vw] text-right pt-[38vh]"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-yellow uppercase tracking-tighter leading-none italic drop-shadow-lg">
              {"CRAVING SATISFACTION".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={[0.65, 0.7]} />{i !== a.length - 1 && " "}</span>)}
            </h2>
          </ScrollTextBlock>

          {/* Timeline Phase 4: NEW PARAGRAPH (Left aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0.55, 0.65]} 
            exitRange={[0.75, 0.8]} 
            wrapperClass="flex items-start justify-start pl-[5vw] pr-[55vw] pt-[44vh]"
          >
            <p className="text-base md:text-lg font-medium text-[#E6B800] leading-normal drop-shadow-md max-w-[310px]">
              {"Authentic Indonesian flavors, elevated for the modern hustle. Every bowl is a masterpiece of spice and soul.".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={[0.65, 0.7]} />{i !== a.length - 1 && " "}</span>)}
            </p>
          </ScrollTextBlock>

          {/* Timeline Phase 5: SPICE. FLAVOR. SATISFACTION. (Left aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0.7, 0.85]} 
            exitRange={[0.95, 1]} 
            wrapperClass="flex items-start justify-start pl-[5vw] pr-[55vw] pt-[42vh]"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-yellow uppercase tracking-tighter leading-none italic drop-shadow-lg">
              {"SPICE. FLAVOR. SATISFACTION.".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={[0.85, 0.9]} />{i !== a.length - 1 && " "}</span>)}
            </h2>
          </ScrollTextBlock>

          {/* Timeline Phase 5: NEW PARAGRAPH (Right aligned) */}
          <ScrollTextBlock 
            progress={scrollYProgress} 
            enterRange={[0.75, 0.85]} 
            exitRange={[0.95, 1]} 
            wrapperClass="flex items-start justify-end pr-[5vw] pl-[55vw] text-right pt-[44vh]"
          >
            <p className="text-base md:text-lg font-medium text-[#E6B800] leading-normal drop-shadow-md max-w-[310px] ml-auto">
              {"Not just a meal, but a lifestyle choice for the young and the hungry. Bold Indonesian Flavors in every bite.".split(" ").map((w, i, a) => <span key={i}><Word word={w} index={i} total={a.length} progress={scrollYProgress} range={[0.85, 0.9]} />{i !== a.length - 1 && " "}</span>)}
            </p>
          </ScrollTextBlock>

        </div>
      </div>
    </section>
  );
};
