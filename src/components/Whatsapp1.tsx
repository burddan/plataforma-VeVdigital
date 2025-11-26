import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Star,
} from "lucide-react";
import whatsappScreen from "../imagens/whatsapp-licao1-tela1.png";
import whatsappScreen2 from "../imagens/whatsapp-licao1-tela2.png";
import whatsappScreen3 from "../imagens/whatsapp-licao1-tela3.png";
import whatsappScreen4 from "../imagens/whatsapp-licao1-tela4.png";
import whatsappIcon from "../imagens/whatsapp-icon.png";
import { useScreenAudio } from "../useScreenAudio";

interface Whatsapp1Props {
  onComplete: () => void;
  onBack: () => void;
}

export function Whatsapp1({
  onComplete,
  onBack,
}: Whatsapp1Props) {
  const [currentStep, setCurrentStep] = useState(1);

  // Use o hook useScreenAudio para tocar o áudio correspondente a cada etapa
  const { stopAudio } = useScreenAudio(currentStep === 5 ? "licaoconcluida.mp3" : `w1_${currentStep}.mp3`);

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
                  Primeira Mensagem
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
          Enviando Mensagem no WhatsApp
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem da tela do WhatsApp */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden">
              <img
                src={whatsappScreen}
                alt="Tela do WhatsApp"
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Este é o WhatsApp. Ele serve para conversar com
                pessoas e com seus netinhos!
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem com destaque */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img
                src={whatsappScreen2}
                alt="Tela do WhatsApp com conversas"
                className="w-full h-auto"
              />

              {/* Círculo laranja clicável */}
              <button
                onClick={handleNext}
                className="absolute top-[52%] right-2 w-12 h-12 rounded-full bg-orange-500 border-4 border-orange-600 animate-pulse shadow-lg cursor-pointer"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Cada pessoa são suas conversas, aqui você pode
                entrar em cada conversa! Clique no seu Primo
                Lucas para enviar uma mensagem pra ele
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem da conversa do WhatsApp */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img
                src={whatsappScreen3}
                alt="Conversa com Primo Lucas no WhatsApp"
                className="w-full h-auto"
              />
              
              {/* Círculo laranja clicável */}
              <button 
                onClick={handleNext}
                className="absolute bottom-[0%] right-20 w-12 h-12 rounded-full bg-orange-500 border-4 border-orange-600 animate-pulse shadow-lg cursor-pointer"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Aqui estão suas mensagens que você andou
                conversando com seu Primo Lucas. Clique nesse botão
                para começar uma conversa
              </p>
            </div>
          </div>
        )}

        {/* Passo 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem do teclado do WhatsApp */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img
                src={whatsappScreen4}
                alt="Teclado do WhatsApp aberto"
                className="w-full h-auto"
              />
              
              {/* Círculo laranja clicável */}
              <button 
                onClick={handleNext}
                className="absolute top-[79%] left-[80%] w-12 h-12 rounded-full bg-orange-500 border-4 border-orange-600 animate-pulse shadow-lg cursor-pointer"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Vai aparecer um teclado para você digitar a sua mensagem. Após terminar, 
                clique no botão Enviar mensagem (↵).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo - só aparece no passo 1 */}
      {currentStep === 1 && (
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
