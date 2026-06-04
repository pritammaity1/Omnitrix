import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // sync lenis scroll position with gsap scrolltrigger
    lenis.on("scroll", ScrollTrigger.update);

    // connect lenis to gsap's ticker so they run on sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 100);
    });

    // prevent gsap from using its own requestAnimationFrame since lenis is driving the loop

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}
