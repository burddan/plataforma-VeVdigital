import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import youtubeIcon from "../imagens/youtube-icon.png";
import youtubeStep1 from "../imagens/youtube-licao3-passo1.png";
import youtubeStep2 from "../imagens/youtube-licao3-passo2.png";
import youtubeStep4 from "../imagens/youtube-licao3-passo4.png";
// Passo 3 não tem imagem ainda
import { useScreenAudio } from "../useScreenAudio";

interface YouTubeLesson3ScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function YouTubeLesson3Screen({
  onComplete,
  onBack,
}: YouTubeLesson3ScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Use o hook useScreenAudio para tocar o áudio correspondente a cada etapa
  const { stopAudio } = useScreenAudio(currentStep === 5 ? "licaoconcluida.mp3" : `yt1_${currentStep}.mp3`);

  // Para a tela final (passo 5), não toca áudio
  useEffect(() => {
    if (currentStep === 5) {
    }
  }, [currentStep, stopAudio]);

  const handleNext = () => {
    // Para o áudio atual antes de mudar de etapa
    stopAudio();
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(5); // Tela final
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
  if (currentStep === 5) {
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
            <MessageCircle
              className="w-16 h-16 text-white"
              fill="white"
            />
          </div>

          <h1 className="text-amber-900 text-4xl mb-4">
            🎉 Parabéns!
          </h1>
          <p className="text-amber-800 text-2xl mb-8 leading-relaxed">
            Você comentou seu primeiro vídeo no YouTube!
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
                  Falador do YouTube 💬
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
            Passo {currentStep} de 4
          </div>
        </div>
        <h2 className="text-amber-900 text-2xl text-center">
          Comentando e lendo comentários
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Página do vídeo com área de comentários */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep1} 
                alt="Página do vídeo com área de comentários" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '85%', left: '50%', transform: 'translateX(-50%)' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Para ver os comentários, deslize a tela para baixo. Lá você encontra o que outras pessoas falaram sobre o vídeo.
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Lista de comentários */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden">
              <img 
                src={youtubeStep2} 
                alt="Lista de comentários" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Aqui estão os comentários! Você pode ler, curtir e até responder algum se quiser.
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Campo "Adicionar um comentário" */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep2} 
                alt="Campo Adicionar um comentário" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '92%', left: '50%', transform: 'translateX(-50%)' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Quer escrever o seu? Toque neste espaço aqui onde está escrito Adicionar um comentário….
              </p>
            </div>
          </div>
        )}

        {/* Passo 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Teclado e comentário sendo digitado */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep4} 
                alt="Teclado e comentário sendo digitado" 
                className="w-full h-auto"
              />
              {/* Botão de destaque laranja - CLICÁVEL */}
              <button 
                onClick={handleNext}
                className="absolute cursor-pointer hover:scale-110 transition-transform" 
                style={{ top: '30%', right: '0%' }}
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/40 border-3 border-orange-500 animate-pulse"></div>
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Digite aqui o seu comentário —, por exemplo, 'Gostei muito!'. Quando terminar, toque no botão de enviar para publicar sua mensagem.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo - só aparece no passo 2 */}
      {currentStep === 2 && (
        <div className="p-6 pb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  );
}
