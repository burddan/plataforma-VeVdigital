import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { Smile } from "lucide-react";
import { useScreenAudio } from "../useScreenAudio";

interface RegisterScreenProps {
		onContinue: (name: string) => void;
}

export function RegisterScreen({ onContinue }: RegisterScreenProps) {
		const { stopAudio } = useScreenAudio("nome.mp3"); // <-- agora só coloca o nome do arquivo
		const handleContinue = () => {
				stopAudio();     // para o áudio
				onContinue();    // muda de tela
		};

		const [name, setName] = useState("");
		const inputRef = useRef<HTMLInputElement>(null);

		const handleSubmit = () => {
				if (name.trim()) {
						onContinue(name.trim());
				}
		};

		const focusInput = () => {
				inputRef.current?.focus();
		};

		return (
				<div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50 overflow-y-auto">
				{/* Área de conteúdo principal */}
				<div className="flex-1 flex flex-col items-center justify-center px-8 py-12">

				{/* Ícone amigável */}
				<div className="mb-8 flex items-center justify-center">
				<div className="bg-linear-to-br from-orange-400 to-amber-500 rounded-full p-5 shadow-lg">
				<Smile className="w-14 h-14 text-white" strokeWidth={2} />
				</div>
				</div>

				{/* Título clicável */}
				<h1 
				onClick={focusInput}
				className="text-center mb-4 text-amber-900 text-4xl font-bold cursor-text"
				>
				Qual seu nome?
				</h1>

				{/* Texto explicativo simples */}
				<p className="text-center mb-10 text-amber-800 text-lg max-w-xs">
				Vamos começar! Digite seu nome abaixo
				</p>

				{/* Campo de entrada grande e simples */}
				<div className="w-full max-w-sm">
				<input
				ref={inputRef}
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Toque aqui para digitar"
				className="w-full h-20 px-6 text-center text-2xl bg-white border-4 border-orange-300 focus:border-orange-500 focus:outline-none rounded-2xl text-amber-900 placeholder:text-amber-400 shadow-md"
				autoFocus
				/>
				</div>

				{/* Mensagem de incentivo */}
				<div className="mt-8 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-orange-200">
				<p className="text-orange-700 text-sm text-xl text-center">
				✨ É simples e rápido!
				</p>
				</div>
				</div>

				{/* Botão fixo na parte inferior */}
				<div className="p-6 pb-8">
				<Button
				onClick={handleSubmit}
				disabled={!name.trim()}
				className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg h-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xl"
				>
				Continuar
				</Button>
				</div>
				</div>
		);
}
