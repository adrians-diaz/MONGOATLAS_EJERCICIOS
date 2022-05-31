const { deleteFile } = require("../../middlewares/deleteFile.js");
const bestiario = require("../models/bestiario.model.js");
const HTTPSTATUSCODE = require("../../util/httpStatusCode");

const getAllBestias = async (req, res, next) => {
  try {
    //Con el populate desgranamos la información del campo videogames ya que es un array de ids de mongo, por lo tanto se me va a pintar la información de cada uno de los objetos correspondientes a esos ids.
    const allBestias = await bestiario.find().populate("relato");
    return res.json({
      status: 200,
      message: "Bestias OK",
      consoles: allBestias,
    });
  } catch (error) {
    return next(error);
  }
};

const getBestiasByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bestiasByID = await bestiario.findById(id);
    return res.json({
      status: 200,
      message: "bestia OK",
      console: bestiasByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createBestias = async (req, res, next) => {
  try {
    const newBestias = new bestiario(req.body);
    if(req.file){
        newBestias.image = req.file.path; 
    }
    const createdBestias = await newBestias.save();
    return res.json({
      status: HTTPSTATUSCODE[200],
      message: "Bestias created",
      console: createdBestias,
    });
  } catch (error) {
    return next(error);
  }
};

const patchBestias = async (req, res, next) => {

    try {

        const { id } = req.params;

        const patchBestias = new bestiario(req.body);
        

        patchBestias._id = id;
            
            const bestiasByID = await bestiario.findById(id);
            patchBestias.relato = [...bestiasByID.relato, ...patchBestias.relato];

            console.log(patchBestias);
            const BestiasDB = await bestiario.findByIdAndUpdate(id, patchBestias);

            
            if(req.file){
                patchBestias.image = req.file.path; 
            }

            if(BestiasDB.image){
                deleteFile(BestiasDB.image);
            }

        return res.status(200).json({ nuevo: patchBestias, vieja: BestiasDB})
        
    } catch (error) {
        return next(error)
    }

}

module.exports = { getAllBestias, getBestiasByID, createBestias, patchBestias };