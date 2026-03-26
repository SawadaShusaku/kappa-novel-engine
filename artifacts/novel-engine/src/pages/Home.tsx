import { Link } from "wouter";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden relative">
      <div className="film-grain" />
      
      {/* Atmospheric Background Element */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(20,83,45,0.15)_0%,rgba(0,0,0,1)_100%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-[0.2em] text-white/90 mb-4 drop-shadow-2xl">
          河童
        </h1>
        <p className="text-xl md:text-2xl font-serif text-primary/80 tracking-widest mb-16">
          芥川龍之介
        </p>

        <div className="flex flex-col gap-6">
          <Link href="/chapter" className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-primary/50 text-white font-serif tracking-widest rounded transition-all duration-500 overflow-hidden flex items-center justify-center gap-3">
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <BookOpen className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors z-10" />
            <span className="z-10 relative">物語を始める</span>
          </Link>
        </div>
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent z-0 hidden md:block" />
      <div className="absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent z-0 hidden md:block" />
    </div>
  );
}
