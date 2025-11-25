import { Progress } from "./ui/progress";

import youtubeIcon from "../imagens/youtube-icon.png";
import whatsappIcon from "../imagens/whatsapp-icon.png";
import instagramIcon from "../imagens/instagram-icon.png";

interface DashboardScreenProps {
  userName: string;
  userAvatar: string;
  completedLessons: string[];
  onSelectApp: (app: string, lessonId?: string) => void;
  onProfileClick: () => void;
}

interface AppProgress {
  name: string;
  icon: string;
  progress: number;
  color: string;
  lessons?: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

export function DashboardScreen({ userName, userAvatar, completedLessons, onSelectApp, onProfileClick }: DashboardScreenProps) {
  // Calcular progresso do WhatsApp baseado nas lições completadas
  const whatsappLessons = [
    { id: "whatsapp-lesson-1", title: "Enviando Mensagem", completed: completedLessons.includes("whatsapp-lesson-1") },
    { id: "whatsapp-lesson-2", title: "Enviando Áudio", completed: completedLessons.includes("whatsapp-lesson-2") },
    { id: "whatsapp-lesson-3", title: "Enviando Foto", completed: completedLessons.includes("whatsapp-lesson-3") }
  ];
  const whatsappProgress = Math.round((whatsappLessons.filter(l => l.completed).length / whatsappLessons.length) * 100);

  // Calcular progresso do YouTube baseado nas lições completadas
  const youtubeLessons = [
    { id: "youtube-lesson-1", title: "Procurando um Vídeo", completed: completedLessons.includes("youtube-lesson-1") },
    { id: "youtube-lesson-2", title: "Curtir e Receber Novos Vídeos", completed: completedLessons.includes("youtube-lesson-2") },
    { id: "youtube-lesson-3", title: "Comentando e Lendo Comentários", completed: completedLessons.includes("youtube-lesson-3") }
  ];
  const youtubeProgress = Math.round((youtubeLessons.filter(l => l.completed).length / youtubeLessons.length) * 100);

  // Calcular progresso do Instagram baseado nas lições completadas
  const instagramLessons = [
    { id: "instagram-lesson-1", title: "Postando uma Foto", completed: completedLessons.includes("instagram-lesson-1") }
  ];
  const instagramProgress = Math.round((instagramLessons.filter(l => l.completed).length / instagramLessons.length) * 100);

  const apps: AppProgress[] = [
    {
      name: "YouTube",
      icon: youtubeIcon,
      progress: youtubeProgress,
      color: "from-red-500 to-red-600",
      lessons: youtubeLessons
    },
    {
      name: "WhatsApp",
      icon: whatsappIcon,
      progress: whatsappProgress,
      color: "from-green-500 to-green-600",
      lessons: whatsappLessons
    },
    {
      name: "Instagram",
      icon: instagramIcon,
      progress: instagramProgress,
      color: "from-pink-500 to-purple-600",
      lessons: instagramLessons
    }
  ];

  return (
    <div className="size-full flex flex-col bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between border-b-2 border-orange-200">
        <div>
          <h2 className="text-amber-900 text-2xl font-bold">Bem vindo,</h2>
          <p className="text-amber-800 text-xl">{userName}!</p>
        </div>
        <button
          onClick={onProfileClick}
          className="w-16 h-16 rounded-full bg-white border-4 border-orange-300 shadow-lg overflow-hidden flex-shrink-0 hover:border-orange-500 transition-all hover:scale-110 active:scale-95"
        >
          <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Título da seção */}
        <h3 className="text-amber-900 text-xl font-bold mb-6 text-center">
          Escolha o que você quer aprender hoje:
        </h3>

        {/* Grid de aplicativos */}
        <div className="grid grid-cols-1 gap-4 pb-6">
          {apps.map((app) => (
            <div key={app.name} className="bg-white border-4 border-orange-200 rounded-2xl p-6 shadow-lg">
              {/* Ícone e Nome */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-md p-2 flex-shrink-0">
                  <img src={app.icon} alt={app.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-amber-900 text-2xl font-bold">{app.name}</h4>
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-amber-800 text-sm">Progresso</span>
                  <span className="text-amber-900 font-bold text-lg">{app.progress}%</span>
                </div>
                <div className="relative h-3 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${app.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${app.progress}%` }}
                  />
                </div>
              </div>

              {/* Lista de lições */}
              {app.lessons && app.lessons.length > 0 && (
                <div className="space-y-2">
                  {app.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectApp(app.name, lesson.id)}
                      disabled={
                        (lesson.id === "whatsapp-lesson-2" && !completedLessons.includes("whatsapp-lesson-1")) ||
                        (lesson.id === "whatsapp-lesson-3" && !completedLessons.includes("whatsapp-lesson-2")) ||
                        (lesson.id === "youtube-lesson-2" && !completedLessons.includes("youtube-lesson-1")) ||
                        (lesson.id === "youtube-lesson-3" && !completedLessons.includes("youtube-lesson-2"))
                      }
                      className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                        lesson.completed
                          ? "bg-green-50 border-green-300"
                          : (lesson.id === "whatsapp-lesson-2" && !completedLessons.includes("whatsapp-lesson-1")) ||
                            (lesson.id === "whatsapp-lesson-3" && !completedLessons.includes("whatsapp-lesson-2")) ||
                            (lesson.id === "youtube-lesson-2" && !completedLessons.includes("youtube-lesson-1")) ||
                            (lesson.id === "youtube-lesson-3" && !completedLessons.includes("youtube-lesson-2"))
                          ? "bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed"
                          : "bg-orange-50 border-orange-300 hover:border-orange-400 hover:scale-105 active:scale-95"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-base ${lesson.completed ? "text-green-800" : "text-amber-900"}`}>
                          {lesson.title}
                        </span>
                        {lesson.completed && (
                          <span className="text-green-600 text-xl">✓</span>
                        )}
                        {((lesson.id === "whatsapp-lesson-2" && !completedLessons.includes("whatsapp-lesson-1")) ||
                          (lesson.id === "whatsapp-lesson-3" && !completedLessons.includes("whatsapp-lesson-2")) ||
                          (lesson.id === "youtube-lesson-2" && !completedLessons.includes("youtube-lesson-1")) ||
                          (lesson.id === "youtube-lesson-3" && !completedLessons.includes("youtube-lesson-2"))) && (
                          <span className="text-gray-400 text-xl">🔒</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Linha divisória inferior */}
      <div className="border-t-2 border-orange-200 h-2" />
    </div>
  );
}
