const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(404).send('O front-end ainda não está conectado..');
});

app.use('/', users, cards);

app.use((req, res, next) => {
  req.user = {
    _id: '63531bdd2a2079149cbd2f0c', // cole o _id do usuário teste criado no passo anterior
  };

  next();
});

app.get('*', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}.`);
});
