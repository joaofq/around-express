const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const cardsFilePath = path.join(__dirname, "../data/cards.json");

router.get("/cards", (req, res) => {
  fs.readFile(cardsFilePath, { encoding: "utf8" }, (err, data) => {
    if (err) throw err;
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = router;
