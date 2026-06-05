import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#071106] to-transparent px-16 pt-10 pb-8"
    >
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        <span className="font-bebas text-4xl text-omnitrix tracking-widest cursor-pointer transition-transform active:scale-95">
          OMNITRIX
        </span>

        <a
          href="#"
          className="font-bebas text-2xl text-omnitrix tracking-[0.08em] border-b-2 border-omnitrix pb-1 hover:text-[#00ff70] transition-colors duration-300"
        >
          ARCHIVE
        </a>

        <div className="w-[140px]" />
      </div>
    </motion.nav>
  );
}
