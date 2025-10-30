-- Criar tabela de funcionários
CREATE TABLE IF NOT EXISTS public.employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text UNIQUE NOT NULL,
  name text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de registros de ponto
CREATE TABLE IF NOT EXISTS public.records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id text NOT NULL,
  employee_name text NOT NULL,
  department text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  date text NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON DELETE CASCADE
);

-- Habilitar RLS
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para permitir acesso público (para teste)
CREATE POLICY "Permitir SELECT público em employees"
  ON public.employees FOR SELECT
  USING (true);

CREATE POLICY "Permitir INSERT público em employees"
  ON public.employees FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir UPDATE público em employees"
  ON public.employees FOR UPDATE
  USING (true);

CREATE POLICY "Permitir DELETE público em employees"
  ON public.employees FOR DELETE
  USING (true);

CREATE POLICY "Permitir SELECT público em records"
  ON public.records FOR SELECT
  USING (true);

CREATE POLICY "Permitir INSERT público em records"
  ON public.records FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir UPDATE público em records"
  ON public.records FOR UPDATE
  USING (true);

CREATE POLICY "Permitir DELETE público em records"
  ON public.records FOR DELETE
  USING (true);

-- Habilitar realtime para registros
ALTER PUBLICATION supabase_realtime ADD TABLE public.records;

-- Inserir funcionários de exemplo
INSERT INTO public.employees (employee_id, name, department) VALUES
  ('001', 'João Silva', 'TI'),
  ('002', 'Maria Santos', 'RH'),
  ('003', 'Pedro Costa', 'Financeiro'),
  ('004', 'Ana Oliveira', 'Marketing');

-- Inserir registro de exemplo
INSERT INTO public.records (employee_id, employee_name, department, date, time, location) VALUES
  ('001', 'João Silva', 'TI', '01/01/2024', '08:30:00', 'Portaria Principal');