import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, UserPlus, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Employee {
  id: string;
  employee_id: string;
  name: string;
  department: string;
}

export const EmployeesTab = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    department: "",
  });

  const { data: employees, isLoading, refetch } = useQuery({
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

  const createMutation = useMutation({
    mutationFn: async (newEmployee: typeof formData) => {
      const { data, error } = await supabase
        .from("employees")
        .insert([newEmployee])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employees-count"] });
      setFormData({ employee_id: "", name: "", department: "" });
      toast.success("Funcionário cadastrado com sucesso!");
    },
    onError: (error: any) => {
      if (error.code === "23505") {
        toast.error("Matrícula já cadastrada!");
      } else {
        toast.error("Erro ao cadastrar funcionário");
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("employees").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employees-count"] });
      toast.success("Funcionário excluído com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao excluir funcionário");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employee_id || !formData.name || !formData.department) {
      toast.error("Preencha todos os campos!");
      return;
    }

    createMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <Card className="border-white/20 bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Cadastrar Novo Funcionário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="employee_id">Matrícula *</Label>
                <Input
                  id="employee_id"
                  value={formData.employee_id}
                  onChange={(e) =>
                    setFormData({ ...formData, employee_id: e.target.value })
                  }
                  placeholder="001"
                />
              </div>
              <div>
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="João Silva"
                />
              </div>
              <div>
                <Label htmlFor="department">Departamento *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  placeholder="TI"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Cadastrando..." : "Cadastrar Funcionário"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <Card className="border-white/20 bg-white/95 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Funcionários Cadastrados</CardTitle>
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground">Carregando...</p>
          ) : employees?.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum funcionário cadastrado</p>
          ) : (
            <div className="space-y-3">
              {employees?.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                >
                  <div>
                    <p className="font-semibold">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Matrícula: {employee.employee_id} • {employee.department}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir {employee.name}? Todos os registros de ponto deste funcionário também serão excluídos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate(employee.id)}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};