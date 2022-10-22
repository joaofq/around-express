const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: 'Erro' });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Id não encontrado');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        res.status(ERROR_CODE).send({ message: 'Usuário não encontrado' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: 'Dados inválidos' });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
};

//Como faço a testagem do updateUser e updateAvater no Postman
// Não to conseguindo passar o req.user_id pelo postman.????

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'validationError') {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message: 'Dados inválidos',
        });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 400) {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message: 'Dados inválidos',
        });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: 'Erro' });
      }
    });
};
