import { useEffect, useRef } from "react";

export function useScreenAudio(filename?: string) {
		const audioRef = useRef<HTMLAudioElement | null>(null);

		useEffect(() => {
				if (!filename) return;

				const audio = new Audio(filename);
				audioRef.current = audio;

				// Configurações para melhor experiência mobile
				audio.preload = "auto";
				audio.volume = 1.0;

				const playAudio = async () => {
						try {
								await audio.play();
						} catch (error) {
								console.log("Autoplay bloqueado, aguardando interação do usuário");
						}
				};

				playAudio();

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

		const playAudio = () => {
				if (audioRef.current) {
						audioRef.current.play();
				}
		};

		return { stopAudio, playAudio };
}
