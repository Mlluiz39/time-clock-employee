import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, MapPin } from "lucide-react";

interface Record {
  id: string;
  employee_name: string;
  employee_id: string;
  department: string;
  date: string;
  time: string;
  location: string;
  created_at: string;
}

export const RecordsTab = () => {
  const queryClient = useQueryClient();

  const { data: records, isLoading, refetch } = useQuery({
    queryKey: ["records"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("records")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Record[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("records-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "records",
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["records"] });
          queryClient.invalidateQueries({ queryKey: ["records-count"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return (
    <Card className="border-white/20 bg-white/95 backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Registros de Ponto</CardTitle>
        <Button variant="outline" size="icon" onClick={() => refetch()}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-center text-muted-foreground">Carregando...</p>
        ) : records?.length === 0 ? (
          <p className="text-center text-muted-foreground">Nenhum registro encontrado</p>
        ) : (
          <div className="space-y-3">
            {records?.map((record) => (
              <div
                key={record.id}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-all animate-fade-in"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">{record.employee_name}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span>Matrícula: {record.employee_id}</span>
                      <span>•</span>
                      <span>{record.department}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{record.date}</span>
                      <span>às</span>
                      <span className="font-bold">{record.time}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-full">
                      <MapPin className="w-4 h-4" />
                      <span>{record.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};