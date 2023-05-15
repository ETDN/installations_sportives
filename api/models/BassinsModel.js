const mongoose = require("mongoose");

const bassinSchema = new mongoose.Schema({
  id_bassin: Number,
  nom_bassin: String,
  capacite: Number,
  disponibilite: Boolean,
  id_infrastructure: Number,
});

const Bassin = mongoose.model("Bassin", bassinSchema, "bassins");

module.exports = Bassin;
