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
  return User.findById({ _id: req.params._id })
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

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
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

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
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
