
import { useEffect, useRef } from "react";
import gsap from "gsap";
import omnitrix from "../assets/alliens/omnitrix.png";

const SUBTITLE_TEXT = "6 ALIENS. INFINITE POWER.";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const watchInnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleGlowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const hudLeftRef = useRef<HTMLDivElement>(null);
  const hudRightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ==========================================
      // MOUSE FOLLOW
      // ==========================================
      const handleMouseMove = (e: MouseEvent) => {
        if (!watchInnerRef.current) return;
        const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
        gsap.to(watchInnerRef.current, {
          rotateX: -moveY * 2,
          rotateY: moveX * 2,
          x: moveX * 3,
          y: moveY * 3,
          duration: 0.6,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // ==========================================
      // ENTRANCE TIMELINE (one-time, not scrubbed)
      // ==========================================
      const entrance = gsap.timeline({
        onComplete: () => {
          // After entrance completes, setup scroll timeline
          setupScrollTimeline();
        },
      });

      entrance.fromTo(
        scanRef.current,
        { top: "-10%" },
        { top: "110%", duration: 1.2, ease: "power1.inOut" },
      );

      entrance.fromTo(
        watchRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power2.out" },
        0.3,
      );

      entrance.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        0.5,
      );

      entrance.to(
        watchRef.current,
        { scale: 1.06, duration: 0.2, ease: "power2.out" },
        1.1,
      );
      entrance.to(
        watchRef.current,
        { scale: 1, duration: 0.3, ease: "power2.inOut" },
        1.3,
      );

      entrance.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
        1.4,
      );

      entrance.fromTo(
        titleGlowRef.current,
        { opacity: 0, scaleX: 0.3 },
        { opacity: 0.5, scaleX: 1.5, duration: 0.4, ease: "power2.out" },
        1.4,
      );
      entrance.to(
        titleGlowRef.current,
        { opacity: 0.1, scaleX: 1, duration: 0.5, ease: "power2.inOut" },
        1.8,
      );

      const letters = subtitleRef.current?.querySelectorAll(".letter");
      if (letters) {
        entrance.fromTo(
          letters,
          { opacity: 0 },
          { opacity: 1, duration: 0.03, stagger: 0.04, ease: "none" },
          1.7,
        );
      }

      entrance.to(
        cursorRef.current,
        { opacity: 1, duration: 0.1 },
        1.7 + SUBTITLE_TEXT.length * 0.04,
      );

      entrance.fromTo(
        hudLeftRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        1.8,
      );

      entrance.fromTo(
        hudRightRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        1.8,
      );

      entrance.fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        2.2,
      );

      // ==========================================
      // SCROLL TIMELINE (created after entrance)
      // ==========================================
      function setupScrollTimeline() {
        // Clear clipPath so it doesn't interfere with scroll
        gsap.set(watchRef.current, { clearProps: "clipPath" });

        const scroll = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: true,
            onLeave: () => {
              window.dispatchEvent(
                new CustomEvent("particleColor", { detail: "#00ff41" }),
              );
            },
            onEnter: () => {
              window.dispatchEvent(
                new CustomEvent("particleColor", { detail: "#00ff41" }),
              );
            },
            onEnterBack: () => {
              window.dispatchEvent(
                new CustomEvent("particleColor", { detail: "#00ff41" }),
              );
            },
          },
        });

        scroll.to(
          scrollRef.current,
          { opacity: 0, y: 20, duration: 0.1, ease: "none" },
          0,
        );

        scroll.to(
          cursorRef.current,
          { opacity: 0, duration: 0.05, ease: "none" },
          0,
        );

        scroll.to(
          hudLeftRef.current,
          { opacity: 0, x: -30, duration: 0.15, ease: "none" },
          0.05,
        );

        scroll.to(
          hudRightRef.current,
          { opacity: 0, x: 30, duration: 0.15, ease: "none" },
          0.05,
        );

        scroll.to(
          subtitleRef.current,
          { opacity: 0, y: -20, duration: 0.1, ease: "none" },
          0.05,
        );

        scroll.to(
          titleGlowRef.current,
          { opacity: 0, duration: 0.1, ease: "none" },
          0.1,
        );

        scroll.to(
          titleRef.current,
          { opacity: 0, y: -40, duration: 0.15, ease: "none" },
          0.1,
        );

        scroll.to(
          watchRef.current,
          { opacity: 0, y: -100, scale: 0.8, duration: 0.4, ease: "none" },
          0.3,
        );

        scroll.to(
          glowRef.current,
          { opacity: 0, scale: 0.3, duration: 0.3, ease: "none" },
          0.4,
        );
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-void pt-36 pb-12"
      style={{ perspective: "1000px" }}
    >
      <div className="scan-line-sweep fixed left-0 w-full h-[2px] bg-omnitrix/20 shadow-[0_0_10px_rgba(0,255,65,0.5)] z-30 pointer-events-none" />

      <div
        ref={scanRef}
        className="absolute left-0 w-full h-[200px] z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,255,65,0) 40%, rgba(0,255,65,0.4) 50%, rgba(0,255,65,0) 60%, transparent 100%)",
        }}
      />

      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-omnitrix/10 blur-[150px] pointer-events-none opacity-0"
      />

      <div
        ref={watchRef}
        className="relative z-20 float-watch"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div ref={watchInnerRef} style={{ transformStyle: "preserve-3d" }}>
          <img
            src={omnitrix}
            alt="Omnitrix Watch"
            className="w-[380px] h-auto drop-shadow-[0_0_40px_rgba(0,255,65,0.35)]"
          />
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="relative">
          <div
            ref={titleGlowRef}
            className="absolute inset-0 bg-omnitrix/20 blur-[60px] opacity-0 pointer-events-none"
          />
          <h1
            ref={titleRef}
            className="relative font-bebas text-[120px] leading-none text-text-primary tracking-[0.05em] opacity-0"
            style={{ textShadow: "0 0 15px rgba(0, 255, 65, 0.3)" }}
          >
            OMNITRIX
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="font-space text-sm text-text-secondary tracking-[0.4em] uppercase mt-4 flex"
        >
          {SUBTITLE_TEXT.split("").map((char, i) => (
            <span key={i} className="letter opacity-0">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          <span
            ref={cursorRef}
            className="cursor-blink text-omnitrix ml-0.5 opacity-0"
          >
            |
          </span>
        </div>
      </div>

      <div
        ref={hudLeftRef}
        className="absolute left-20 bottom-20 hidden lg:block border-l border-omnitrix/30 pl-4 py-2 opacity-0 z-20"
      >
        <div className="flex flex-col gap-4">
          <div>
            <span className="block font-space text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
              Status
            </span>
            <span className="flex items-center gap-2 font-space text-xs text-omnitrix tracking-wider">
              <span className="relative w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-omnitrix ping-dot" />
                <span className="relative block w-1.5 h-1.5 rounded-full bg-omnitrix" />
              </span>
              ONLINE_CORE_ACTIVE
            </span>
          </div>
          <div>
            <span className="block font-space text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
              Coordinates
            </span>
            <span className="font-space text-xs text-text-secondary tracking-wider">
              34.0522° N, 118.2437° W
            </span>
          </div>
        </div>
      </div>

      <div
        ref={hudRightRef}
        className="absolute right-20 bottom-20 hidden lg:block border-r border-omnitrix/30 pr-4 py-2 text-right opacity-0 z-20"
      >
        <div className="flex flex-col gap-4">
          <div>
            <span className="block font-space text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
              DNA Stream
            </span>
            <span className="font-space text-xs text-omnitrix tracking-wider">
              BUFFERING_98%
            </span>
          </div>
          <div className="flex justify-end gap-1 h-2">
            <div className="w-1 h-full bg-omnitrix" />
            <div className="w-1 h-full bg-omnitrix" />
            <div className="w-1 h-full bg-omnitrix" />
            <div className="w-1 h-full bg-omnitrix opacity-50" />
            <div className="w-1 h-full bg-omnitrix opacity-20" />
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="relative z-20 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-space text-[10px] text-omnitrix tracking-[0.3em] uppercase font-bold">
          Scroll to Scan
        </span>
        <div className="w-4 h-4 border-r-2 border-b-2 border-omnitrix rotate-45 animate-bounce" />
      </div>
    </section>
  );
}
