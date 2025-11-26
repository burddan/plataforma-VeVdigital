import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Star,
} from "lucide-react";
import instagramIcon from "../imagens/instagram-icon.png";
import instagramStep1 from "../imagens/i1_1.png";
import instagramStep2 from "../imagens/i2_1.png";
import instagramStep3 from "../imagens/i3_1.png";
import instagramStep4 from "../imagens/i4_1.png";
import instagramStep5 from "../imagens/i5_1.png";
import { useScreenAudio } from "../useScreenAudio";

interface Instagram1Props {
  onComplete: () => void;
  onBack: () => void;
}

export function Instagram1({
  onComplete,
  onBack,
}: Instagram1Props) {
  const [currentStep, setCurrentStep] = useState(1);

  // Use o hook useScreenAudio para tocar o áudio correspondente a cada etapa
  const { stopAudio } = useScreenAudio(
    currentStep === 6 ? "licaoconcluida.mp3" : `i1_${currentStep}.mp3`
  );

  const handleNext = () => {
    // Para o áudio atual antes de mudar de etapa
    stopAudio();
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(6); // Tela final
    }
  };

  const handleBack = () => {
    stopAudio();
    onBack();
  };

  const handleFinish = () => {
    stopAudio();
    onComplete();
  };

  // Tela final de parabéns
  if (currentStep === 6) {
    return (
      <div className="size-full flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
        {/* Header */}
        <div className="pt-10 px-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-amber-900 text-2xl">
              Lição Completa!
            </h2>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-6 shadow-2xl">
            <Star
              className="w-16 h-16 text-white"
              fill="white"
            />
          </div>

          <h1 className="text-amber-900 text-4xl mb-4">
            🎉 Parabéns!
          </h1>
          <p className="text-amber-800 text-2xl mb-8 leading-relaxed">
            Você postou sua primeira foto!
          </p>

          <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg mb-8 w-full">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="w-8 h-8 text-white"
                />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-amber-900 text-xl mb-1">
                  Primeira Foto 📸
                </h3>
                <p className="text-amber-700 text-base">
                  Conquistada! ✓
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botão */}
        <div className="p-6 pb-8">
          <Button
            onClick={handleFinish}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            Voltar para o Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="pt-10 px-6 pb-4 border-b-2 border-orange-200">
        <div className="flex items-center justify-between mb-3">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="text-orange-700 hover:bg-orange-100 p-2 h-auto"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            <span className="text-lg">Voltar</span>
          </Button>
          <div className="text-amber-800 text-lg">
            Passo {currentStep} de 5
          </div>
        </div>
        <h2 className="text-amber-900 text-2xl text-center">
          Postando uma Foto no Instagram
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Tela inicial do Instagram */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={instagramStep1} 
                alt="Tela inicial do Instagram" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Este é o Instagram. Aqui você pode ver fotos e também postar as suas!
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Ícone "+ Criar" destacado */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={instagramStep2} 
                alt="Ícone '+ Criar' destacado" 
                className="w-full h-auto"
              />
              {/* Botão interativo laranja - ajuste left/right conforme necessário */}
              <button
                onClick={handleNext}
                className="absolute w-16 h-16 rounded-full bg-orange-500/40 border-3 border-orange-500 hover:scale-110 transition-transform animate-pulse"
                style={{ top: '10%', left: '10%', transform: 'translate(-50%, -50%)' }}
              >
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Para postar uma foto, toque neste botão de Criar. Ele serve para adicionar suas fotos no Instagram.
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Galeria aberta com fotos */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={instagramStep3} 
                alt="Galeria aberta com fotos" 
                className="w-full h-auto"
              />
              {/* Botão interativo laranja - ajuste left/right conforme necessário */}
              <button
                onClick={handleNext}
                className="absolute w-16 h-16 rounded-full bg-orange-500/40 border-3 border-orange-500 hover:scale-110 transition-transform animate-pulse"
                style={{ top: '68%', left: '60%', transform: 'translate(-50%, -50%)' }}
              >
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Escolha a foto que você quer postar. Pode ser uma foto da família, do seu dia ou algo que você goste!
              </p>
            </div>
          </div>
        )}

        {/* Passo 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Tela de legenda habilitada */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={instagramStep4} 
                alt="Tela de legenda habilitada" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Aqui você pode escrever uma legenda simples. Exemplo: "Meu dia hoje 😊".
              </p>
            </div>
          </div>
        )}

        {/* Passo 5 */}
        {currentStep === 5 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Botão "Compartilhar" */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={instagramStep5} 
                alt="Botão 'Compartilhar'" 
                className="w-full h-auto"
              />
              {/* Botão interativo laranja - ajuste left/right conforme necessário */}
              <button
                onClick={handleNext}
                className="absolute w-16 h-16 rounded-full bg-orange-500/40 border-3 border-orange-500 hover:scale-110 transition-transform animate-pulse"
                style={{ top: '96%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Quando terminar, toque em Compartilhar. Sua foto será publicada no Instagram!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo */}
      {(currentStep === 1 || currentStep === 4) && (
        <div className="p-6 pb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
}
