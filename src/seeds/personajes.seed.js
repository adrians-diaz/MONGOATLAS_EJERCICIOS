const mongoose = require("mongoose");
const characters = require("../api/models/personajes.model");

//Vamos a definir un array de peliculas que se ciñan al modelo videoGame
const personaje = [
  {
    name: "Gibraltar",
    rol: "tanque",
    game: "apex",
    img:
      "https://media.contentapi.ea.com/content/dam/apex-legends/common/legends/apex-section-bg-legends-gibraltar-xl.jpg.adapt.320w.jpg",
  },
  {
    name: "Octane",
    rol: "Asalto",
    game: "apex",
    img: "https://media.contentapi.ea.com/content/dam/apex-legends/images/2019/01/legends-character-tiles/apex-grid-tile-legends-octane.png.adapt.crop16x9.1023w.png",
  },
  {
    name: "Valkyria",
    rol: "Reconocimiento",
    game: "apex",
    img: "https://media.contentapi.ea.com/content/dam/apex-legends/common/legends/valkyrie/apex-section-bg-legends-valkyrie-xl.jpg.adapt.320w.jpg",
  },
  {
    name: "Caitlyn",
    rol: "AD Carry",
    game: "lol",
    img: "https://64.media.tumblr.com/f8b70fcdfb5ecc8f7fe923e286dd5773/0731a61f7a98edb6-97/s500x750/607118106e0e9ceace78fe8a2b7a93f903089b8c.png",
  },
  {
    name: "Lux",
    rol: "Support",
    game: "lol",
    img: "https://support-wildrift.riotgames.com/hc/article_attachments/360104660413/WR_LuxTrial_EventArticle_Banner.jpg",
  }
];

//Con este mapeo creo muchas peliculas del tipo peliculas recorriendo el array de objetos que he definido
const charactersDocuments = personaje.map((character) => new characters(character));

//Vamos a realizar la conexión con MONGO para insertar los documentos
mongoose
  .connect("mongodb://localhost:27017/videojuegos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    //Mediante el metodo find obtendremos un array con todas las peliculas de mi base de datos
    const allGames = await characters.find();
    //Si videoGame tiene longitud borraremos la coleccion entera
    if (allGames.length) {
      await characters.collection.drop();
      console.log("personajes DB deleted")
    }
  })
  .catch((error) => console.log("Error deleting personajes", error))
  //Si no hay peliculas me insertas cuantas tengas en videoGame
  .then(async () => {
    await characters.insertMany(charactersDocuments);
    console.log("personajes DB created")
  })
  .catch((error) => console.log("Error creating personajes", error))
  //Al final del todo nos desconectamos de mongoose
  .finally(() => mongoose.disconnect());
