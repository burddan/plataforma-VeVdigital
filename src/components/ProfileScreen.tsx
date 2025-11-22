import { Button } from "./ui/button";
import { ArrowLeft, Trophy, Star, Repeat, Award, CheckCircle } from "lucide-react";
import whatsappIcon from "../imagens/whatsapp-icon.png";
import youtubeIcon from "../imagens/youtube-icon.png";

interface ProfileScreenProps {
  userName: string;
  userAvatar: string;
  userGender: 'masculino' | 'feminino';
  userBirthdate: string;
  unlockedAchievements: string[];
  onBack: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  iconType?: 'component' | 'image';
  unlocked: boolean;
  color: string;
}

export function ProfileScreen({ userName, userAvatar, userGender, userBirthdate, unlockedAchievements, onBack }: ProfileScreenProps) {
  // Calcular idade
  const calculateAge = (birthdate: string) => {
    const [day, month, year] = birthdate.split('/');
    const birth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(userBirthdate);
  const genderSymbol = userGender === 'masculino' ? '♂' : '♀';
  const genderColor = userGender === 'masculino' ? 'text-blue-600' : 'text-pink-600';

  const achievements: Achievement[] = [
    {
      id: 'primeiro-passo',
      title: 'Primeiro Passo',
      description: 'Abriu o app pela primeira vez',
      icon: Star,
      iconType: 'component',
      unlocked: unlockedAchievements.includes('primeiro-passo'),
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'primeira-mensagem',
      title: 'Primeira Mensagem',
      description: 'Completou a lição de enviar mensagem no WhatsApp',
      icon: whatsappIcon,
      iconType: 'image',
      unlocked: unlockedAchievements.includes('primeira-mensagem'),
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'primeiro-audio',
      title: 'Primeiro Áudio no WhatsApp',
      description: 'Completou a lição de enviar áudio no WhatsApp',
      icon: whatsappIcon,
      iconType: 'image',
      unlocked: unlockedAchievements.includes('primeiro-audio'),
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'fotografo-zap',
      title: 'Fotógrafo do Zap 📸',
      description: 'Completou a lição de enviar foto no WhatsApp',
      icon: whatsappIcon,
      iconType: 'image',
      unlocked: unlockedAchievements.includes('fotografo-zap'),
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'explorador-youtube',
      title: 'Explorador do YouTube 🔍',
      description: 'Completou a lição de buscar vídeos no YouTube',
      icon: youtubeIcon,
      iconType: 'image',
      unlocked: unlockedAchievements.includes('explorador-youtube'),
      color: 'from-red-400 to-red-500'
    },
    {
      id: 'fa-oficial-canal',
      title: 'Fã Oficial do Canal 🔔👍',
      description: 'Completou a lição de curtir e receber novos vídeos',
      icon: youtubeIcon,
      iconType: 'image',
      unlocked: unlockedAchievements.includes('fa-oficial-canal'),
      color: 'from-red-400 to-red-500'
    },
    {
      id: 'falador-youtube',
      title: 'Falador do YouTube 💬',
      description: 'Comentou seu primeiro vídeo no YouTube',
      icon: youtubeIcon,
      iconType: 'image',
      unlocked: unlockedAchievements.includes('falador-youtube'),
      color: 'from-red-400 to-red-500'
    },
    {
      id: 'persistente',
      title: 'Persistente',
      description: 'Repetiu a mesma atividade 3 vezes',
      icon: Repeat,
      iconType: 'component',
      unlocked: false,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'aprendiz-dedicado',
      title: 'Aprendiz Dedicado',
      description: 'Completou 5 atividades diferentes',
      icon: Award,
      iconType: 'component',
      unlocked: false,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'revisou-tudo',
      title: 'Revisou Tudo!',
      description: 'Repetiu todas as atividades de um aplicativo',
      icon: CheckCircle,
      iconType: 'component',
      unlocked: false,
      color: 'from-cyan-400 to-teal-500'
    }
  ];

  return (
    <div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50 overflow-y-auto">
      {/* Header com botão voltar */}
      <div className="pt-10 px-6 pb-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-orange-700 hover:bg-orange-100 p-2 h-auto"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          <span className="text-lg">Voltar</span>
        </Button>
      </div>

      {/* Área do perfil */}
      <div className="flex flex-col items-center px-6 pb-6">
        {/* Imagem de perfil */}
        <div className="w-32 h-32 rounded-full bg-white border-6 border-orange-400 shadow-2xl overflow-hidden mb-4">
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        </div>

        {/* Nome, idade e símbolo do sexo */}
        <div className="text-center mb-2">
          <h1 className="text-amber-900 text-3xl inline">{userName}</h1>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-amber-800 text-2xl">{age} anos</span>
          <span className={`text-3xl ${genderColor}`}>{genderSymbol}</span>
        </div>
      </div>

      {/* Seção de Conquistas */}
      <div className="flex-1 px-6 pb-6">
        <h2 className="text-amber-900 text-2xl mb-4 text-center">
          🏆 Conquistas
        </h2>

        {/* Lista de conquistas */}
        <div className="space-y-4">
          {achievements.map((achievement) => {
            return (
              <div
                key={achievement.id}
                className={`relative bg-white border-4 rounded-2xl shadow-lg p-5 transition-all ${
                  achievement.unlocked
                    ? 'border-orange-400'
                    : 'border-gray-300 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Ícone da conquista */}
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${
                      achievement.unlocked
                        ? `bg-linear-to-br ${achievement.color} shadow-md`
                        : 'bg-gray-200'
                    }`}
                  >
                    {achievement.iconType === 'image' ? (
                      <img
                        src={achievement.icon}
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        {(() => {
                          const IconComponent = achievement.icon;
                          return (
                            <IconComponent
                              className={`w-8 h-8 ${
                                achievement.unlocked ? 'text-white' : 'text-gray-400'
                              }`}
                              strokeWidth={2.5}
                            />
                          );
                        })()}
                      </>
                    )}
                  </div>

                  {/* Informações da conquista */}
                  <div className="flex-1">
                    <h3
                      className={`text-xl mb-1 ${
                        achievement.unlocked ? 'text-amber-900' : 'text-gray-500'
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-base ${
                        achievement.unlocked ? 'text-amber-700' : 'text-gray-400'
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>

                  {/* Badge de desbloqueado */}
                  {achievement.unlocked && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span className="text-lg">✓</span>
                    </div>
                  )}

                  {/* Badge de bloqueado */}
                  {!achievement.unlocked && (
                    <div className="absolute top-3 right-3 bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                      <span className="text-lg">🔒</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Estatísticas */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm border-4 border-orange-200 rounded-2xl p-5 shadow-md">
          <div className="text-center">
            <p className="text-amber-800 text-lg mb-2">Total de Conquistas</p>
            <p className="text-amber-900 text-3xl">
              {achievements.filter(a => a.unlocked).length} / {achievements.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
