const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  id_gym: Number,
  nom_gym: String,
  id_infrastructure: Number,
  salles: [Number],
});

const Gym = mongoose.model("Gyms", gymSchema, "gyms");

module.exports = Gym;
