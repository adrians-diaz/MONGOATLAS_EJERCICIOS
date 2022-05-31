const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RelatosSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    year: { type: String, required: false },
    bestias: [
      { type: Schema.Types.ObjectId, ref: "bestiarios", required: false },
    ],
  },
  { timestamps: true }
);

const relato = mongoose.model("relatos", RelatosSchema);

module.exports = relato;