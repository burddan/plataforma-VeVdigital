import { useEffect, useRef } from "react";

export function useScreenAudio(filename?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!filename) return;

    const audio = new Audio(filename);
    audioRef.current = audio;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [filename]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { stopAudio };
}

