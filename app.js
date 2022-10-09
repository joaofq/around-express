const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(404).send('O front-end ainda não está conectado...');
});

app.use('/', users, cards);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}.`);
});
