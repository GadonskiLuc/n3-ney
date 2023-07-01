const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conectando ao banco de dados MongoDB
mongoose.connect('mongodb+srv://gadonskiluc:Lucas3006@trabalhoney.3y4jvoi.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
  });

// Definindo as rotas da API
// Implemente as operações CRUD e as consultas conforme necessário
const prestadorRoutes = require('./prestadorRoutes');
app.use('/api', prestadorRoutes);


// Iniciando o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
