import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Clock, Search, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EmployeeCard } from "@/components/registro/EmployeeCard";
import { SuccessScreen } from "@/components/registro/SuccessScreen";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Employee {
  id: string;
  employee_id: string;
  name: string;
  department: string;
}

const Registro = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [successData, setSuccessData] = useState<{
    name: string;
    time: string;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Employee[];
    },
  });

  const filteredEmployees = employees?.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employee_id.includes(searchTerm) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterPoint = async (employee: Employee) => {
    try {
      const now = new Date();
      const { error } = await supabase.from("records").insert({
        employee_id: employee.employee_id,
        employee_name: employee.name,
        department: employee.department,
        date: format(now, "dd/MM/yyyy"),
        time: format(now, "HH:mm:ss"),
        location: "Portaria Principal",
      });

      if (error) throw error;

      setSuccessData({
        name: employee.name,
        time: format(now, "HH:mm:ss"),
      });

      setTimeout(() => {
        setSuccessData(null);
        setSearchTerm("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
      toast.error("Erro ao registrar ponto. Tente novamente.");
    }
  };

  if (successData) {
    return <SuccessScreen name={successData.name} time={successData.time} />;
  }

  return (
    <div className="min-h-screen bg-registro-gradient p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-12 h-12 text-white animate-pulse-slow" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Registrar Ponto
            </h1>
          </div>
          
          <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 mb-6">
            <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-mono">
              {format(currentTime, "HH:mm:ss")}
            </div>
            <div className="text-xl text-white/90">
              {format(currentTime, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 animate-slide-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nome, matrícula ou departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg bg-white/95 backdrop-blur border-white/50 focus:border-white"
            />
          </div>
        </div>

        {/* Employees List */}
        {isLoading ? (
          <div className="text-center text-white text-xl">Carregando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
            {filteredEmployees?.map((employee, index) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                index={index}
                onClick={() => handleRegisterPoint(employee)}
              />
            ))}
          </div>
        )}

        {filteredEmployees?.length === 0 && (
          <div className="text-center text-white text-xl bg-white/20 backdrop-blur-lg rounded-2xl p-8">
            Nenhum funcionário encontrado
          </div>
        )}
      </div>
    </div>
  );
};

export default Registro;