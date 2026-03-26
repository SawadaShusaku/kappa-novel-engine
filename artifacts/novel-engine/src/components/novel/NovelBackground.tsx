import { motion, AnimatePresence } from "framer-motion";

interface NovelBackgroundProps {
  bgKey: string | null;
  effectCommand: string | null;
}

const BG_IMAGES: Record<string, string> = {
  mountain_fog: "/assets/bg/mountain_fog.jpg",
  mountain_clearing: "/assets/bg/mountain_clearing.jpg",
  forest_chase: "/assets/bg/forest_chase.jpg",
  dark_hole: "/assets/bg/dark_hole.jpg",
};

export function NovelBackground({ bgKey, effectCommand }: NovelBackgroundProps) {
  const isFog = effectCommand === "fog_loop";
  const isFade = effectCommand === "fade_in";
  const bgSrc = bgKey ? BG_IMAGES[bgKey] : null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgKey || "empty"}
          initial={{ opacity: isFade ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {bgSrc ? (
            <img
              src={bgSrc}
              alt={bgKey || ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-black" />
          )}
        </motion.div>
      </AnimatePresence>

      {isFog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute -inset-[50%] animate-fog bg-gradient-to-t from-transparent via-white/8 to-transparent blur-3xl rounded-[100%]" />
          <div
            className="absolute -inset-[50%] animate-fog bg-gradient-to-r from-transparent via-white/12 to-transparent blur-2xl rounded-[100%]"
            style={{ animationDirection: "reverse", animationDuration: "25s" }}
          />
        </motion.div>
      )}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />
    </div>
  );
}
