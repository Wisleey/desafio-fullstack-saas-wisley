# Frontend - Sistema de Gestão de Tarefas com Times

Frontend desenvolvido com React.js e Tailwind CSS para o sistema de gestão de tarefas em equipe.

## 🛠️ Tecnologias

- **React.js** - Biblioteca JavaScript para interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **React Hot Toast** - Notificações
- **Lucide React** - Ícones
- **Vite** - Build tool

## 📁 Estrutura do Projeto

\`\`\`
frontend/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── TaskCard.jsx
│   │   └── TeamCard.jsx
│   ├── contexts/          # Contextos React
│   │   └── AuthContext.jsx
│   ├── pages/             # Páginas da aplicação
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Teams.jsx
│   │   ├── TeamDetail.jsx
│   │   ├── Tasks.jsx
│   │   ├── CreateTask.jsx
│   │   └── Profile.jsx
│   ├── services/          # Serviços de API
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── teamService.js
│   │   ├── taskService.js
│   │   └── userService.js
│   ├── hooks/             # Hooks customizados
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Ponto de entrada
│   └── index.css          # Estilos globais
├── public/                # Arquivos públicos
├── .env.example           # Exemplo de variáveis
├── tailwind.config.js     # Configuração Tailwind
├── vite.config.js         # Configuração Vite
├── package.json
└── README.md
\`\`\`

## 🚀 Como Executar

### 1. Instalar dependências
\`\`\`bash
npm install
\`\`\`

### 2. Configurar variáveis de ambiente
\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo \`.env\` com suas configurações:

\`\`\`env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME="Task Management System"
VITE_APP_VERSION="1.0.0"
\`\`\`

### 3. Executar a aplicação
\`\`\`bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
\`\`\`

A aplicação estará rodando em \`http://localhost:3000\`

## 📱 Funcionalidades

### Autenticação
- ✅ Login com email e senha
- ✅ Cadastro de novos usuários
- ✅ Logout
- ✅ Proteção de rotas
- ✅ Persistência de sessão

### Dashboard
- ✅ Visão geral das atividades
- ✅ Estatísticas de times e tarefas
- ✅ Tarefas recentes do usuário
- ✅ Acesso rápido a funcionalidades

### Gerenciamento de Times
- ✅ Listagem de times
- ✅ Criação de novos times
- ✅ Visualização de detalhes do time
- ✅ Adição de membros por email
- ✅ Remoção de membros

### Gerenciamento de Tarefas
- ✅ Listagem de tarefas
- ✅ Criação de novas tarefas
- ✅ Atribuição a membros do time
- ✅ Atualização de status
- ✅ Filtros por status e time
- ✅ Visualização de tarefas atribuídas

### Interface
- ✅ Design responsivo
- ✅ Sidebar de navegação
- ✅ Header com busca e perfil
- ✅ Cards informativos
- ✅ Notificações toast
- ✅ Loading states
- ✅ Formulários validados

## 🎨 Design System

### Cores
- **Primary**: Azul (#3b82f6)
- **Gray**: Escala de cinzas
- **Success**: Verde
- **Warning**: Amarelo
- **Danger**: Vermelho

### Componentes
- **Buttons**: Variações primary, secondary, outline, danger
- **Cards**: Container padrão para conteúdo
- **Inputs**: Campos de formulário estilizados
- **Badges**: Indicadores de status
- **Loading**: Spinners para estados de carregamento

## 🔒 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação:

- Token armazenado no localStorage
- Interceptor Axios para adicionar token automaticamente
- Redirecionamento automático em caso de token expirado
- Context API para gerenciar estado de autenticação

## 📊 Gerenciamento de Estado

- **Context API**: Autenticação global
- **React Hook Form**: Formulários
- **Local State**: Estados de componentes
- **Axios Interceptors**: Tratamento de erros HTTP

## 🧪 Scripts Disponíveis

- \`npm run dev\` - Executar em modo desenvolvimento
- \`npm run build\` - Build para produção
- \`npm run preview\` - Preview da build
- \`npm run lint\` - Linting do código

## 📱 Responsividade

A aplicação é totalmente responsiva com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuração de Produção

1. Configure as variáveis de ambiente de produção
2. Execute o build: \`npm run build\`
3. Sirva os arquivos da pasta \`dist\`

## 📝 Notas Importantes

- Todas as rotas são protegidas exceto login/register
- Formulários possuem validação client-side
- Notificações toast para feedback do usuário
- Loading states em todas as operações assíncronas
- Tratamento de erros HTTP centralizado
