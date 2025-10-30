import { Button } from "@/components/ui/button";
import { Clock, Users, QrCode, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-admin-gradient">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="w-16 h-16 text-white animate-pulse-slow" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Ponto Eletrônico
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Sistema moderno de controle de ponto com QR Code. Rápido, seguro e eficiente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/admin")}
              className="text-lg px-8 py-6 bg-white text-secondary hover:bg-white/90"
            >
              <Users className="w-5 h-5 mr-2" />
              Acessar Painel Admin
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/registro")}
              className="text-lg px-8 py-6 border-2 border-white text-black hover:bg-white/10"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Registrar Ponto
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-slide-up">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Registro Rápido</h3>
            <p className="text-white/70">
              Registre o ponto em segundos com apenas um clique. Interface otimizada para smartphones.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">QR Code Inteligente</h3>
            <p className="text-white/70">
              Gere QR Codes para cada portaria. Funcionários escaneiam e acessam direto do celular.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tempo Real</h3>
            <p className="text-white/70">
              Acompanhe todos os registros em tempo real. Atualizações instantâneas no painel administrativo.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Como Funciona
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Cadastre os Funcionários</h4>
                <p className="text-white/70">
                  Acesse o painel administrativo e cadastre todos os colaboradores com nome, matrícula e departamento.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Gere o QR Code</h4>
                <p className="text-white/70">
                  Crie QR Codes personalizados para cada portaria e imprima para colar nas entradas.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-white">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Registre o Ponto</h4>
                <p className="text-white/70">
                  Funcionários escaneiam o QR Code, buscam seu nome e registram o ponto instantaneamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;