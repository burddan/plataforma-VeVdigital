import { Button } from "./ui/button";
import { useState } from "react";
import { Calendar } from "lucide-react";

interface BirthdateScreenProps {
  onContinue: (birthdate: string) => void;
  userName: string;
}

export function BirthdateScreen({ onContinue, userName }: BirthdateScreenProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const validateDate = () => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);

    if (!day || !month || !year) {
      setError("Por favor, preencha todos os campos");
      return false;
    }

    if (dayNum < 1 || dayNum > 31) {
      setError("Dia inválido");
      return false;
    }

    if (monthNum < 1 || monthNum > 12) {
      setError("Mês inválido");
      return false;
    }

    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) {
      setError("Ano inválido");
      return false;
    }

    // Validação de idade mínima (exemplo: 50 anos para plataforma de idosos)
    const age = currentYear - yearNum;
    if (age < 18) {
      setError("Você precisa ter pelo menos 18 anos");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateDate()) {
      const birthdate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
      onContinue(birthdate);
    }
  };

  const handleDayChange = (value: string) => {
    const numValue = value.replace(/\D/g, '').slice(0, 2);
    setDay(numValue);
    setError("");
  };

  const handleMonthChange = (value: string) => {
    const numValue = value.replace(/\D/g, '').slice(0, 2);
    setMonth(numValue);
    setError("");
  };

  const handleYearChange = (value: string) => {
    const numValue = value.replace(/\D/g, '').slice(0, 4);
    setYear(numValue);
    setError("");
  };

  const isFormComplete = day.length >= 1 && month.length >= 1 && year.length === 4;

  return (
    <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50 overflow-y-auto">
      {/* Área de conteúdo principal */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        
        {/* Ícone */}
        <div className="mb-6 bg-linear-to-br from-orange-400 to-amber-500 rounded-full p-6 shadow-lg">
          <Calendar className="w-16 h-16 text-white" strokeWidth={2} />
        </div>

        {/* Título */}
        <h1 className="text-center mb-3 text-amber-900 text-4xl">
          Data de Nascimento
        </h1>

        {/* Texto explicativo */}
        <p className="text-center mb-10 text-amber-800 text-xl max-w-xs">
          {userName}, quando você nasceu?
        </p>

        {/* Campos de data */}
        <div className="w-full max-w-sm mb-6">
          <div className="flex gap-3 justify-center">
            {/* Dia */}
            <div className="flex-1">
              <label className="block text-center text-amber-800 text-lg mb-2">
                Dia
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={day}
                onChange={(e) => handleDayChange(e.target.value)}
                placeholder="DD"
                maxLength={2}
                className="w-full h-20 text-center text-3xl bg-white border-4 border-orange-300 focus:border-orange-500 rounded-2xl shadow-md outline-none transition-colors text-amber-900 placeholder:text-orange-200"
              />
            </div>

            {/* Mês */}
            <div className="flex-1">
              <label className="block text-center text-amber-800 text-lg mb-2">
                Mês
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={month}
                onChange={(e) => handleMonthChange(e.target.value)}
                placeholder="MM"
                maxLength={2}
                className="w-full h-20 text-center text-3xl bg-white border-4 border-orange-300 focus:border-orange-500 rounded-2xl shadow-md outline-none transition-colors text-amber-900 placeholder:text-orange-200"
              />
            </div>

            {/* Ano */}
            <div className="flex-1">
              <label className="block text-center text-amber-800 text-lg mb-2">
                Ano
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={year}
                onChange={(e) => handleYearChange(e.target.value)}
                placeholder="AAAA"
                maxLength={4}
                className="w-full h-20 text-center text-3xl bg-white border-4 border-orange-300 focus:border-orange-500 rounded-2xl shadow-md outline-none transition-colors text-amber-900 placeholder:text-orange-200"
              />
            </div>
          </div>
        </div>

        {/* Exemplo */}
        {!isFormComplete && (
          <div className="mb-4 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-orange-200">
            <p className="text-orange-600 text-center text-sm">
              Exemplo: 15 / 06 / 1950
            </p>
          </div>
        )}

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-4 bg-red-100 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-sm border-2 border-red-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-red-700 text-center text-lg">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Mensagem de sucesso */}
        {isFormComplete && !error && (
          <div className="mb-4 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm border border-orange-200 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-orange-700 text-lg text-center">
              ✨ Perfeito!
            </p>
          </div>
        )}

        {/* Dica */}
        <div className="mt-6 max-w-xs">
          <p className="text-amber-700 text-center text-sm">
            💡 Toque nos campos para digitar os números
          </p>
        </div>
      </div>

      {/* Botão fixo na parte inferior */}
      <div className="p-6 pb-8">
        <Button
          onClick={handleSubmit}
          disabled={!isFormComplete}
          className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg h-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xl"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
