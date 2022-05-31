const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");

//Requerimos la depencia bcrypt para encriptar y desencriptar la contraseña
const bcrypt = require("bcrypt");
//Requirimos la dependencia jsonwebtoken para gestionar los tokens
const jwt = require("jsonwebtoken");

dotenv.config();

const relatosRoutes = require("./src/api/routes/relatos.routes");
const bestiarioRoutes = require("./src/api/routes/bestiario.routes");
const userRouter = require("./src/api/routes/users.routes");


const {connect} = require("./src/util/database");
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET

const server = express();

//----Con esta función Express transformará los datos a JSON para poder tratarlos
server.use(express.json());
//----Con esta función Express no codifica caracteres reservados en la URI.
server.use(express.urlencoded({ extended: false }));

//USAMOS MORGAN PARA PODER VER UN LOG DE LAS PETICIONES QUE REALIZAMOS CUANDO ESTEMOS BAJO EL SCRIPT DEV
server.use(logger("dev"))

server.set("secretKey", JWT_SECRET)



const cloudinary = require("cloudinary").v2;
connect()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,    
});



//CONFIGURAMOS LOS HEADERS
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

//CONFIGURAMOS LAS CORS (Aquí definimos quien puede hacer peticiones a mi servidor)
server.use(cors({
    origin: "*",
    credentials: true
}))



server.use("/relatos", relatosRoutes);
server.use("/bestias", bestiarioRoutes);
server.use("/users", userRouter);

server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})