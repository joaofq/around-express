const router = require("express").Router();
const fs = require("fs").promises;
const path = require("path");

const usersFilePach = path.join(__dirname, "../data/users.json");

router.get("/users/:id", (req, res) => {
  fs.readFile(usersFilePach, { encoding: "utf8" })
    .then((data) => {
      const user = JSON.parse(data).find((obj) => obj._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: "ID do usuário não encontrado" });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/users", (req, res) => {
  fs.readFile(usersFilePach, { encoding: "utf8" })
    .then((data) => {
      const usersList = JSON.parse(data);
      res.send(usersList);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
