const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
  start_time: String,
  end_time: String,
  is_available: Boolean,
});

const clientSchema = new mongoose.Schema({
  nom: String,
  adresse: String,
  telephone: String,
});

const reservationSchema = new mongoose.Schema({
  date: Date,
  bassin_id: Number,
  timeslot_id: Number,
  client: [clientSchema],
});

const piscineSchema = new mongoose.Schema({
  id_piscine: Number,
  nom_piscine: String,
  id_infrastructure: Number,
  bassins: [Number],
  timeslots: [timeslotSchema],
  reservations: [reservationSchema], // Utilisation du sous-modèle timeslotSchema
});

const Piscine = mongoose.model("Piscine", piscineSchema, "piscines");

module.exports = Piscine;
