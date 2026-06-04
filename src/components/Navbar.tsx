import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-16 py-6 backdrop-blur-sm bg-void/30 "
    >
      <h1 className="font-bebas text-3xl text-omnitrix tracking-[0.15em]">
        OMNITRIX
      </h1>

      {/* center archive label */}

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="font-space text-sm text-text-primary uppercase tracking-[0.2em] font-medium">
          Archive
        </span>
        <div className="w-8 h-[2px] bg-omnitrix" />
      </div>
      <div className="w-[120px]" />
    </motion.div>
  );
}
