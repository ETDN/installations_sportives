const mongoose = require("mongoose");

const piscineSchema = new mongoose.Schema({
  id_piscine: Number,
  nom_piscine: String,
  id_infrastructure: Number,
  bassins: [Number],
});

const Piscine = mongoose.model("Piscine", piscineSchema, "piscines");

module.exports = Piscine;
