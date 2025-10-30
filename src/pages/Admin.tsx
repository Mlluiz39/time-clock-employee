import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, QrCode, ClipboardList } from "lucide-react";
import { EmployeesTab } from "@/components/admin/EmployeesTab";
import { QRCodeTab } from "@/components/admin/QRCodeTab";
import { RecordsTab } from "@/components/admin/RecordsTab";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("employees");

  const { data: employeesCount } = useQuery({
    queryKey: ["employees-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("employees")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: recordsCount } = useQuery({
    queryKey: ["records-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("records")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  return (
    <div className="min-h-screen bg-admin-gradient p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Painel Administrativo
          </h1>
          <p className="text-white/80 text-lg">
            Gerencie funcionários e registros de ponto
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10 backdrop-blur-lg border border-white/20">
            <TabsTrigger
              value="employees"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary"
            >
              <Users className="w-4 h-4 mr-2" />
              Funcionários ({employeesCount || 0})
            </TabsTrigger>
            <TabsTrigger
              value="qrcode"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary"
            >
              <QrCode className="w-4 h-4 mr-2" />
              QR Code
            </TabsTrigger>
            <TabsTrigger
              value="records"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary"
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              Registros ({recordsCount || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="animate-fade-in">
            <EmployeesTab />
          </TabsContent>

          <TabsContent value="qrcode" className="animate-fade-in">
            <QRCodeTab />
          </TabsContent>

          <TabsContent value="records" className="animate-fade-in">
            <RecordsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;