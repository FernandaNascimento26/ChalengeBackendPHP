### README

# Aplicação Laravel, React e Docker

## Descrição

Esta é uma aplicação Laravel configurada para rodar em contêineres Docker. A aplicação possui diferentes tipos de usuários (admin, gestor e usuário comum) e páginas específicas para cada tipo de usuário.

## Configurações

### Pré-requisitos

- Docker
- Docker Compose

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure suas variáveis de ambiente conforme necessário. Um exemplo de configuração pode ser encontrado no arquivo `.env.example`.

3. **Construa e inicie os contêineres:**
   ```bash
   docker-compose up --build
   ```

4. **Instale as dependências do Laravel e configure a aplicação:**
   ```bash
   docker-compose exec app composer install
   docker-compose exec app php artisan key:generate
   docker-compose exec app php artisan migrate
   docker-compose exec app php artisan db:seed
   ```

5. **Acesse a aplicação:**
   Abra o navegador e acesse `http://localhost:8000`.

## Páginas da Aplicação

- **Home**: Página inicial acessível por todos os usuários.
- **Login**: Página de login para todos os usuários.
- **Cadastro**: Página de registro para todos os usuários.
- **Perfil**: Página de perfil, acessível por todos os usuários logados.
- **Pagina1, Pagina2, Pagina3**: Páginas acessíveis por todos os usuários logados.
- **Admin**: Página de administração, acessível apenas para usuários do tipo admin.
- **Gestor**: Página de gestão, acessível apenas para usuários do tipo gestor.

## Regras de Acesso

- **Usuário Comum**: Pode acessar as páginas Perfil, Pagina1, Pagina2, Pagina3.
- **Gestor**: Pode acessar as páginas Perfil, Pagina1, Pagina2, Pagina3, e Gestor.
- **Admin**: Pode acessar as páginas Perfil, Pagina1, Pagina2, Pagina3, e Admin.

## Passo a Passo para Testar um Usuário

### Registro de um Novo Usuário

1. Acesse a página de registro: `http://localhost:8000/register`
2. Preencha os campos de nome, email, senha e tipo de usuário (admin, gestor, ou usuário comum).
3. Clique no botão "Register".

### Login

1. Acesse a página de login: `http://localhost:8000/login`
2. Insira o email e a senha do usuário cadastrado.
3. Clique no botão "Login".

### Acesso às Páginas

- Após o login, você será redirecionado para a página de perfil.
- Navegue para outras páginas usando o menu.
- Tente acessar as páginas AdminPage e ManagerPage para verificar as regras de acesso.


### Teste de Funcionalidades Gerais

1. Faça login como usuário comum.
2. Navegue pelas páginas Profile, Page1, Page2, e Page3 para verificar o acesso.
3. Tente acessar AdminPage e ManagerPage para garantir que o acesso é negado.

## Estrutura do Projeto

- `Dockerfile`: Arquivo de configuração para construção da imagem Docker.
- `docker-compose.yml`: Arquivo de configuração do Docker Compose para orquestração dos contêineres.
- `php.ini`: Arquivo de configuração PHP.
- `nginx.conf`: Arquivo de configuração do servidor Nginx.

## Funcionalidades adicionais que foram implementadas incluem:

1. **Logout Funcional**:
   - Adicionada a funcionalidade de logout para que os usuários possam sair da aplicação de forma segura.

2. **Verificação de Autorização em Tempo Real**:
   - Adicionada a verificação de autorização para acessar certas páginas. Quando um usuário não autorizado tenta acessar uma página restrita, ele é redirecionado para uma página de "não autorizado".

3. **CRUD do Usuário Logado no Perfil**:
   - Implementada a funcionalidade de CRUD (Create, Read, Update) para o usuário logado na página de perfil. O usuário pode ver e atualizar suas próprias informações diretamente no perfil.

4. **Interface Centralizada e Melhorada**:
   - Ajustes no CSS para centralizar elementos e melhorar a estética geral da interface do usuário.

5. **Migração e Configuração de Banco de Dados Específicas**:
   - Criada uma migração específica para adicionar o campo `user_type` na tabela `users`, permitindo a classificação dos usuários em diferentes tipos (admin, gestor, usuário comum).

6. **Menu Dinâmico**:
   - Adicionado um menu dinâmico que mostra ou esconde opções de acordo com o tipo de usuário logado, melhorando a navegação e a experiência do usuário.

7. **Mensagens de Erro Personalizadas**:
   - Adicionadas mensagens de erro personalizadas e mais amigáveis, especialmente durante o login e o registro (email ja cadastrado, senha incorreta, senha curta e etc.), para melhorar a usabilidade e fornecer feedback mais claro ao usuário.

