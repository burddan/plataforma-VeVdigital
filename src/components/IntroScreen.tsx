import { useEffect } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import vovoImage from "../imagens/vovo-intro.png";
import { useScreenAudio } from "../useScreenAudio";

interface IntroScreenProps {
		onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
		const { stopAudio } = useScreenAudio("inicio.mp3"); // <-- agora só coloca o nome do arquivo
		const handleContinue = () => {
				stopAudio();     // para o áudio
				onContinue();    // muda de tela
		};

		return (
				<div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50 overflow-y-auto">
				{/* Área de conteúdo principal */}
				<div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
				{/* Logo/Ícone */}
				<div className="mb-6 flex items-center justify-center">
				<div className="bg-linear-to-br from-orange-400 to-amber-500 rounded-full p-5 shadow-lg">
				<Heart className="w-12 h-12 text-white fill-white" />
				</div>
				</div>

				{/* Título */}
				<h1 className="text-center mb-4 bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent text-4xl font-bold">
				Vovó&Vovô Digital
				</h1>

				{/* Imagem ilustrativa */}
				<div className="w-full max-w-[180px] mb-5 flex justify-center">
				<img
				src={vovoImage}
				alt="Vovó com celular"
				className="w-full h-auto object-contain"
				/>
				</div>

				{/* Descrição */}
				<div className="text-center max-w-xs space-y-3">
				<p className="text-amber-900 ">
				Uma plataforma amigável e educativa, criada para guiar com paciência e carinho os idosos no mundo digital.
						</p>
				</div>

				{/* Características */}
				<div className="mt-6 flex gap-3 flex-wrap justify-center max-w-xs">
				<div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-orange-200">
				<span className="text-orange-700 text-sm">✨ Fácil de usar</span>
				</div>
				<div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-orange-200">
				<span className="text-orange-700 text-sm">🎯 Para ensinar</span>
				</div>
				</div>
				</div>

				{/* Botão fixo na parte inferior */}
				<div className="p-6 pb-8">
				<Button
				onClick={onStart}
				className="w-full text-lg bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg h-14 rounded-xl"
				>
				Clique para começar
				</Button>
				</div>
				</div>
		);
}

