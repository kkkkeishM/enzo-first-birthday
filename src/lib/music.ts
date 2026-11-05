let audio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function startMusic() {
  if (typeof window === "undefined") return;
  if (!audio) {
    audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.addEventListener("play", notify);
    audio.addEventListener("pause", notify);
  }
  audio.play().catch(() => {});
}

export function toggleMusic() {
  if (!audio) return;
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
}

export const musicPlaying = () => !!audio && !audio.paused;

export function subscribeMusic(cb: () => void) {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export function stopMusic() {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
}