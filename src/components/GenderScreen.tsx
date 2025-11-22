import { Button } from "./ui/button";
import { useState } from "react";
import { User, UserCheck } from "lucide-react";

interface GenderScreenProps {
  onContinue: (gender: 'masculino' | 'feminino') => void;
  userName: string;
}

export function GenderScreen({ onContinue, userName }: GenderScreenProps) {
  const [selectedGender, setSelectedGender] = useState<'masculino' | 'feminino' | null>(null);

  const handleSubmit = () => {
    if (selectedGender) {
      onContinue(selectedGender);
    }
  };

  return (
    <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50 overflow-y-auto">
      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        
        {/* Título */}
        <h1 className="text-center mb-3 text-amber-900 text-4xl">
          Olá, {userName}!
        </h1>

        {/* Texto explicativo */}
        <p className="text-center mb-12 text-amber-800 text-xl max-w-xs">
          Qual é o seu sexo?
        </p>

        {/* Botões de escolha grandes */}
        <div className="w-full max-w-sm space-y-6">
          {/* Botão Masculino */}
          <button
            onClick={() => setSelectedGender('masculino')}
            className={`relative w-full h-32 rounded-3xl shadow-xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 ${
              selectedGender === 'masculino'
                ? 'bg-linear-to-br from-blue-500 to-blue-600 border-4 border-blue-700 shadow-2xl'
                : 'bg-white border-4 border-orange-300 hover:border-orange-400'
            }`}
          >
            <div className={`rounded-full p-4 ${
              selectedGender === 'masculino'
                ? 'bg-white/20'
                : 'bg-linear-to-br from-blue-400 to-blue-500'
            }`}>
              <User className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            <span className={`text-3xl ${
              selectedGender === 'masculino' ? 'text-white' : 'text-amber-900'
            }`}>
              Masculino
            </span>
            {selectedGender === 'masculino' && (
              <UserCheck className="w-8 h-8 text-white absolute top-4 right-4" strokeWidth={3} />
            )}
          </button>

          {/* Botão Feminino */}
          <button
            onClick={() => setSelectedGender('feminino')}
            className={`relative w-full h-32 rounded-3xl shadow-xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 ${
              selectedGender === 'feminino'
                ? 'bg-linear-to-br from-pink-500 to-pink-600 border-4 border-pink-700 shadow-2xl'
                : 'bg-white border-4 border-orange-300 hover:border-orange-400'
            }`}
          >
            <div className={`rounded-full p-4 ${
              selectedGender === 'feminino'
                ? 'bg-white/20'
                : 'bg-linear-to-br from-pink-400 to-pink-500'
            }`}>
              <User className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            <span className={`text-3xl ${
              selectedGender === 'feminino' ? 'text-white' : 'text-amber-900'
            }`}>
              Feminino
            </span>
            {selectedGender === 'feminino' && (
              <UserCheck className="w-8 h-8 text-white absolute top-4 right-4" strokeWidth={3} />
            )}
          </button>
        </div>

        {/* Mensagem de incentivo */}
        {selectedGender && (
          <div className="mt-8 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-orange-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-orange-700 text-lg text-center">
              ✨ Ótimo!
            </p>
          </div>
        )}
      </div>

      {/* Botão fixo na parte inferior */}
      <div className="p-6 pb-8">
        <Button
          onClick={handleSubmit}
          disabled={!selectedGender}
          className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg h-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
