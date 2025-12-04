"use client";

import React, { useState, useEffect, useRef } from "react";

const IMAGES = [
  "/kiel1.png",
  "/kiel2.png",
  "/kiel3.png",
  "/kiel4.png",
];

export default function MissionAlbum() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function open(i: number) {
    setIndex(i);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function prev() {
    setIndex((s) => (s - 1 + IMAGES.length) % IMAGES.length);
  }

  function next() {
    setIndex((s) => (s + 1) % IMAGES.length);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function toggleVisible() {
    setVisible((v) => {
      const next = !v;
      if (next) setTimeout(() => containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 60);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">My Mission Days</h3>
        <button onClick={toggleVisible} className="px-3 py-2 bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 rounded">
          {visible ? "Hide Photos" : "Show Photos"}
        </button>
      </div>

      {visible && (
        <div ref={containerRef} className="overflow-x-auto -mx-2 px-2">
          <div className="flex gap-4 w-max">
            {IMAGES.map((p, i) => (
              <button
                key={p}
                onClick={() => open(i)}
                className="min-w-[200px] w-56 bg-white dark:bg-slate-800 rounded overflow-hidden shadow-sm hover:shadow-md transition flex-shrink-0"
              >
                <div className="w-full h-44 flex items-center justify-center bg-white dark:bg-slate-800">
                  <img src={encodeURI(p)} alt={p} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="p-2 text-sm text-slate-700 dark:text-slate-200 truncate">Mission Day {i + 1}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-4xl max-h-[90vh] w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700 p-2 rounded-full"
              aria-label="Previous"
            >
              ‹
            </button>

            <img src={encodeURI(IMAGES[index])} alt={`Mission ${index + 1}`} className="w-auto max-w-full max-h-[85vh] mx-auto rounded shadow-lg object-contain" />

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700 p-2 rounded-full"
              aria-label="Next"
            >
              ›
            </button>

            <div className="mt-3 text-center text-sm text-white">Mission Day {index + 1} of {IMAGES.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
