const express = require("express");

const router = express.Router();

const {getAllGames, getGamesByID, getGamesByTitle, postNewGames, deleteGame, patchGame, getGamesByTitleCharacter} = require("../controllers/videojuegos.controller");

router.get("/", getAllGames);
router.get("/id/:id", getGamesByID);
router.get("/title/:title", getGamesByTitle);
router.post('/', postNewGames);
router.delete('/:id', deleteGame);
router.patch('/:id', patchGame);
router.get('/titlePersonaje/:title', getGamesByTitleCharacter);

module.exports = router;