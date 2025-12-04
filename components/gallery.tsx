"use client";

import React, { useState, useEffect, useRef } from "react";

type Props = {
  title: string;
  images: string[]; // paths relative to public/
};

export default function Gallery({ title, images }: Props) {
  const [visible, setVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  function open(i: number) {
    setIndex(i);
    setLightboxOpen(true);
  }

  function close() {
    setLightboxOpen(false);
  }

  function prev() {
    setIndex((s) => (s - 1 + images.length) % images.length);
  }

  function next() {
    setIndex((s) => (s + 1) % images.length);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightboxOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length]);

  function toggleVisible() {
    setVisible((v) => {
      const next = !v;
      if (next) setTimeout(() => containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      return next;
    });
  }

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <button onClick={toggleVisible} className="px-3 py-2 bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 rounded">
          {visible ? "Hide Photos" : "Show Photos"}
        </button>
      </div>

      {visible && (
        <div ref={containerRef} className="overflow-x-auto -mx-2 px-2">
          <div className="flex gap-4 w-max">
            {images.map((p, i) => (
              <button
                key={p + i}
                onClick={() => open(i)}
                className="min-w-[200px] w-56 bg-white dark:bg-slate-800 rounded overflow-hidden shadow-sm hover:shadow-md transition flex-shrink-0"
              >
                <div className="w-full h-44 flex items-center justify-center bg-white dark:bg-slate-800">
                  <img src={encodeURI(p)} alt={p} className="max-w-full max-h-full object-contain" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={close} role="dialog" aria-modal="true">
          <div className="max-w-4xl max-h-[90vh] w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700 p-2 rounded-full" aria-label="Previous">‹</button>

            <img src={encodeURI(images[index])} alt={`Image ${index + 1}`} className="w-auto max-w-full max-h-[85vh] mx-auto rounded shadow-lg object-contain" />

            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700 p-2 rounded-full" aria-label="Next">›</button>

            <div className="mt-3 text-center text-sm text-white">{index + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
