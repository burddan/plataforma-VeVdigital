import { useState } from "react";
import { useEffect } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { RegisterScreen } from "./components/RegisterScreen";
import { GenderScreen } from "./components/GenderScreen";
import { BirthdateScreen } from "./components/BirthdateScreen";
import { LocationScreen } from "./components/LocationScreen";
import { AvatarScreen } from "./components/AvatarScreen";
import { FaceRecognitionScreen } from "./components/FaceRecognitionScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { WhatsAppLessonScreen } from "./components/WhatsAppLessonScreen";
import { WhatsAppLesson2Screen } from "./components/WhatsAppLesson2Screen";
import { WhatsAppLesson3Screen } from "./components/WhatsAppLesson3Screen";
import { YouTubeLesson1Screen } from "./components/YouTubeLesson1Screen";
import { YouTubeLesson2Screen } from "./components/YouTubeLesson2Screen";
import { YouTubeLesson3Screen } from "./components/YouTubeLesson3Screen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"intro" | "register" | "gender" | "birthdate" | "location" | "avatar" | "faceRecognition" | "dashboard" | "profile" | "whatsappLesson" | "whatsappLesson2" | "whatsappLesson3" | "youtubeLesson1" | "youtubeLesson2" | "youtubeLesson3">("intro");
  const [userName, setUserName] = useState("");
  const [userGender, setUserGender] = useState<'masculino' | 'feminino' | ''>("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userState, setUserState] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(["primeiro-passo"]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleStart = () => {
    setCurrentScreen("register");
  };

  const handleRegister = (name: string) => {
    setUserName(name);
    setCurrentScreen("gender");
  };

  const handleGender = (gender: 'masculino' | 'feminino') => {
    setUserGender(gender);
    setCurrentScreen("birthdate");
  };

  const handleBirthdate = (birthdate: string) => {
    setUserBirthdate(birthdate);
    setCurrentScreen("location");
  };

  const handleLocation = (state: string, city: string) => {
    setUserState(state);
    setUserCity(city);
    setCurrentScreen("avatar");
  };

  const handleAvatar = (avatarUrl: string) => {
    setUserAvatar(avatarUrl);
    console.log("Cadastro completo - Nome:", userName, "Sexo:", userGender, "Data:", userBirthdate, "Local:", userCity + "/" + userState, "Avatar:", avatarUrl);
    setCurrentScreen("dashboard");
  };

  const handleGoToFaceRecognition = () => {
    setCurrentScreen("faceRecognition");
  };

  const handleBackToAvatar = () => {
    setCurrentScreen("avatar");
  };

  const handleFaceCapture = (photoUrl: string) => {
    setUserAvatar(photoUrl);
    console.log("Cadastro completo - Nome:", userName, "Sexo:", userGender, "Data:", userBirthdate, "Local:", userCity + "/" + userState, "Avatar:", photoUrl);
    setCurrentScreen("dashboard");
  };

  const handleSelectApp = (app: string, lessonId?: string) => {
    console.log("Aplicativo selecionado:", app, "Lição:", lessonId);
    if (app === "WhatsApp") {
      if (lessonId === "whatsapp-lesson-1") {
        setCurrentScreen("whatsappLesson");
      } else if (lessonId === "whatsapp-lesson-2") {
        setCurrentScreen("whatsappLesson2");
      } else if (lessonId === "whatsapp-lesson-3") {
        setCurrentScreen("whatsappLesson3");
      } else {
        // Por padrão, vai para a primeira lição não completada
        if (!completedLessons.includes("whatsapp-lesson-1")) {
          setCurrentScreen("whatsappLesson");
        } else if (!completedLessons.includes("whatsapp-lesson-2")) {
          setCurrentScreen("whatsappLesson2");
        } else if (!completedLessons.includes("whatsapp-lesson-3")) {
          setCurrentScreen("whatsappLesson3");
        } else {
          setCurrentScreen("whatsappLesson");
        }
      }
    } else if (app === "YouTube") {
      if (lessonId === "youtube-lesson-1") {
        setCurrentScreen("youtubeLesson1");
      } else if (lessonId === "youtube-lesson-2") {
        setCurrentScreen("youtubeLesson2");
      } else if (lessonId === "youtube-lesson-3") {
        setCurrentScreen("youtubeLesson3");
      } else {
        // Por padrão, vai para a primeira lição não completada
        if (!completedLessons.includes("youtube-lesson-1")) {
          setCurrentScreen("youtubeLesson1");
        } else if (!completedLessons.includes("youtube-lesson-2")) {
          setCurrentScreen("youtubeLesson2");
        } else if (!completedLessons.includes("youtube-lesson-3")) {
          setCurrentScreen("youtubeLesson3");
        } else {
          setCurrentScreen("youtubeLesson1");
        }
      }
    }
    // Aqui você pode navegar para a tela de aprendizado dos outros apps
  };

  const handleProfileClick = () => {
    setCurrentScreen("profile");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleLessonComplete = () => {
    // Desbloquear a conquista "Primeira Mensagem"
    if (!unlockedAchievements.includes("primeira-mensagem")) {
      setUnlockedAchievements([...unlockedAchievements, "primeira-mensagem"]);
    }
    // Marcar lição 1 como completa
    if (!completedLessons.includes("whatsapp-lesson-1")) {
      setCompletedLessons([...completedLessons, "whatsapp-lesson-1"]);
    }
    setCurrentScreen("dashboard");
  };

  const handleLesson2Complete = () => {
    // Desbloquear a conquista "Primeiro Áudio"
    if (!unlockedAchievements.includes("primeiro-audio")) {
      setUnlockedAchievements([...unlockedAchievements, "primeiro-audio"]);
    }
    // Marcar lição 2 como completa
    if (!completedLessons.includes("whatsapp-lesson-2")) {
      setCompletedLessons([...completedLessons, "whatsapp-lesson-2"]);
    }
    setCurrentScreen("dashboard");
  };

  const handleLesson3Complete = () => {
    // Desbloquear a conquista "Fotógrafo do Zap"
    if (!unlockedAchievements.includes("fotografo-zap")) {
      setUnlockedAchievements([...unlockedAchievements, "fotografo-zap"]);
    }
    // Marcar lição 3 como completa
    if (!completedLessons.includes("whatsapp-lesson-3")) {
      setCompletedLessons([...completedLessons, "whatsapp-lesson-3"]);
    }
    setCurrentScreen("dashboard");
  };

  const handleYouTubeLesson1Complete = () => {
    // Desbloquear a conquista "Explorador do YouTube"
    if (!unlockedAchievements.includes("explorador-youtube")) {
      setUnlockedAchievements([...unlockedAchievements, "explorador-youtube"]);
    }
    // Marcar lição 1 do YouTube como completa
    if (!completedLessons.includes("youtube-lesson-1")) {
      setCompletedLessons([...completedLessons, "youtube-lesson-1"]);
    }
    setCurrentScreen("dashboard");
  };

  const handleYouTubeLesson2Complete = () => {
    // Desbloquear a conquista "Fã Oficial do Canal"
    if (!unlockedAchievements.includes("fa-oficial-canal")) {
      setUnlockedAchievements([...unlockedAchievements, "fa-oficial-canal"]);
    }
    // Marcar lição 2 do YouTube como completa
    if (!completedLessons.includes("youtube-lesson-2")) {
      setCompletedLessons([...completedLessons, "youtube-lesson-2"]);
    }
    setCurrentScreen("dashboard");
  };

  const handleYouTubeLesson3Complete = () => {
    // Desbloquear a conquista "Falador do YouTube"
    if (!unlockedAchievements.includes("falador-youtube")) {
      setUnlockedAchievements([...unlockedAchievements, "falador-youtube"]);
    }
    // Marcar lição 3 do YouTube como completa
    if (!completedLessons.includes("youtube-lesson-3")) {
      setCompletedLessons([...completedLessons, "youtube-lesson-3"]);
    }
    setCurrentScreen("dashboard");
  };

  return (
    <div className="size-full bg-gray-900 flex items-center justify-center p-4">
      {/* Container do celular */}
      <div className="w-full max-w-[390px] h-[844px] max-h-[95vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-14 border-gray-800 relative">
        {/* Notch/Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-10"></div>
        
        {/* Conteúdo do aplicativo */}
        {currentScreen === "intro" && <IntroScreen onStart={handleStart} />}
        {currentScreen === "register" && <RegisterScreen onContinue={handleRegister} />}
        {currentScreen === "gender" && <GenderScreen onContinue={handleGender} userName={userName} />}
        {currentScreen === "birthdate" && <BirthdateScreen onContinue={handleBirthdate} userName={userName} />}
        {currentScreen === "location" && <LocationScreen onContinue={handleLocation} userName={userName} />}
        {currentScreen === "avatar" && <AvatarScreen onContinue={handleAvatar} userName={userName} onGoToFaceRecognition={handleGoToFaceRecognition} />}
        {currentScreen === "faceRecognition" && <FaceRecognitionScreen onCapture={handleFaceCapture} onBack={handleBackToAvatar} userName={userName} />}
        {currentScreen === "dashboard" && <DashboardScreen userName={userName} userAvatar={userAvatar} completedLessons={completedLessons} onSelectApp={handleSelectApp} onProfileClick={handleProfileClick} />}
        {currentScreen === "profile" && <ProfileScreen userName={userName} userAvatar={userAvatar} userGender={userGender as 'masculino' | 'feminino'} userBirthdate={userBirthdate} unlockedAchievements={unlockedAchievements} onBack={handleBackToDashboard} />}
        {currentScreen === "whatsappLesson" && <WhatsAppLessonScreen onComplete={handleLessonComplete} onBack={handleBackToDashboard} />}
        {currentScreen === "whatsappLesson2" && <WhatsAppLesson2Screen onComplete={handleLesson2Complete} onBack={handleBackToDashboard} />}
        {currentScreen === "whatsappLesson3" && <WhatsAppLesson3Screen onComplete={handleLesson3Complete} onBack={handleBackToDashboard} />}
        {currentScreen === "youtubeLesson1" && <YouTubeLesson1Screen onComplete={handleYouTubeLesson1Complete} onBack={handleBackToDashboard} />}
        {currentScreen === "youtubeLesson2" && <YouTubeLesson2Screen onComplete={handleYouTubeLesson2Complete} onBack={handleBackToDashboard} />}
        {currentScreen === "youtubeLesson3" && <YouTubeLesson3Screen onComplete={handleYouTubeLesson3Complete} onBack={handleBackToDashboard} />}
      </div>
    </div>
  );
}
