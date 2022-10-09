const router = require("express").Router();
const fs = require("fs").promises;
const path = require("path");

const cardsFilePath = path.join(__dirname, "../data/cards.json");

router.get("/cards", (req, res) => {
  fs.readFile(cardsFilePath, { encoding: "utf8" })
    .then((data) => {
      const cardsList = JSON.parse(data);
      res.send(cardsList);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
