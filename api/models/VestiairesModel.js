const mongoose = require("mongoose");

const vestiairesSchema = new mongoose.Schema({
  id_vestiaire: Number,
  nom_vestiaire: String,
  nb_casiers: Number,
  id_centre: Number,
  disponibilite: Boolean,
});

const Vestiaire = mongoose.model("Vestiaire", vestiairesSchema);

module.exports = Vestiaire;
