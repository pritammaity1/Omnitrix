// src/components/AlienSection.tsx

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Alien } from "../types";

interface AlienSectionProps {
  alien: Alien;
  index: number;
  total: number;
}

export default function AlienSection({
  alien,
  index,
  total,
}: AlienSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageGlowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const powersRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const paddedIndex = String(index + 1).padStart(2, "0");
  const paddedTotal = String(total).padStart(2, "0");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particle color change — fires when section is in center of viewport
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          window.dispatchEvent(
            new CustomEvent("particleColor", { detail: alien.color }),
          );
        },
        onEnterBack: () => {
          window.dispatchEvent(
            new CustomEvent("particleColor", { detail: alien.color }),
          );
        },
        onLeave: () => {
          window.dispatchEvent(
            new CustomEvent("particleColor", { detail: "#00ff41" }),
          );
        },
      });

      // Image entrance — separate trigger with wider range
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      // Image glow
      gsap.fromTo(
        imageGlowRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      // Background glow
      gsap.fromTo(
        bgGlowRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // Text elements — staggered entrance
      const textElements = [
        titleRef.current,
        nameRef.current,
        pillsRef.current,
        descRef.current,
      ];

      textElements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top ${75 - i * 8}%`,
              end: `top ${45 - i * 8}%`,
              scrub: 1,
            },
          },
        );
      });

      // Powers stagger
      const powerItems = powersRef.current?.querySelectorAll(".power-item");
      if (powerItems) {
        gsap.fromTo(
          powerItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: powersRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 1,
            },
          },
        );
      }

      // Progress bar
      gsap.fromTo(
        progressRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 95%",
            end: "top 70%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: (index + 1) / total,
          duration: 1,
          ease: "none",
          scrollTrigger: {
            trigger: progressRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [alien.color, index, total]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-void py-20"
    >
      {/* Background atmospheric glow */}
      <div
        ref={bgGlowRef}
        className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none opacity-0"
        style={{ backgroundColor: `${alien.color}15` }}
      />

      {/* Content grid */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-16 grid grid-cols-2 items-center gap-16">
        {/* Left — Alien image with HUD frame */}
        <div ref={imageRef} className="relative flex justify-center">
          {/* Color glow behind image */}
          <div
            ref={imageGlowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-0"
            style={{ backgroundColor: `${alien.color}25` }}
          />

          {/* HUD Frame Container */}
          <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Corner brackets */}
            <div
              className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 z-20 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:-top-4 group-hover:-left-4"
              style={{
                borderColor: isHovered ? alien.color : `${alien.color}60`,
              }}
            />
            <div
              className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 z-20 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:-top-4 group-hover:-right-4"
              style={{
                borderColor: isHovered ? alien.color : `${alien.color}60`,
              }}
            />
            <div
              className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 z-20 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:-bottom-4 group-hover:-left-4"
              style={{
                borderColor: isHovered ? alien.color : `${alien.color}60`,
              }}
            />
            <div
              className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 z-20 transition-all duration-500 group-hover:w-10 group-hover:h-10 group-hover:-bottom-4 group-hover:-right-4"
              style={{
                borderColor: isHovered ? alien.color : `${alien.color}60`,
              }}
            />

            {/* HUD data labels */}
            <div className="absolute -top-8 left-0 z-20">
              <span
                className="font-space text-[9px] font-bold tracking-[0.2em] uppercase"
                style={{ color: `${alien.color}90` }}
              >
                DNA Stability: 100%
              </span>
            </div>
            <div className="absolute -top-8 right-0 z-20">
              <span
                className="font-space text-[9px] font-bold tracking-[0.2em] uppercase"
                style={{ color: `${alien.color}90` }}
              >
                Scan Active
              </span>
            </div>
            <div className="absolute -bottom-8 left-0 z-20">
              <span
                className="font-space text-[9px] font-bold tracking-[0.2em] uppercase"
                style={{ color: `${alien.color}90` }}
              >
                Bio-Thermal: Nominal
              </span>
            </div>
            <div className="absolute -bottom-8 right-0 z-20">
              <span
                className="font-space text-[9px] font-bold tracking-[0.2em] uppercase"
                style={{ color: `${alien.color}90` }}
              >
                Origin: {alien.planet}
              </span>
            </div>

            {/* Alien image */}
            <img
              src={alien.image}
              alt={alien.name}
              className="relative z-10 h-[70vh] w-auto object-contain transition-all duration-500"
              style={{
                filter: isHovered
                  ? `drop-shadow(0 0 60px ${alien.color}80) brightness(1.15)`
                  : `drop-shadow(0 0 30px ${alien.color}40)`,
              }}
            />
          </div>
        </div>

        {/* Right — Alien info */}
        <div className="flex flex-col gap-6">
          <span
            ref={titleRef}
            className="font-bebas text-3xl tracking-[0.1em]"
            style={{ color: alien.color }}
          >
            {alien.title.toUpperCase()}
          </span>

          <h2
            ref={nameRef}
            className="font-bebas text-[100px] leading-none text-text-primary tracking-[0.05em]"
            style={{ textShadow: `0 0 30px ${alien.color}40` }}
          >
            {alien.name}
          </h2>

          <div ref={pillsRef} className="flex gap-4 mt-2">
            <div className="px-6 py-2 border border-text-muted/30 rounded-full flex items-center gap-3">
              <span className="font-space text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
                Species
              </span>
              <span className="font-space text-[10px] font-bold tracking-[0.2em] text-text-primary uppercase">
                {alien.species.toUpperCase()}
              </span>
            </div>
            <div className="px-6 py-2 border border-text-muted/30 rounded-full flex items-center gap-3">
              <span className="font-space text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
                Planet
              </span>
              <span className="font-space text-[10px] font-bold tracking-[0.2em] text-text-primary uppercase">
                {alien.planet.toUpperCase()}
              </span>
            </div>
          </div>

          <p
            ref={descRef}
            className="font-space text-lg text-text-secondary leading-relaxed max-w-xl mt-2"
          >
            "{alien.description}"
          </p>

          <div ref={powersRef} className="flex flex-col gap-3 mt-2">
            {alien.powers.map((power, i) => (
              <div key={i} className="power-item flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: alien.color,
                    boxShadow: `0 0 10px ${alien.color}, 0 0 20px ${alien.color}50`,
                  }}
                />
                <span className="font-space text-xs font-bold tracking-[0.2em] text-text-primary uppercase">
                  {power}
                </span>
              </div>
            ))}
          </div>

          <div ref={progressRef} className="mt-8 w-full max-w-md">
            <div className="flex justify-between mb-3">
              <span
                className="font-space text-xs font-bold tracking-[0.2em]"
                style={{ color: alien.color }}
              >
                {paddedIndex} / {paddedTotal}
              </span>
              <span className="font-space text-xs font-bold tracking-[0.2em] text-text-muted uppercase">
                Active Profile
              </span>
            </div>
            <div className="w-full h-[1px] bg-text-muted/20 overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full origin-left"
                style={{
                  backgroundColor: alien.color,
                  boxShadow: `0 0 10px ${alien.color}`,
                  transform: "scaleX(0)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
