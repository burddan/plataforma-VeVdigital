import { Button } from "./ui/button";
import { useState } from "react";
import { MapPin, Search, ChevronRight, ArrowLeft } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface LocationScreenProps {
  onContinue: (state: string, city: string) => void;
  userName: string;
}

// Lista de estados brasileiros
const ESTADOS = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" }
];

// Principais cidades por estado (amostra)
const CIDADES: { [key: string]: string[] } = {
  "AC": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá"],
  "AL": ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo"],
  "AP": ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque"],
  "AM": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru"],
  "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna", "Juazeiro"],
  "CE": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
  "DF": ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina"],
  "ES": ["Vitória", "Vila Velha", "Serra", "Cariacica", "Cachoeiro de Itapemirim"],
  "GO": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia"],
  "MA": ["São Luís", "Imperatriz", "São José de Ribamar", "Timon", "Caxias"],
  "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra"],
  "MS": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
  "MG": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros"],
  "PA": ["Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal"],
  "PB": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux"],
  "PR": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "Foz do Iguaçu"],
  "PE": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"],
  "PI": ["Teresina", "Parnaíba", "Picos", "Piripiri", "Floriano"],
  "RJ": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Campos dos Goytacazes"],
  "RN": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Macaíba"],
  "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí"],
  "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal"],
  "RR": ["Boa Vista", "Rorainópolis", "Caracaraí", "Mucajaí"],
  "SC": ["Florianópolis", "Joinville", "Blumenau", "São José", "Chapecó", "Criciúma"],
  "SP": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santos", "Ribeirão Preto", "Sorocaba"],
  "SE": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "Estância"],
  "TO": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins"]
};

export function LocationScreen({ onContinue, userName }: LocationScreenProps) {
  const [step, setStep] = useState<"state" | "city">("state");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const filteredStates = ESTADOS.filter(estado =>
    estado.nome.toLowerCase().includes(searchState.toLowerCase()) ||
    estado.sigla.toLowerCase().includes(searchState.toLowerCase())
  );

  const filteredCities = selectedState
    ? CIDADES[selectedState].filter(cidade =>
        cidade.toLowerCase().includes(searchCity.toLowerCase())
      )
    : [];

  const handleStateSelect = (sigla: string) => {
    setSelectedState(sigla);
    setStep("city");
    setSearchCity("");
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const handleBack = () => {
    setStep("state");
    setSelectedState("");
    setSelectedCity("");
    setSearchState("");
  };

  const handleSubmit = () => {
    if (selectedState && selectedCity) {
      const stateName = ESTADOS.find(e => e.sigla === selectedState)?.nome || selectedState;
      onContinue(stateName, selectedCity);
    }
  };

  return (
    <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="pt-12 pb-6 px-8">
        {/* Botão voltar (apenas na etapa de cidade) */}
        {step === "city" && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="text-amber-900 hover:bg-orange-200/50 rounded-full h-12 w-12"
            >
              <ArrowLeft className="h-7 w-7" />
            </Button>
          </div>
        )}

        {/* Ícone */}
        <div className="mb-4 bg-linear-to-br from-orange-400 to-amber-500 rounded-full p-5 shadow-lg w-fit mx-auto">
          <MapPin className="w-12 h-12 text-white" strokeWidth={2} />
        </div>

        {/* Título */}
        <h1 className="text-center mb-2 text-amber-900 text-3xl">
          {step === "state" ? "Onde você mora?" : "Qual cidade?"}
        </h1>

        {/* Subtítulo */}
        <p className="text-center text-amber-800 text-lg">
          {step === "state" ? `${userName}, selecione seu estado` : "Escolha sua cidade"}
        </p>
      </div>

      {/* Campo de busca */}
      <div className="px-8 mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-400" />
          <input
            type="text"
            value={step === "state" ? searchState : searchCity}
            onChange={(e) => step === "state" ? setSearchState(e.target.value) : setSearchCity(e.target.value)}
            placeholder={step === "state" ? "Buscar estado..." : "Buscar cidade..."}
            className="w-full h-14 pl-14 pr-4 text-xl bg-white border-4 border-orange-300 focus:border-orange-500 rounded-2xl shadow-md outline-none transition-colors text-amber-900 placeholder:text-orange-300"
          />
        </div>
      </div>

      {/* Lista de opções */}
      <div className="flex-1 overflow-hidden px-8">
        <ScrollArea className="h-full">
          <div className="space-y-3 pb-4">
            {step === "state" ? (
              // Lista de estados
              filteredStates.map((estado) => (
                <button
                  key={estado.sigla}
                  onClick={() => handleStateSelect(estado.sigla)}
                  className="w-full bg-white border-4 border-orange-300 hover:border-orange-500 hover:bg-orange-50 rounded-2xl shadow-md p-5 flex items-center justify-between transition-all active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-linear-to-br from-orange-400 to-amber-500 text-white rounded-xl px-3 py-1.5 min-w-12 text-center">
                      <span className="text-lg">{estado.sigla}</span>
                    </div>
                    <span className="text-amber-900 text-xl">{estado.nome}</span>
                  </div>
                  <ChevronRight className="w-6 h-6 text-orange-400" />
                </button>
              ))
            ) : (
              // Lista de cidades
              filteredCities.map((cidade) => (
                <button
                  key={cidade}
                  onClick={() => handleCitySelect(cidade)}
                  className={`w-full border-4 rounded-2xl shadow-md p-5 flex items-center justify-between transition-all active:scale-98 ${
                    selectedCity === cidade
                      ? "bg-linear-to-br from-orange-500 to-amber-500 border-orange-700 shadow-xl"
                      : "bg-white border-orange-300 hover:border-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <span className={`text-xl ${
                    selectedCity === cidade ? "text-white" : "text-amber-900"
                  }`}>
                    {cidade}
                  </span>
                  {selectedCity === cidade && (
                    <div className="bg-white/20 rounded-full p-1">
                      <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                        <div className="bg-orange-600 rounded-full w-3 h-3"></div>
                      </div>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Botões fixos na parte inferior */}
      <div className="shrink-0 p-6 pb-8 space-y-3 bg-linear-to-b from-amber-50 to-orange-50">
        {step === "city" && (
          <Button
            onClick={handleSubmit}
            disabled={!selectedCity}
            className="w-full bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg h-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-xl"
          >
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
}
