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

const bassinSchema = new mongoose.Schema({
  id_bassin: Number,
  nom_bassin: String,
});

const reservationSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  date: Date,
  id_bassin: Number,
  id_piscine: Number,
  timeslot: timeslotSchema,
  client: [clientSchema], // Supprimer les crochets
});

const piscineSchema = new mongoose.Schema({
  id_piscine: {
    type: Number,
    required: true,
  },
  nom_piscine: String,
  id_infrastructure: Number,
  bassins: [bassinSchema],
  timeslots: [timeslotSchema],
  reservations: [reservationSchema], // Utilisation du sous-modèle timeslotSchema
});

const Piscine = mongoose.model("Piscine", piscineSchema, "piscines");

module.exports = Piscine;
