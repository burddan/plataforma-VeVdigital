import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Star,
  ImageIcon,
} from "lucide-react";
import youtubeIcon from "../imagens/youtube-icon.png";
import youtubeStep1 from "../imagens/youtube-licao2-passo1.png";
import youtubeStep2 from "../imagens/youtube-licao2-passo2.png";
import youtubeStep3 from "../imagens/youtube-licao2-passo3.png";
import youtubeStep4 from "../imagens/youtube-licao2-passo4.png";
import youtubeStep5 from "../imagens/youtube-licao2-passo5.png";
import youtubeStep6 from "../imagens/youtube-licao2-passo6.png";
import { useScreenAudio } from "../useScreenAudio";

interface YouTubeLesson2ScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function YouTubeLesson2Screen({
  onComplete,
  onBack,
}: YouTubeLesson2ScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Use o hook useScreenAudio para tocar o áudio correspondente a cada etapa
  const { stopAudio } = useScreenAudio(currentStep === 7 ? "licaoconcluida.mp3" : `yt1_${currentStep}.mp3`);

  // Para a tela final (passo 7), não toca áudio
  useEffect(() => {
    if (currentStep === 7) {
    }
  }, [currentStep, stopAudio]);

  const handleNext = () => {
    // Para o áudio atual antes de mudar de etapa
    stopAudio();
    
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(7); // Tela final
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
  if (currentStep === 7) {
    return (
      <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50">
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
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-6 shadow-2xl">
            <Star
              className="w-16 h-16 text-white"
              fill="white"
            />
          </div>

          <h1 className="text-amber-900 text-4xl mb-4">
            🎉 Parabéns!
          </h1>
          <p className="text-amber-800 text-2xl mb-8 leading-relaxed">
            Você aprendeu a apoiar um canal e receber novos vídeos!
          </p>

          <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg mb-8 w-full">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={youtubeIcon}
                  alt="YouTube"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-amber-900 text-xl mb-1">
                  Fã Oficial do Canal 🔔👍
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
            className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            Voltar para o Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50">
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
            Passo {currentStep} de 6
          </div>
        </div>
        <h2 className="text-amber-900 text-2xl text-center">
          Curtir e Receber Novos Vídeos
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Página do vídeo com botões */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep1} 
                alt="Página do vídeo com botões de interação" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja no like - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '85%', left: '4%' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Quando você gosta de um vídeo, toque no botão gostei (👍). Isso mostra que você curtiu e ajuda o canal a saber que você gostou.
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Botão gostei preenchido */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden">
              <img 
                src={youtubeStep2} 
                alt="Botão gostei marcado" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Ótimo! Você tocou no botão gostei e ele ficou marcado. Isso quer dizer que o vídeo recebeu o seu like!
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Botão Inscrever-se destacado */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep3} 
                alt="Botão Inscrever-se" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja no Inscrever-se - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '3%', left: '80%' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Se você gosta muito desse canal, toque em Inscrever-se. Assim fica mais fácil encontrar os vídeos dele depois.
              </p>
            </div>
          </div>
        )}

        {/* Passo 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Sininho destacado */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep4} 
                alt="Sininho de notificações" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja no sininho - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '3%', left: '84%' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Depois de se inscrever, toque no sininho para escolher se quer receber todos os avisos.
              </p>
            </div>
          </div>
        )}

        {/* Passo 5 */}
        {currentStep === 5 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Opções do sininho com "Todas" destacado */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep5} 
                alt="Opções de notificação" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja na opção "Todas" - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '58%', left: '23%', transform: 'translateX(-50%)' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Para receber todos os avisos desse canal, toque na opção Todas. Assim você nunca perde nenhum vídeo novo!
              </p>
            </div>
          </div>
        )}

        {/* Passo 6 */}
        {currentStep === 6 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Confirmação de inscrição e sininho ativo */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden">
              <img 
                src={youtubeStep6} 
                alt="Tudo configurado" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Prontinho — agora você curte os vídeos que gostou e recebe avisos quando o canal publicar algo novo. Fácil, né?
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo - apenas nos passos sem botão laranja */}
      {(currentStep !== 1 && currentStep !== 3 && currentStep !== 4 && currentStep !== 5) && (
        <div className="p-6 pb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            {currentStep < 6 ? "Próximo" : "Finalizar"}
          </Button>
        </div>
      )}
    </div>
  );
}
