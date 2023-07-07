const mongoose = require("mongoose");

const terrainSchema = new mongoose.Schema({
  id_terrain: Number,
  nom_terrain: String,
});

const vestiaireSchema = new mongoose.Schema({
  id_vestiaire: Number,
  nom_vestiaire: String,
});

const centreSportifsSchema = new mongoose.Schema({
  id_centre: Number,
  nom_centre: String,
  id_infrastructure: Number,
  terrains: [terrainSchema],
  vestiaires: [vestiaireSchema],
  image: String,
  plan_image: String,
});

const Centre = mongoose.model("Centre", centreSportifsSchema);

module.exports = Centre;
