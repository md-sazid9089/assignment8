import React from "react";

export default function Loader() {
  return (
    <img
      src="/assets/logo.png"
      alt="loading"
      aria-label="loading"
      className="animate-spin h-12 w-12 mx-auto block"
    />
  );
}

// Full-screen overlay loader for route transitions
export function OverlayLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <img
        src="/assets/logo.png"
        alt="loading"
        className="animate-spin h-14 w-14"
        aria-label="loading"
      />
    </div>
  );
}
