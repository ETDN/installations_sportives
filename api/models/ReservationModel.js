const mongoose = require("mongoose");

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
  dates: [Date], // Utilisation d'un tableau pour stocker plusieurs dates
  bassinId: Number, // Utilisation de la même casse que dans la route
  piscineId: Number, // Utilisation de la même casse que dans la route
  timeslot: {
    timeslot_id: Number,
    start_time: String,
    end_time: String,
  },
  client: [clientSchema],
});

const Reservation = mongoose.model(
  "Reservation",
  reservationSchema,
  "reservations"
);

module.exports = Reservation;
