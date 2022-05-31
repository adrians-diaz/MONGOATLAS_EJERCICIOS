const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BestiarioSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, trim: true, required: false },
    nameFacil: { type: String, required: false },
    relato: [
      { type: Schema.Types.ObjectId, ref: "relatos", required: false },
    ],
  },
  { timestamps: true }
);

const bestiario = mongoose.model("bestiarios", BestiarioSchema);

module.exports = bestiario;