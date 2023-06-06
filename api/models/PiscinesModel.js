const mongoose = require("mongoose");

// const timeslotSchema = new mongoose.Schema({
//   start_time: String,
//   end_time: String,
//   is_available: Boolean,
// });

const piscineSchema = new mongoose.Schema({
  id_piscine: Number,
  nom_piscine: String,
  id_infrastructure: Number,
  bassins: [Number],
  // timeslots: [timeslotSchema], // Utilisation du sous-modèle timeslotSchema
});

const Piscine = mongoose.model("Piscine", piscineSchema, "piscines");

module.exports = Piscine;
