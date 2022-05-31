const mongoose = require("mongoose");

const videoGameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    year: {type: Number, required: false},
    poster: {type: String, required: true},
    ranking: {type: Number, required: false},
    collectio: {type: String, required: true},
},
{   
    timestamps: true
}
);
const videoGame = mongoose.model('videojuegos', videoGameSchema);

module.exports = videoGame;