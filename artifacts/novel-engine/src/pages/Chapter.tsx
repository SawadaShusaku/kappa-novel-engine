import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, ChevronRight } from "lucide-react";
import { useGetChapterLines } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import { useTypewriter } from "@/hooks/use-typewriter";
import { NovelBackground } from "@/components/novel/NovelBackground";
import { DialogBox } from "@/components/novel/DialogBox";
import { CharacterSprite } from "@/components/novel/CharacterSprite";

export default function Chapter() {
  const [_, setLocation] = useLocation();
  const chapterNumber = 1;
  const { data: lines, isLoading, isError } = useGetChapterLines(chapterNumber);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [flashTrigger, setFlashTrigger] = useState(0);

  const currentLine =
    lines && currentIndex >= 0 && currentIndex < lines.length
      ? lines[currentIndex]
      : null;

  const isFinished = lines && currentIndex >= lines.length;

  const { displayedText, isComplete, skipTypewriter } = useTypewriter(
    currentLine?.bodyText || null,
    45,
  );

  const handleAdvance = () => {
    if (currentIndex === -1) {
      setCurrentIndex(0);
      return;
    }
    if (isFinished) return;
    if (!isComplete) {
      skipTypewriter();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleAdvance();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isComplete, currentIndex, isFinished]);

  useEffect(() => {
    if (currentLine?.effectCommand === "flash") {
      setFlashTrigger((prev) => prev + 1);
    }
  }, [currentLine?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-serif">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-xl tracking-widest"
        >
          読み込み中...
        </motion.div>
      </div>
    );
  }

  if (isError || !lines) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-serif p-6 text-center">
        <p className="text-xl text-red-400 mb-6">物語の読み込みに失敗しました。</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 border border-white/20 hover:bg-white/10 transition-colors"
        >
          再試行
        </button>
      </div>
    );
  }

  const isShake = currentLine?.effectCommand === "shake";

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden select-none cursor-pointer"
      onClick={handleAdvance}
    >
      <div className="film-grain" />

      <div className={cn("relative w-full h-full", isShake && "animate-shake")}>

        {/* Background */}
        {currentIndex >= 0 && !isFinished && (
          <NovelBackground
            bgKey={currentLine?.bgKey || null}
            effectCommand={currentLine?.effectCommand || null}
          />
        )}

        {/* Character Sprite */}
        {currentIndex >= 0 && !isFinished && (
          <CharacterSprite
            charId={currentLine?.charId || null}
            expression={currentLine?.expression || null}
            effectCommand={currentLine?.effectCommand || null}
          />
        )}

        {/* Flash Effect */}
        <AnimatePresence>
          {flashTrigger > 0 && (
            <motion.div
              key={flashTrigger}
              initial={{ opacity: 1, backgroundColor: "#fff" }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-40 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Chapter title screen */}
        <AnimatePresence>
          {currentIndex === -1 && (
            <motion.div
              exit={{ opacity: 0, transition: { duration: 1.5 } }}
              className="absolute inset-0 z-30 flex items-center justify-center bg-black"
            >
              <div className="flex flex-col items-center gap-12">
                <h1 className="writing-vertical text-5xl md:text-7xl font-serif tracking-[0.5em] text-white/90">
                  第一章
                </h1>
                <p className="font-serif text-white/40 tracking-widest animate-pulse mt-12">
                  クリックして開始
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialog UI */}
        <AnimatePresence>
          {currentIndex >= 0 && !isFinished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DialogBox
                speakerName={currentLine?.speakerName || null}
                text={displayedText}
                isComplete={isComplete}
                effectCommand={currentLine?.effectCommand || null}
              />

              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 font-serif text-white/40 text-sm tracking-widest">
                {currentIndex + 1} / {lines.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End of chapter */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-white/80 tracking-widest mb-12">
                第一章 完
              </h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation("/");
                }}
                className="font-serif text-primary border-b border-primary/30 pb-1 hover:text-white hover:border-white transition-colors"
              >
                目次へ戻る
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Top controls */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex justify-between z-50 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLocation("/");
          }}
          className="pointer-events-auto p-2 rounded-full bg-black/20 hover:bg-black/60 text-white/60 hover:text-white backdrop-blur-sm border border-white/5 transition-all"
          title="タイトルへ戻る"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {currentIndex >= 0 && !isFinished && (
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdvance();
              }}
              className="pointer-events-auto p-2 rounded-full bg-black/20 hover:bg-black/60 text-white/60 hover:text-white backdrop-blur-sm border border-white/5 transition-all"
              title="進む"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(-1);
              }}
              className="pointer-events-auto p-2 rounded-full bg-black/20 hover:bg-black/60 text-white/60 hover:text-white backdrop-blur-sm border border-white/5 transition-all"
              title="最初から"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
