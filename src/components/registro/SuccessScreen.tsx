import { CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  name: string;
  time: string;
}

export const SuccessScreen = ({ name, time }: SuccessScreenProps) => {
  return (
    <div className="min-h-screen bg-registro-gradient flex items-center justify-center p-4">
      <div className="text-center animate-scale-in">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <CheckCircle2 className="w-32 h-32 text-white animate-pulse-slow" />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse-slow" />
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-lg border-2 border-white/30 rounded-3xl p-8 md:p-12 max-w-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ponto Registrado!
          </h1>
          
          <div className="space-y-3 text-white/90 text-lg">
            <p className="text-2xl font-semibold">{name}</p>
            <p className="text-xl">Horário: <span className="font-bold">{time}</span></p>
          </div>
          
          <p className="mt-6 text-white/70">
            Redirecionando...
          </p>
        </div>
      </div>
    </div>
  );
};