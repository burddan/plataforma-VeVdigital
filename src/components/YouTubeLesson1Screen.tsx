import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Star,
  ImageIcon,
  Search,
} from "lucide-react";
import youtubeIcon from "../imagens/youtube-icon.png";
import youtubeStep1 from "../imagens/youtube-licao1-passo1.png";
import youtubeStep2 from "../imagens/youtube-licao1-passo2.png";
import youtubeStep3 from "../imagens/youtube-licao1-passo3.png";
import youtubeStep4 from "../imagens/youtube-licao1-passo4.png";
import youtubeStep5 from "../imagens/youtube-licao1-passo5.png";
import { useScreenAudio } from "../useScreenAudio";

interface YouTubeLesson1ScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function YouTubeLesson1Screen({
  onComplete,
  onBack,
}: YouTubeLesson1ScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Use o hook useScreenAudio para tocar o áudio correspondente a cada etapa
  const { stopAudio } = useScreenAudio(currentStep === 6 ? "licaoconcluida.mp3" : `yt1_${currentStep}.mp3`);

  // Para a tela final (passo 6), não toca áudio
  useEffect(() => {
    if (currentStep === 6) {
    }
  }, [currentStep, stopAudio]);

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
            Você aprendeu a buscar vídeos no YouTube!
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
                  Explorador do YouTube 🔍
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
            Passo {currentStep} de 5
          </div>
        </div>
        <h2 className="text-amber-900 text-2xl text-center">
          Procurando um Vídeo no YouTube
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Tela inicial do YouTube */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep1} 
                alt="Tela inicial do YouTube" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Este é o YouTube! Aqui você pode encontrar vídeos de tudo: músicas, receitas e até vídeos engraçados. Clique em "Próximo" para começar.
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem com botão de busca interativo */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep2} 
                alt="Barra de busca do YouTube" 
                className="w-full h-auto"
              />
              {/* Botão de busca no canto superior direito */}
              <button
                onClick={handleNext}
                className="absolute w-10 h-10 rounded-full bg-orange-500/40 border-3 border-orange-500 flex items-center justify-center hover:scale-110 transition-transform animate-pulse"
                style={{ top: '2%', right: '12%' }}
              >
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Para começar a buscar, toque na lupinha que fica no canto superior da tela. Depois disso, o teclado vai aparecer e você pode digitar o que quer assistir.
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Sugestões de busca */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep3} 
                alt="Sugestões de busca do YouTube" 
                className="w-full h-auto"
              />
              {/* Botão clicável */}
              <button
                onClick={handleNext}
                className="absolute top-[71%] left-[88%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-orange-500/40 border-3 border-orange-500 hover:scale-110 transition-transform animate-pulse"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Agora digite o que você quer assistir. Vamos procurar por receita de bolo como exemplo.
              </p>
            </div>
          </div>
        )}

        {/* Passo 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem com botão no meio */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep4} 
                alt="Resultados de busca no YouTube" 
                className="w-full h-auto"
              />
              {/* Botão no centro da tela */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-orange-500/40 border-3 border-orange-500 hover:scale-110 transition-transform animate-pulse"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Prontinho! Aqui aparecem vários vídeos sobre o que você pesquisou. Toque no vídeo que você quiser assistir.
              </p>
            </div>
          </div>
        )}

        {/* Passo 5 */}
        {currentStep === 5 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Página do vídeo */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={youtubeStep5} 
                alt="Vídeo aberto no YouTube" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Para assistir, toque no botão de play. Agora é só aproveitar o vídeo!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo - escondido nos passos 2, 3 e 4 */}
      {currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && (
        <div className="p-6 pb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            {currentStep < 5 ? "Próximo" : "Finalizar"}
          </Button>
        </div>
      )}
    </div>
  );
}
