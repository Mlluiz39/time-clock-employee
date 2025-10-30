# 🕐 Sistema de Ponto Eletrônico com QR Code

Sistema moderno e eficiente de controle de ponto eletrônico, utilizando QR Codes para registro rápido e seguro. Interface otimizada para smartphones e tablets.

## 🚀 Funcionalidades

### 📱 Para Funcionários

- **Registro Rápido**: Escaneia QR Code e registra ponto em segundos
- **Interface Intuitiva**: Cards coloridos e busca facilitada
- **Confirmação Visual**: Feedback imediato após registro
- **Responsivo**: Funciona perfeitamente em qualquer dispositivo

### 👨‍💼 Para Administradores

- **Gestão de Funcionários**: Cadastro completo com matrícula, nome e departamento
- **Geração de QR Codes**: Crie códigos personalizados para cada portaria
- **Relatórios em Tempo Real**: Visualize todos os registros instantaneamente
- **Painel Completo**: Três abas organizadas (Funcionários, QR Code, Registros)

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS
- **Componentes**: shadcn/ui + Radix UI
- **Backend**: Supabase (PostgreSQL)
- **Estado**: TanStack Query (React Query)
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form + Zod
- **QR Code**: qrcode.react
- **Notificações**: Sonner
- **Data**: date-fns

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase

### Passo a Passo

1. **Clone o repositório**

```bash
git clone <seu-repositorio>
cd vite_react_shadcn_ts
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o Supabase**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
```

4. **Configure o banco de dados**

Execute os seguintes comandos SQL no Supabase:

```sql
-- Tabela de funcionários
CREATE TABLE employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de registros
CREATE TABLE records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE,
  employee_name TEXT NOT NULL,
  department TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_records_employee_id ON records(employee_id);
CREATE INDEX idx_records_date ON records(date);
CREATE INDEX idx_employees_employee_id ON employees(employee_id);
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── admin/
│   │   ├── EmployeesTab.tsx    # Gestão de funcionários
│   │   ├── QRCodeTab.tsx        # Geração de QR Codes
│   │   └── RecordsTab.tsx       # Visualização de registros
│   ├── registro/
│   │   ├── EmployeeCard.tsx     # Card de funcionário
│   │   └── SuccessScreen.tsx    # Tela de sucesso
│   └── ui/                       # Componentes shadcn/ui
├── pages/
│   ├── Index.tsx                 # Página inicial
│   ├── Admin.tsx                 # Painel administrativo
│   ├── Registro.tsx              # Página de registro
│   └── NotFound.tsx              # Página 404
├── integrations/
│   └── supabase/                 # Cliente e tipos do Supabase
├── hooks/                        # Custom hooks
├── lib/                          # Utilitários
└── App.tsx                       # Componente principal
```

## 🎨 Customização

### Cores e Temas

As cores são definidas em `src/index.css`. Principais variáveis:

```css
/* Painel Admin - Gradiente Escuro Elegante */
--admin-bg-from: 222 47% 11%;
--admin-bg-to: 215 28% 17%;

/* Painel de Registro - Gradiente Vibrante */
--registro-bg-from: 254 72% 64%;
--registro-bg-to: 277 64% 61%;

/* Cards de Funcionários - Gradientes Coloridos */
--card-blue-from/to
--card-green-from/to
--card-purple-from/to
--card-pink-from/to
--card-yellow-from/to
```

### Adicionar Novos Campos

Para adicionar campos aos funcionários, edite:

1. Esquema do Supabase (adicione colunas)
2. Interface TypeScript em `src/integrations/supabase/types.ts`
3. Formulário em `src/components/admin/EmployeesTab.tsx`

## 🔒 Segurança

### Row Level Security (RLS) no Supabase

Configure políticas de segurança:

```sql
-- Habilitar RLS
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (ajuste conforme necessário)
CREATE POLICY "Allow public read" ON employees FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON records FOR SELECT USING (true);

-- Permitir inserção pública para registros
CREATE POLICY "Allow public insert" ON records FOR INSERT WITH CHECK (true);
```

⚠️ **Importante**: Ajuste as políticas conforme suas necessidades de segurança!

## 📱 Uso do Sistema

### Para Administradores

1. Acesse `/admin`
2. **Aba Funcionários**:
   - Cadastre novos funcionários
   - Visualize e exclua funcionários existentes
3. **Aba QR Code**:
   - Personalize o nome da localização
   - Baixe o QR Code em PNG
   - Imprima e cole na portaria
4. **Aba Registros**:
   - Acompanhe registros em tempo real
   - Filtre por data, funcionário, etc.

### Para Funcionários

1. Escaneie o QR Code com a câmera do celular
2. Acesse a página `/registro`
3. Use a busca para encontrar seu nome
4. Clique no seu card
5. Confirmação instantânea!

## 🐛 Troubleshooting

### Erro de conexão com Supabase

- Verifique as variáveis de ambiente no `.env`
- Confirme que o projeto Supabase está ativo

### QR Code não funciona

- Certifique-se que a URL está correta
- Teste a URL manualmente no navegador

### Registros não aparecem

- Verifique as políticas RLS no Supabase
- Confira o console do navegador para erros

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através do e-mail.

---

Desenvolvido com ❤️ usando React + TypeScript + Supabase
