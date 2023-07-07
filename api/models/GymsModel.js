const mongoose = require("mongoose");

const salleSchema = new mongoose.Schema({
  id_salle: Number,
  nom_salle: String,
  utilisation: String,
});

const gymSchema = new mongoose.Schema({
  id_gym: Number,
  nom_gym: String,
  id_infrastructure: Number,
  salles: [salleSchema],
  image: String,
});

const Gym = mongoose.model("Gym", gymSchema, "gyms");

module.exports = Gym;
