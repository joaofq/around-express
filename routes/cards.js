const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');
//const fs = require('fs').promises;
//const path = require('path');

//const cardsFilePath = path.join(__dirname, '../data/cards.json');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

// router.get('/cards', (req, res) => {
//   fs.readFile(cardsFilePath, { encoding: 'utf8' })
//     .then((data) => {
//       const cardsList = JSON.parse(data);
//       res.send(cardsList);
//     })
//     .catch((err) => {
//       res
//         .status(404)
//         .send({ message: `A solicitação não foi encontrada: ${err}` });
//     });
// });

module.exports = router;
