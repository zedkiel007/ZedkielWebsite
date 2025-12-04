"use client";

import React, { useState, useEffect, useRef } from "react";

export default function CertificateUpload() {
  const publicCert = {
    name: "Zedkiel N. Estrella NCII.png",
    path: "/Zedkiel N. Estrella NCII.png",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function openLightbox(p: string) {
    setSrc(p);
    setIsOpen(true);
  }

  function closeLightbox() {
    setIsOpen(false);
    setSrc(null);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  function toggleVisible() {
    setVisible((v) => {
      const next = !v;
      if (next) {
        setTimeout(() => containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      }
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">My Certificates</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleVisible}
          className="px-3 py-2 bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900 rounded"
        >
          {visible ? 'Hide Photos' : 'Show Photos'}
        </button>
        <span className="text-sm text-slate-500 dark:text-slate-400">Click to reveal album photos</span>
      </div>

      {visible && (
        <div ref={containerRef} className="overflow-x-auto -mx-2 px-2">
          <div className="flex gap-4 w-max">
            <button
              onClick={() => openLightbox(publicCert.path)}
              className="min-w-[220px] w-56 bg-white dark:bg-slate-800 rounded overflow-hidden shadow-sm hover:shadow-md transition text-left flex-shrink-0"
            >
              <div className="w-full h-48 flex items-center justify-center bg-white dark:bg-slate-800">
                <img
                  src={encodeURI(publicCert.path)}
                  alt={publicCert.name}
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                />
              </div>
              <div className="p-2 text-sm text-slate-700 dark:text-slate-200 truncate">{publicCert.name}</div>
            </button>
          </div>
        </div>
      )}

      {isOpen && src && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
            <div className="max-w-4xl max-h-[90vh] w-full mx-4 overflow-auto" onClick={(e) => e.stopPropagation()}>
              <img
                src={encodeURI(src)}
                alt="certificate preview"
                className="w-auto max-w-full max-h-[85vh] mx-auto rounded shadow-lg object-contain"
              />
            <div className="mt-2 text-right">
              <button
                onClick={closeLightbox}
                className="px-3 py-1 bg-white/90 dark:bg-slate-700 text-sm rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
