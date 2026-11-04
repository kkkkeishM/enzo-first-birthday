"use client";
import { useEffect, useState } from "react";
import Wipe from "@/components/Wipe";
import Envelope from "@/components/Envelope";
import Cover from "@/components/Cover";
import Invitation from "@/components/Invitation";

type Screen = "envelope" | "cover" | "invite";
type WipePhase = "idle" | "in" | "out";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("envelope");
  const [wipe, setWipe] = useState<WipePhase>("idle");

  useEffect(() => {
    try {
      const u = new URL(window.location.href);
      if (u.searchParams.get("reset") === "1") {
        Object.keys(localStorage)
          .filter((k) => k.startsWith("enzo-"))
          .forEach((k) => localStorage.removeItem(k));
        u.searchParams.delete("reset");
        window.history.replaceState(null, "", u.toString());
      }
    } catch {}
  }, []);
  
  function goTo(next: Screen) {
    if (wipe !== "idle") return; // ignore taps while a transition is running
    setWipe("in");
    setTimeout(() => {
      setScreen(next);
      setWipe("out");
    }, 650);
    setTimeout(() => setWipe("idle"), 1300);
  }

  return (
    <>
      <Wipe phase={wipe} />
      {screen === "envelope" && <Envelope onOpened={() => goTo("cover")} />}
      {screen === "cover" && (
          <Cover
            onEnter={() => goTo("invite")}
            onBack={() => goTo("envelope")}
            onHome={() => goTo("envelope")}
          />
        )}
      {screen === "invite" && (
        <Invitation onBack={() => goTo("cover")} onHome={() => goTo("cover")} />
      )}
    </>
  );
}