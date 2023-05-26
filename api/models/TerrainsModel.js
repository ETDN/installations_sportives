const mongoose = require("mongoose");

const terrainsSchema = new mongoose.Schema({
  id_terrain: Number,
  nom_terrain: String,
  id_centre: Number,
  disponibilie: Boolean,
});

const Terrain = mongoose.model("Terrain", terrainsSchema);

module.exports = Terrain;
