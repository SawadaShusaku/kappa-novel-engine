import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Triangle } from "lucide-react";

interface DialogBoxProps {
  speakerName: string | null;
  text: string;
  isComplete: boolean;
  effectCommand: string | null;
}

export function DialogBox({ speakerName, text, isComplete, effectCommand }: DialogBoxProps) {
  const isEnterSprite = effectCommand === "enter_sprite";

  return (
    <motion.div 
      initial={isEnterSprite ? { y: 50, opacity: 0 } : false}
      animate={isEnterSprite ? { y: 0, opacity: 1 } : false}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="absolute bottom-8 sm:bottom-12 inset-x-4 sm:inset-x-12 lg:inset-x-24 xl:inset-x-48 z-20"
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Speaker Name Badge */}
        {speakerName && (
          <div className="absolute -top-10 left-4 sm:left-8 z-30">
            <div className="bg-black/80 backdrop-blur-md border border-white/20 px-6 py-2 rounded-t-lg border-b-0 shadow-lg shadow-black/50">
              <span className="font-serif text-primary text-lg sm:text-xl font-medium tracking-wider">
                {speakerName}
              </span>
            </div>
          </div>
        )}

        {/* Main Text Area */}
        <div className={cn(
          "bg-black/60 backdrop-blur-xl border border-white/15 rounded-lg sm:rounded-2xl p-6 sm:p-8 md:p-10",
          "shadow-2xl shadow-black/50 min-h-[160px] sm:min-h-[180px] relative transition-all duration-300",
          speakerName ? "rounded-tl-none sm:rounded-tl-none" : ""
        )}>
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/50 opacity-50 rounded-tl-sm m-3" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/50 opacity-50 rounded-br-sm m-3" />

          <p className="font-serif text-lg sm:text-xl md:text-2xl leading-loose tracking-[0.05em] text-foreground text-shadow-sm whitespace-pre-wrap">
            {text}
          </p>

          {/* Waiting Indicator */}
          {isComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-4 right-6 sm:bottom-6 sm:right-8 text-primary/80"
            >
              <Triangle className="w-4 h-4 rotate-180 fill-current" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
