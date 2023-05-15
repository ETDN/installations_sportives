const mongoose = require("mongoose");

const infrastructureSchema = new mongoose.Schema({
  id_infrastructure: Number,
  centres_sportifs: [Number],
  piscines: [Number],
  gyms: [Number],
  patinoires: [Number],
});

const Infrastructure = mongoose.model("Infrastructure", infrastructureSchema);

module.exports = Infrastructure;
