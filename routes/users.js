const router = require("express").Router();
//const fs = require("fs").promises;
const fs = require("fs");
const path = require("path");
const usersFilePach = path.join(__dirname, "../data/users.json");

/*
Fala Thiago! Blz?
Estou fazendo o Projeto 12 e fiquei na dúvida sobre qual melhor prática de usar o FS.
Preciso tratar a requisição do cliente, lendo a lista de usuários que está no servidor (fs.readfile) e respondendo com o usuário definido pelo req.params.id.
Vi que dá fazer com o fs puro, mas tem muita gente que usa promises no fs.
To testando a qui esses dois códigos e dá no mesmo resultado. Qual a forma mais recomendada?

*/

router.get("/users/:id", (req, res) => {
  fs.readFile(usersFilePach, { encoding: "utf8" }, (err, data) => {
    if (err) throw err;
    const user = JSON.parse(data).find((obj) => obj._id === req.params.id);
    if (!user) {
      res.status(404).send({ message: "ID do usuário não encontrado" });
    } else {
      res.send(user);
    }
  });
});

// router.get("/users/:id", (req, res) => {
//   fs.readFile(usersFilePach, { encoding: "utf8" })
//     .then((data) => {
//       const user = JSON.parse(data).find((obj) => obj._id === req.params.id);
//       if (!user) {
//         res.status(404).send({ message: "ID do usuário não encontrado" });
//       } else {
//         res.send(user);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.get("/users", (req, res) => {
  fs.readFile(usersFilePach, { encoding: "utf8" }, (err, data) => {
    if (err) throw err;
    const userList = JSON.parse(data);
    res.send(userList);
  });
});

// router.get("/users", (req, res) => {
//   fs.readFile(usersFilePach, { encoding: "utf8" })
//     .then((data) => {
//       const usersList = JSON.parse(data);
//       res.send(usersList);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
