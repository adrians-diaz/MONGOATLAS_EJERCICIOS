const { json } = require("express/lib/response");
const videoGame = require("../models/videojuegos.model");


const getGamesByTitleCharacter = async (req, res) => {
    const title = req.params.title;
    try{
        const gamesByTitle = await videoGame.find({title: title});

        return res.status(200).json(charactersByTitle);
    } catch (error){
        return res.status(500).json(error);
    }
};

const getAllGames = async(req, res, next) =>{
    try {
        const allGames = await videoGame.find();
        return res.status(200).json(allGames);
    } catch (error){
        return res.status(500).json(error);
    }
}

const getGamesByID = async(req, res) =>{
    const id = req.params.id;
    try{
        const gamesByID = await videoGame.findById(id);
    return res.status(200).json(gamesByID);
    } catch (error){
        return res.status(500).json(error);
    }
}

const getGamesByTitle = async (req, res) => {
    const title = req.params.title;
    try{
        const gamesByTitle = await videoGame.find({title: title});
        return res.status(200).json(gamesByTitle);
    } catch (error){
        return res.status(500).json(error);
    }
};

const postNewGames = async (req, res, next) => {

    try {

        /* console.log(req.body.titulo); */

        const newGame = new videoGame(req.body);

        const gameDB = await newGame.save();

        return res.status(200).json(gameDB);
        
    } catch (error) {
        return next(error);
    }

}

const deleteGame = async (req, res, next) => {

    try {

        const { id } = req.params;

        const gameBorrada = await videoGame.findByIdAndDelete(id)

        return res.status(200).json(peliculaBorrada);
        
    } catch (error) {
        return next(error)
    }

}

const patchGame = async (req, res, next) => {

    try {

        const { id } = req.params;

        const patchGame = new videoGame(req.body);

        patchGame._id = id;

        const GameDB = await videoGame.findByIdAndUpdate(id, patchGame);

        return res.status(200).json({ nuevo: patchGame, vieja: GameDB})
        
    } catch (error) {
        return next(error)
    }

}

module.exports = {getAllGames, getGamesByID, getGamesByTitle, postNewGames, deleteGame, patchGame, getGamesByTitleCharacter};