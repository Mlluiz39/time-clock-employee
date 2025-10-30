import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

export const QRCodeTab = () => {
  const [location, setLocation] = useState("Portaria Principal");
  const registroUrl = `${window.location.origin}/registro`;

  const downloadQRCode = () => {
    const svg = document.getElementById("qrcode");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `qrcode-${location.replace(/\s+/g, "-").toLowerCase()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast.success("QR Code baixado com sucesso!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* QR Code Display */}
      <Card className="border-white/20 bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle>QR Code da Portaria</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-8 rounded-lg flex items-center justify-center">
            <QRCodeSVG
              id="qrcode"
              value={registroUrl}
              size={256}
              level="H"
              includeMargin
            />
          </div>

          <div>
            <Label htmlFor="location">Nome da Localização</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Portaria Principal"
              className="mt-2"
            />
          </div>

          <Button onClick={downloadQRCode} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Baixar QR Code como PNG
          </Button>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="border-white/20 bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Como Usar o Sistema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Cadastre os Funcionários</h4>
                <p className="text-sm text-muted-foreground">
                  Vá para a aba "Funcionários" e cadastre todos os colaboradores com matrícula, nome e departamento.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Baixe e Imprima o QR Code</h4>
                <p className="text-sm text-muted-foreground">
                  Clique no botão "Baixar QR Code" e imprima. Cole o QR Code na entrada da empresa.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Funcionários Escaneiam</h4>
                <p className="text-sm text-muted-foreground">
                  Funcionários escaneiam o QR Code com o celular e são direcionados para a página de registro.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold">Registro Automático</h4>
                <p className="text-sm text-muted-foreground">
                  Funcionário clica no seu nome e o ponto é registrado instantaneamente.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h4 className="font-semibold">Acompanhe em Tempo Real</h4>
                <p className="text-sm text-muted-foreground">
                  Veja todos os registros na aba "Registros" com atualização em tempo real.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm font-medium">🔗 URL de Registro:</p>
            <p className="text-xs text-muted-foreground break-all mt-1">
              {registroUrl}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};