import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeft,
  Star,
  Image as ImageIcon,
  ArrowDown,
} from "lucide-react";
import whatsappIcon from "../imagens/whatsapp-icon.png";
import whatsappPhotoStep1 from "../imagens/whatsapp-licao3-foto-passo1.png";
import whatsappPhotoStep2 from "../imagens/whatsapp-licao3-foto-passo2.png";
import whatsappPhotoStep3 from "../imagens/whatsapp-licao3-foto-passo3.png";
import whatsappPhotoStep4 from "../imagens/whatsapp-licao3-foto-passo4.png";
import { useScreenAudio } from "../useScreenAudio";

interface WhatsAppLesson3ScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function WhatsAppLesson3Screen({
  onComplete,
  onBack,
}: WhatsAppLesson3ScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Use o hook useScreenAudio para tocar o áudio correspondente a cada etapa
  const { stopAudio } = useScreenAudio(
    currentStep === 5 ? "licaoconcluida.mp3" : `w3_${currentStep}.mp3`
  );

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
            Você enviou sua primeira foto!
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
                  Fotógrafo do Zap 📸
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
          Enviando Foto no WhatsApp
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Passo 1 */}
        {currentStep === 1 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem com botão interativo no clipe */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img
                src={whatsappPhotoStep1}
                alt="WhatsApp conversa"
                className="w-full h-auto"
              />
              {/* Botão sobre o ícone de clipe */}
              <button
                onClick={handleNext}
                className="absolute bottom-2 left-6 w-10 h-10 rounded-full bg-orange-500 border-4 border-orange-600 hover:scale-110 transition-all shadow-lg animate-pulse"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Para mandar uma foto para alguém, você precisa primeiro abrir a conversa. Depois, toque nesse botão de clipe aqui embaixo.
              </p>
            </div>
          </div>
        )}

        {/* Passo 2 */}
        {currentStep === 2 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem com botão interativo no botão Foto */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img
                src={whatsappPhotoStep2}
                alt="Menu do WhatsApp"
                className="w-full h-auto"
              />
              {/* Botão sobre o botão "Foto" azul */}
              <button
                onClick={handleNext}
                className="absolute top-[51%] right-[19%] w-16 h-16 rounded-full bg-orange-500 border-4 border-orange-600 hover:scale-110 transition-all shadow-lg animate-pulse"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Aqui aparecem várias opções. Para escolher uma foto que já está no seu celular, toque em Galeria.
              </p>
            </div>
          </div>
        )}

        {/* Passo 3 */}
        {currentStep === 3 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem com botão interativo na foto do churrasco */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden relative">
              <img
                src={whatsappPhotoStep3}
                alt="Galeria de fotos"
                className="w-full h-auto"
              />
              {/* Botão sobre a foto do churrasco (conteúdo marrom) */}
              <button
                onClick={handleNext}
                className="absolute top-[42%] left-[13%] w-16 h-16 rounded-full bg-orange-500 border-4 border-orange-600 hover:scale-110 transition-all shadow-lg animate-pulse"
              ></button>
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Estas são suas fotos. Toque na foto que você quer enviar para seu netinho.
              </p>
            </div>
          </div>
        )}

        {/* Passo 4 */}
        {currentStep === 4 && (
          <div className="flex flex-col items-center space-y-6">
            {/* Imagem de pré-visualização da foto */}
            <div className="w-full rounded-3xl shadow-xl overflow-hidden">
              <img
                src={whatsappPhotoStep4}
                alt="Pré-visualização da foto"
                className="w-full h-auto"
              />
            </div>

            {/* Texto explicativo */}
            <div className="bg-white border-4 border-orange-300 rounded-2xl p-6 shadow-lg">
              <p className="text-amber-900 text-xl leading-relaxed text-center">
                Antes de mandar, você pode ver como a foto ficou. Quando estiver tudo certo, toque no botão de enviar.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Botão fixo - só aparece no passo 4 */}
      {currentStep === 4 && (
        <div className="p-6 pb-8">
          <Button
            onClick={handleNext}
            className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
          >
            Finalizar
          </Button>
        </div>
      )}
    </div>
  );
}
