# desafio-fullstack-saas-[seu-nome]

Este repositório contém o código para o teste técnico de desenvolvedor fullstack SAAS. O projeto consiste em um sistema de gerenciamento de tarefas e equipes com um fluxo simulado de assinatura de planos.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

- `frontend/`: Contém o código da aplicação web construída com React.
- `backend/`: Contém o código do servidor da aplicação (Assumindo que o backend está em uma pasta separada no mesmo nível do frontend. Se não for o caso, por favor, ajuste esta seção).

## Instalação e Configuração

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Clonar o Repositório

```bash
git clone <link-do-seu-repositorio>
cd desafio-fullstack-saas-[seunome]
```

### 2. Configuração do Backend

(Assumindo que o backend está na pasta `backend/`. Ajuste conforme a estrutura real do seu projeto.)

1.  Navegue até o diretório do backend:
    ```bash
    cd backend/
    ```
2.  Instale as dependências do backend:
    ```bash
    npm install # ou yarn install, pnpm install
    ```
3.  Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz da pasta `backend/` e copie o conteúdo de `.env.example`, preenchendo com suas configurações locais.
    ```bash
    cp .env.example .env
    # Edite o arquivo .env com as suas credenciais de banco de dados, etc.
    ```
4.  Configure o banco de dados.
    - Se você usa migrations, execute-as:
      ```bash
      npx prisma migrate dev # Exemplo usando Prisma
      # ou o comando de migration do seu ORM/ferramenta
      ```
    - Se você forneceu um dump SQL, importe-o para o seu banco de dados local.
      ```bash
      # Comando de importação SQL (exemplo para PostgreSQL com psql)
      psql -U seu_usuario -d seu_banco -f caminho/para/seu/dump.sql
      ```
    - Certifique-se de que a estrutura das tabelas `Users`, `Teams`, `Tasks`, `Plans`, `TeamMembers` e outras relacionadas ao desafio estejam corretas no seu banco.
5.  Inicie o servidor backend:
    ```bash
    npm run dev # ou o comando para iniciar o backend
    ```
    O backend deve rodar em `http://localhost:3001` (ou a porta configurada no seu `.env`).

### 3. Configuração do Frontend

(Assumindo que o frontend está na pasta `frontend/` e usa Vite/React. Ajuste conforme a tecnologia e estrutura real do seu projeto.)

1.  Navegue de volta para o diretório raiz e então para o frontend:
    ```bash
    cd ../frontend/
    ```
2.  Instale as dependências do frontend:
    ```bash
    npm install # ou yarn install, pnpm install
    ```
3.  Configure as variáveis de ambiente do frontend. Crie um arquivo `.env` na raiz da pasta `frontend/` e copie o conteúdo de `.env.example`, preenchendo com suas configurações locais.
    ```bash
    cp .env.example .env
    # Edite o arquivo .env com a URL da API do backend, etc.
    ```
    Certifique-se de que a variável para a URL da API (`VITE_API_BASE_URL` ou similar) aponte para o seu backend local (ex: `http://localhost:3001/api`).
4.  Inicie a aplicação frontend:
    ```bash
    npm run dev # ou yarn dev, pnpm dev
    ```
    O frontend deve rodar em `http://localhost:5173` (ou a porta padrão do Vite).

## Versões Utilizadas

- **Node.js**: `v20.17.0`
- **React**: `18.3.1`
- **Framework Backend**: `Express: 4.21.2`
- **Banco de Dados**: `[Nome e Versão do banco de dados, ex: PostgreSQL v14]`
- **ORM**: `[Nome e Versão do ORM, se utilizado, ex: Prisma v5.x, Sequelize v6.x]`
- **Outras dependências relevantes**: `[Liste outras bibliotecas/ferramentas importantes]`

## Demonstração Online (Opcional)

Se o projeto estiver hospedado online, inclua o link de acesso aqui.

- **Link da Aplicação**: `[Link para a aplicação online]`

## Fluxo de Planos (Conforme Instruções do Teste)

A lógica de planos implementada simula um sistema de assinatura básico. Existe uma tabela de "Planos" com opções (ex: Mensal, Anual). Quando o usuário escolhe um plano, este vínculo é registrado no banco de dados associado ao seu usuário. Não há integração real com gateways de pagamento ou cobranças.

---

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
│ ├── components/ # Componentes reutilizáveis
│ │ ├── Layout.jsx
│ │ ├── Sidebar.jsx
│ │ ├── Header.jsx
│ │ ├── LoadingSpinner.jsx
│ │ ├── TaskCard.jsx
│ │ └── TeamCard.jsx
│ ├── contexts/ # Contextos React
│ │ └── AuthContext.jsx
│ ├── pages/ # Páginas da aplicação
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Teams.jsx
│ │ ├── TeamDetail.jsx
│ │ ├── Tasks.jsx
│ │ ├── CreateTask.jsx
│ │ └── Profile.jsx
│ ├── services/ # Serviços de API
│ │ ├── api.js
│ │ ├── authService.js
│ │ ├── teamService.js
│ │ ├── taskService.js
│ │ └── userService.js
│ ├── hooks/ # Hooks customizados
│ ├── App.jsx # Componente principal
│ ├── main.jsx # Ponto de entrada
│ └── index.css # Estilos globais
├── public/ # Arquivos públicos
├── .env.example # Exemplo de variáveis
├── tailwind.config.js # Configuração Tailwind
├── vite.config.js # Configuração Vite
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

Edite o arquivo \`.env\`## 📱 Funcionalidades

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
