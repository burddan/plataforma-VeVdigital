import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { Camera, Image, User } from "lucide-react";

interface AvatarScreenProps {
  onContinue: (avatarUrl: string) => void;
  onGoToFaceRecognition: () => void;
  userName: string;
}

export function AvatarScreen({ onContinue, onGoToFaceRecognition, userName }: AvatarScreenProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCamera = () => {
    // Navega para a tela de reconhecimento facial
    onGoToFaceRecognition();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setSelectedAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGallery = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (selectedAvatar) {
      onContinue(selectedAvatar);
    }
  };

  return (
    <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50 overflow-y-auto">
      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        
        {/* Título */}
        <h1 className="text-center mb-3 text-amber-900 text-4xl font-bold">
          Escolha sua foto
        </h1>

        {/* Texto explicativo */}
        <p className="text-center mb-8 text-amber-800 text-lg max-w-xs">
          Como deseja adicionar sua foto?
        </p>

        {/* Preview do avatar */}
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full bg-white border-4 border-orange-300 shadow-lg flex items-center justify-center overflow-hidden">
            {selectedAvatar ? (
              <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-orange-300" strokeWidth={2} />
            )}
          </div>
        </div>

        {/* Botões de escolha grandes */}
        <div className="w-full max-w-sm space-y-4">
          {/* Botão Tirar Selfie */}
          <button
            onClick={handleCamera}
            className="w-full h-24 bg-white border-4 border-orange-300 hover:border-orange-400 rounded-2xl shadow-md flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95"
          >
            <div className="bg-linear-to-br from-orange-400 to-amber-500 rounded-full p-3">
              <Camera className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <span className="text-amber-900 text-2xl font-bold">Tirar Selfie</span>
          </button>

          {/* Botão Escolher Imagem */}
          <button
            onClick={handleGallery}
            className="w-full h-24 bg-white border-4 border-orange-300 hover:border-orange-400 rounded-2xl shadow-md flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95"
          >
            <div className="bg-linear-to-br from-orange-400 to-amber-500 rounded-full p-3">
              <Image className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <span className="text-amber-900 text-2xl font-bold">Escolher Imagem</span>
          </button>

          {/* Input escondido para seleção de arquivo */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Mensagem de incentivo */}
        {selectedAvatar && (
          <div className="mt-6 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-orange-200">
            <p className="text-orange-700 text-lg text-center">
              ✨ Perfeito, {userName}!
            </p>
          </div>
        )}
      </div>

      {/* Botão fixo na parte inferior */}
      <div className="p-6 pb-8">
        <Button
          onClick={handleSubmit}
          disabled={!selectedAvatar}
          className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg h-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
