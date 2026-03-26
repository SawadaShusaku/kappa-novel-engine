import { motion, AnimatePresence } from "framer-motion";

interface CharacterSpriteProps {
  charId: string | null;
  expression: string | null;
  effectCommand: string | null;
}

const SPRITE_MAP: Record<string, Record<string, string>> = {
  char_bag: {
    neutral: "/assets/char/bag_neutral.png",
    surprised: "/assets/char/bag_surprised.png",
    mischievous: "/assets/char/bag_mischievous.png",
  },
  char_player: {
    neutral: "/assets/char/player_neutral.png",
    scared: "/assets/char/player_scared.png",
  },
};

function getSpriteUrl(charId: string | null, expression: string | null): string | null {
  if (!charId) return null;
  const expMap = SPRITE_MAP[charId];
  if (!expMap) return null;
  const expr = expression || "neutral";
  return expMap[expr] || expMap["neutral"] || null;
}

export function CharacterSprite({ charId, expression, effectCommand }: CharacterSpriteProps) {
  const spriteUrl = getSpriteUrl(charId, expression);
  const isEnterSprite = effectCommand === "enter_sprite";

  return (
    <AnimatePresence mode="popLayout">
      {spriteUrl ? (
        <motion.div
          key={`${charId}-${expression}`}
          initial={isEnterSprite
            ? { opacity: 0, x: 60, scale: 0.92 }
            : { opacity: 0 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex items-end justify-center pointer-events-none"
          style={{ height: "80%", maxWidth: "340px", width: "100%" }}
        >
          <img
            src={spriteUrl}
            alt={`${charId} ${expression}`}
            className="h-full w-auto object-contain drop-shadow-[0_0_24px_rgba(0,0,0,0.8)]"
            style={{ maxHeight: "100%" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
