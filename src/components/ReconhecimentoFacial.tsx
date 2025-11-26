import { Button } from "./ui/button";
import { useState, useRef, useEffect } from "react";
import { Camera, CheckCircle2, X, RotateCcw, Image } from "lucide-react";
import { useScreenAudio } from "../useScreenAudio";

interface ReconhecimentoFacialProps {
		onCapture: (photoUrl: string) => void;
		onBack: () => void;
		userName: string;
}

export function ReconhecimentoFacial({ onCapture, onBack, userName }: ReconhecimentoFacialProps) {
		const { stopAudio } = useScreenAudio("reconhecimento_facial.mp3"); // <-- agora só coloca o nome do arquivo
		const handleContinue = () => {
				stopAudio();     // para o áudio
				onContinue();    // muda de tela
		};

		const [stream, setStream] = useState<MediaStream | null>(null);
		const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
		const [isRecognizing, setIsRecognizing] = useState(false);
		const [recognitionStep, setRecognitionStep] = useState<'none' | 'detecting' | 'analyzing' | 'success'>('none');
		const [cameraError, setCameraError] = useState(false);
		const [hasCamera, setHasCamera] = useState(true);
		const videoRef = useRef<HTMLVideoElement>(null);
		const canvasRef = useRef<HTMLCanvasElement>(null);
		const fileInputRef = useRef<HTMLInputElement>(null);

		useEffect(() => {
				// Verifica se a API de câmera está disponível
				if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
						startCamera();
				} else {
						setHasCamera(false);
						setCameraError(true);
				}
				return () => {
						stopCamera();
				};
		}, []);

		const startCamera = async () => {
				try {
						const mediaStream = await navigator.mediaDevices.getUserMedia({ 
								video: { 
										facingMode: 'user',
										width: { ideal: 1280 },
										height: { ideal: 720 }
								} 
						});
						setStream(mediaStream);
						if (videoRef.current) {
								videoRef.current.srcObject = mediaStream;
						}
						setCameraError(false);
						setHasCamera(true);
				} catch (error) {
						console.error("Erro ao acessar câmera:", error);
						setCameraError(true);
						setHasCamera(false);
				}
		};

		const stopCamera = () => {
				if (stream) {
						stream.getTracks().forEach(track => track.stop());
				}
		};

		const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
				const file = e.target.files?.[0];
				if (file) {
						setIsRecognizing(true);
						setRecognitionStep('detecting');

						// Simula processo de reconhecimento
						setTimeout(() => {
								setRecognitionStep('analyzing');

								setTimeout(() => {
										setRecognitionStep('success');

										setTimeout(() => {
												const reader = new FileReader();
												reader.onload = (event) => {
														const result = event.target?.result as string;
														setCapturedPhoto(result);
														setIsRecognizing(false);
														setRecognitionStep('none');
												};
												reader.readAsDataURL(file);
										}, 800);
								}, 1200);
						}, 1000);
				}
		};

		const handleUploadClick = () => {
				fileInputRef.current?.click();
		};

		const capturePhoto = () => {
				if (!videoRef.current || !canvasRef.current) return;

				setIsRecognizing(true);
				setRecognitionStep('detecting');

				// Simula processo de reconhecimento
				setTimeout(() => {
						setRecognitionStep('analyzing');

						setTimeout(() => {
								setRecognitionStep('success');

								setTimeout(() => {
										const canvas = canvasRef.current;
										const video = videoRef.current;

										if (canvas && video) {
												canvas.width = video.videoWidth;
												canvas.height = video.videoHeight;
												const ctx = canvas.getContext('2d');

												if (ctx) {
														ctx.drawImage(video, 0, 0);
														const photoUrl = canvas.toDataURL('image/png');
														setCapturedPhoto(photoUrl);
														stopCamera();
														setIsRecognizing(false);
														setRecognitionStep('none');
												}
										}
								}, 1000);
						}, 1500);
				}, 1000);
		};

		const retakePhoto = () => {
				setCapturedPhoto(null);
				startCamera();
		};

		const confirmPhoto = () => {
				if (capturedPhoto) {
						onCapture(capturedPhoto);
				}
		};

		return (
				<div className="size-full flex flex-col bg-linear-to-b from-amber-50 to-orange-50">
				{/* Header com botão voltar */}
				<div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm border-b border-orange-200">
				<button
				onClick={onBack}
				className="p-2 rounded-full hover:bg-orange-100 transition-colors"
				>
				<X className="w-6 h-6 text-amber-900" strokeWidth={2} />
				</button>
				<h2 className="text-amber-900 text-xl">Tirar Selfie</h2>
				<div className="w-10"></div> {/* Spacer para centralizar */}
				</div>

				{/* Área principal */}
				<div className="flex-1 flex flex-col items-center justify-center px-6 py-8">

				{!capturedPhoto ? (
						<>
						{/* Instruções */}
						<div className="mb-4 bg-white/70 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm border-2 border-orange-200">
						<p className="text-amber-900 text-center text-lg">
						{cameraError 
								? "📁 Escolha uma foto do seu dispositivo"
								: isRecognizing
										? recognitionStep === 'detecting' 
										? "🔍 Detectando rosto..."
										: recognitionStep === 'analyzing'
												? "🧠 Analisando..."
												: "✅ Perfeito!"
														: "📸 Posicione seu rosto no centro"
						}
						</p>
						</div>

						{/* Preview da câmera */}
						<div className="relative mb-6">
						<div className="w-72 h-72 rounded-3xl overflow-hidden bg-gray-200 shadow-2xl border-4 border-white relative">
						{!cameraError ? (
								<>
								<video
								ref={videoRef}
								autoPlay
								playsInline
								muted
								className="w-full h-full object-cover scale-x-[-1]"
								/>

								{/* Overlay com guia facial */}
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<div 
								className={`w-56 h-72 border-4 rounded-full transition-all duration-500 ${
										isRecognizing 
												? recognitionStep === 'success'
												? 'border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.6)]'
												: 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-pulse'
														: 'border-white/60 border-dashed'
								}`}
								></div>
								</div>

								{/* Indicadores de reconhecimento */}
								{isRecognizing && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/20">
										<div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl">
										{recognitionStep === 'success' ? (
												<CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
										) : (
										<div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
										)}
										</div>
										</div>
								)}
								</>
						) : (
						<div className="w-full h-full flex items-center justify-center bg-linear-to-br from-orange-50 to-amber-50">
						<div className="text-center px-6">
						<Camera className="w-20 h-20 text-orange-400 mx-auto mb-4" />
						<p className="text-amber-900 text-lg mb-2">
						Câmera não disponível
						</p>
						<p className="text-amber-700 text-sm mb-6">
						Não se preocupe! Você pode escolher uma foto salva no seu dispositivo
						</p>
						</div>
						</div>
						)}
						</div>

						{/* Overlay de reconhecimento quando está processando upload */}
						{isRecognizing && cameraError && (
								<div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl">
								<div className="bg-white/90 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-xl">
								{recognitionStep === 'success' ? (
										<CheckCircle2 className="w-16 h-16 text-green-500 animate-bounce" />
								) : (
								<div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
								)}
								</div>
								</div>
						)}
						</div>

						{/* Botão de captura ou upload */}
						{!cameraError ? (
								<button
								onClick={capturePhoto}
								disabled={isRecognizing}
								className={`w-20 h-20 rounded-full bg-white border-4 shadow-xl transition-all ${
										isRecognizing 
												? 'border-gray-300 cursor-not-allowed' 
												: 'border-orange-500 hover:scale-110 active:scale-95'
								}`}
								>
								<div className={`w-full h-full rounded-full flex items-center justify-center ${
										isRecognizing ? 'bg-gray-200' : 'bg-linear-to-br from-orange-400 to-amber-500'
								}`}>
								<Camera className="w-10 h-10 text-white" strokeWidth={2} />
								</div>
								</button>
						) : (
						<button
						onClick={handleUploadClick}
						disabled={isRecognizing}
						className={`px-8 py-4 rounded-2xl shadow-xl transition-all text-xl ${
								isRecognizing 
										? 'bg-gray-300 cursor-not-allowed text-gray-500' 
										: 'bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white hover:scale-105 active:scale-95'
						}`}
						>
						<div className="flex items-center gap-3">
						<Image className="w-8 h-8" strokeWidth={2} />
						<span>Escolher Foto</span>
						</div>
						</button>
						)}

						{/* Input escondido para seleção de arquivo */}
						<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						onChange={handleFileSelect}
						className="hidden"
						/>
						</>
				) : (
				<>
				{/* Preview da foto capturada */}
				<div className="mb-4 bg-white/70 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-sm border-2 border-orange-200">
				<p className="text-amber-900 text-center text-lg">
				✨ Ficou ótima, {userName}!
				</p>
				</div>

				<div className="w-72 h-72 rounded-3xl overflow-hidden bg-gray-200 shadow-2xl border-4 border-white mb-6">
				<img 
				src={capturedPhoto} 
				alt="Foto capturada" 
				className="w-full h-full object-cover scale-x-[-1]"
				/>
				</div>

				{/* Botões de ação */}
				<div className="w-full max-w-sm space-y-3">
				<Button
				onClick={confirmPhoto}
				className="w-full bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg h-16 rounded-xl text-xl"
				>
				<CheckCircle2 className="w-6 h-6 mr-2" />
				Usar esta Foto
				</Button>

				<button
				onClick={retakePhoto}
				className="w-full h-16 bg-white border-3 border-orange-300 hover:border-orange-400 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
				>
				<RotateCcw className="w-6 h-6 text-amber-900" />
				<span className="text-amber-900 text-xl">Tirar Outra Foto</span>
				</button>
				</div>
				</>
				)}
				</div>

				{/* Canvas escondido para captura */}
				<canvas ref={canvasRef} className="hidden" />
				</div>
		);
}
