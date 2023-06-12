const mongoose = require("mongoose");

const timeslotSchema = new mongoose.Schema({
  timeslot_id: Number, // Assurez-vous que le type est Number
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
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  date: Date,
  bassin_id: Number,
  timeslot: {
    timeslot_id: Number,
    start_time: String,
    end_time: String,
  },
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
