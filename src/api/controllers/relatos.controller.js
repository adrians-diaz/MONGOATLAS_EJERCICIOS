const relato = require("../models/relatos.models.js");
const HTTPSTATUSCODE = require("../../util/httpStatusCode");

const getAllRelatos = async (req, res, next) => {
  try {
    //Con el populate desgranamos la información del campo videogames ya que es un array de ids de mongo, por lo tanto se me va a pintar la información de cada uno de los objetos correspondientes a esos ids.
    const allRelatos = await relato.find().populate("Relatos");
    return res.json({
      status: 200,
      message: "Relatos OK",
      consoles: allRelatos,
    });
  } catch (error) {
    return next(error);
  }
};

const getRelatosByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const RelatosByID = await relato.findById(id);
    return res.json({
      status: 200,
      message: "Relatos OK",
      console: RelatosByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createRelatos = async (req, res, next) => {
  try {
    const newRelatos = new relato(req.body);
    const createdRelatos = await newRelatos.save();
    return res.json({
      status: 200,
      message: "Relatos created",
      console: createdRelatos,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteRelatos = async (req, res, next) => {

    try {

        const { id } = req.params;

        const RelatosBorrada = await relato.findByIdAndDelete(id)

        return res.status(200).json(RelatosBorrada);
        
    } catch (error) {
        return next(error)
    }

}

module.exports = { getAllRelatos, getRelatosByID, createRelatos, deleteRelatos };