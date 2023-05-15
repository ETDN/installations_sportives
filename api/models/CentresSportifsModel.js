const mongoose = require("mongoose");

const centreSportifsSchema = new mongoose.Schema({
  id_centre: Number,
  nom_centre: String,
  id_infrastructure: Number,
  terrains: [Number],
  vestiaires: [Number],
});

const CentreSportif = mongoose.model("CentreSportif", centreSportifsSchema);

module.exports = CentreSportif;
