"use client";
import { useSyncExternalStore } from "react";
import { musicPlaying, subscribeMusic, toggleMusic } from "@/lib/music";

export default function MusicButton() {
  const on = useSyncExternalStore(subscribeMusic, musicPlaying, () => false);
  return (
    <button
      type="button"
      className="music-btn"
      onClick={toggleMusic}
      aria-label={on ? "Mute music" : "Play music"}
      aria-pressed={on}
    >
      {on ? "🔊" : "🔇"}
    </button>
  );
}