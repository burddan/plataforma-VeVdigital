import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Star,
  Mic,
} from "lucide-react";
import whatsappIcon from "../imagens/whatsapp-icon.png";
import whatsappAudioStep1 from "../imagens/whatsapp-licao2-audio-passo1.png";
import whatsappAudioStep3 from "../imagens/whatsapp-licao2-audio-passo3.png";

interface WhatsAppLesson2ScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function WhatsAppLesson2Screen({
  onComplete,
  onBack,
}: WhatsAppLesson2ScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(4); // Tela final
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  const handleMouseDown = () => {
    if (currentStep === 2) {
      setIsRecording(true);
      setRecordingProgress(0);

      // Iniciar o progresso visual
      progressIntervalRef.current = setInterval(() => {
        setRecordingProgress((prev) => {
          if (prev >= 100) {
            return 100;
          }
          return prev + (100 / 30); // 3 segundos = 30 intervalos de 100ms
        });
      }, 100);

      // Timer de 3 segundos
      recordingTimerRef.current = setTimeout(() => {
        setIsRecording(false);
        setRecordingProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        // Avançar para o próximo passo após 3 segundos
        setCurrentStep(3);
      }, 3000);
    }
  };

  const handleMouseUp = () => {
    if (currentStep === 2 && isRecording) {
      // Se soltar antes de 3 segundos, cancela
      setIsRecording(false);
      setRecordingProgress(0);
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }
  };

  // Limpar timers ao desmontar
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearTimeout(recordingTimerRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Tela final de parabéns
  if (currentStep === 4) {
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
            Você aprendeu algo novo hoje!
          </p>

          <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg mb-8 w-full">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-amber-900 text-xl mb-1">
                  Primeiro Áudio no WhatsApp
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
            onClick={onBack}
            variant="ghost"
            className="text-orange-700 hover:bg-orange-100 p-2 h-auto"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            <span className="text-lg">Voltar</span>
          </Button>
          <div className="text-amber-800 text-lg">
            Passo {currentStep} de 3
          </div>
        </div>
        <h2 className="text-amber-900 text-2xl text-center">
          Enviando Áudio no WhatsApp
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Tela da conversa com ícone de microfone */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={whatsappAudioStep1} 
                alt="Tela do WhatsApp com botão de microfone" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Às vezes é mais fácil falar do que digitar, não é? Esse botão com o microfone serve para enviar uma mensagem de voz!
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Tela da conversa com ícone de microfone e botão pressionável */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={whatsappAudioStep1} 
                alt="Tela do WhatsApp com botão de microfone" 
                className="w-full h-auto"
              />
              {/* Círculo laranja apenas bordas - pressionar e segurar */}
              {/* LOCALIZAÇÃO: Passo 2 - Botão de gravação de áudio (pressionar e segurar 3s) */}
              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                className={`absolute bottom-0 right-0 w-11 h-11 rounded-full border-4 ${
                  isRecording ? 'border-red-500 bg-red-100' : 'border-orange-500'
                } transition-all flex items-center justify-center`}
                style={{
                  background: isRecording 
                    ? `conic-gradient(#ef4444 ${recordingProgress}%, transparent ${recordingProgress}%)`
                    : 'transparent'
                }}
              >
                {isRecording && (
                  <div className="w-full h-full rounded-full bg-white/80 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                {isRecording 
                  ? "Continue segurando... 🎤"
                  : "Toque e segure o botão do microfone enquanto fala. Quando terminar, solte o botão para enviar seu áudio."
                }
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem - Mensagem de áudio enviada */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img 
                src={whatsappAudioStep3} 
                alt="Mensagem de áudio enviada no WhatsApp" 
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Perfeito! Agora seu netinho vai poder ouvir sua voz.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo - escondido no passo 2 */}
      {currentStep !== 2 && (
        <div className="p-6 pb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            {currentStep < 3 ? "Próximo" : "Finalizar"}
          </Button>
        </div>
      )}
    </div>
  );
}
