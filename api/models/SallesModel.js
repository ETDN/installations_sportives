const mongoose = require("mongoose");

const salleSchema = new mongoose.Schema({
  id_salle: Number,
  nom_salle: String,
  disponibilite: Boolean,
  id_infrastructure: Number,
});

const Salle = mongoose.model("Salles", salleSchema, "salles");

module.exports = Salle;
