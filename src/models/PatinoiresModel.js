const mongoose = require("mongoose");

const patinoireSchema = new mongoose.Schema({
  id_patinoire: Number,
  nom_patinoire: String,
  id_infrastructure: Number,
  capacite: Number,
  disponibilite: Boolean,
});

const Patinoire = mongoose.model("Patinoire", patinoireSchema);

module.exports = Patinoire;
