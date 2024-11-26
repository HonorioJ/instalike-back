import express from 'express';
import routes from './src/routes/postsRoutes.js';

// **Importa as dependências necessárias:**
// - express: Framework web para Node.js, utilizado para criar o servidor.
// - conectarAoBanco: Função para estabelecer a conexão com o banco de dados (provavelmente MongoDB, considerando o contexto).

const app = express();
// **Cria uma instância do Express:**

app.use(express.static('uploads'))
// Torna pública a pasta designada (no caso, uploads) pra qualquer um na net conseguir acessar

// - Inicia o aplicativo Express, que será o ponto de partida para a criação das rotas e funcionalidades da aplicação.
routes(app);

app.listen(3000, () => {
  console.log('Servidor escutando...');
});
// **Inicia o servidor na porta 3000:**
// - O aplicativo Express começa a ouvir as requisições HTTP na porta 3000.
// - A mensagem "Servidor escutando..." é exibida no console quando o servidor está pronto.