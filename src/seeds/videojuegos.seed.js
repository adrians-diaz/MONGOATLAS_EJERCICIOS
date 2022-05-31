const mongoose = require("mongoose");
const videoGame = require("../api/models/videojuegos.model");

//Vamos a definir un array de peliculas que se ciñan al modelo videoGame
const videojuego = [
  {
    title: "Apex Legends",
    year: 2017,
    poster: "https://pngroyale.com/wp-content/uploads/2022/02/Apex-Legends-Logo-Free-PNG-Image.png",
    ranking: 1,
    collectio: "apex",

  },
  {
    title: "League of Legends",
    year: 2001,
    poster: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/640px-League_of_Legends_2019_vector.svg.png",
    ranking: 3,
    collectio: "lol"
  },
  {
    title: "Bioshock infinite",
    year: 2013,
    poster: "https://static.wikia.nocookie.net/bioshock/images/3/34/BioShock-Infinite-Logo.png/revision/latest?cb=20120806150221&path-prefix=es",
    ranking: 5,
    collectio: "bioshock"
  },
  {
    title: "The witcher",
    year: 2007,
    poster: "https://cdn.akamai.steamstatic.com/steam/apps/20900/capsule_616x353.jpg?t=1621939811",
    ranking: 1,
    collectio: "witcher"
  },
];

//Con este mapeo creo muchas peliculas del tipo peliculas recorriendo el array de objetos que he definido
const gamesDocuments = videojuego.map((game) => new videoGame(game));

//Vamos a realizar la conexión con MONGO para insertar los documentos
mongoose
  .connect("mongodb://localhost:27017/videojuegos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    //Mediante el metodo find obtendremos un array con todas las peliculas de mi base de datos
    const allGames = await videoGame.find();
    //Si videoGame tiene longitud borraremos la coleccion entera
    if (allGames.length) {
      await videoGame.collection.drop();
      console.log("Videojuegos DB deleted")
    }
  })
  .catch((error) => console.log("Error deleting videoGame", error))
  //Si no hay peliculas me insertas cuantas tengas en videoGame
  .then(async () => {
    await videoGame.insertMany(gamesDocuments);
    console.log("Videojuegos DB created")
  })
  .catch((error) => console.log("Error creating videoGame", error))
  //Al final del todo nos desconectamos de mongoose
  .finally(() => mongoose.disconnect());
