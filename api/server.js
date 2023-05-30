const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { eventWrapper } = require("@testing-library/user-event/dist/utils");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/infrastructures_sportives", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const Infrastructure = require("./models/InfrastructuresModel");
const Piscine = require("./models/PiscinesModel");
const CentreSportif = require("./models/CentresSportifsModel");
const Patinoire = require("./models/PatinoiresModel");
const Bassin = require("./models/BassinsModel");
const Gym = require("./models/GymsModel");
const Salle = require("./models/SallesModel");
const Terrain = require("./models/TerrainsModel");

//if we make a request to localhost 3001/todos it's gonna to find our todos and find our model
app.get("/infrastructures", async (req, res) => {
  const infrastructures = await Infrastructure.find();

  res.json(infrastructures);
});

/* --------------- Piscine -------------------- */

app.get("/piscines", async (req, res) => {
  const piscines = await Piscine.find();

  res.json(piscines);
});

app.get("/piscines/:id", async (req, res) => {
  const piscineId = Number(req.params.id); // Convertir l'ID en un nombre
  try {
    const piscine = await Piscine.aggregate([
      { $match: { id_piscine: piscineId } },
      {
        $lookup: {
          from: "bassins", // Utiliser la collection "bassins" pour la jointure
          localField: "id_piscine",
          foreignField: "id_piscine",
          as: "bassinsInfo",
        },
      },
      { $project: { _id: 0, nom_piscine: 1, bassinsInfo: 1 } }, // Inclure les informations des bassins dans le résultat
    ]);
    if (piscine.length === 0) {
      return res.status(404).json({ error: "Piscine not found" });
    }
    res.json(piscine[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/bassins/:id", async (req, res) => {
  const piscineId = Number(req.params.id); // Convertir l'ID en un nombre
  try {
    const bassins = await Bassin.find({ id_piscine: piscineId });
    if (bassins.length === 0) {
      return res.status(404).json({ error: "Piscine not found" });
    }
    res.json(bassins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/bassins", async (req, res) => {
  const bassins = await Bassin.find();

  res.json(bassins);
});

/* --------------- Centres sportifs  -------------------- */

app.get("/centres", async (req, res) => {
  const centres = await CentreSportif.find();

  res.json(centres);
});

app.get("/centres/:id", async (req, res) => {
  const centreId = Number(req.params.id); // Convertir l'ID en un nombre
  try {
    const centre = await CentreSportif.aggregate([
      { $match: { id_centre: centreId } },
      {
        $lookup: {
          from: "terrains", // Utiliser la collection "terrains" pour la jointure
          localField: "id_centre",
          foreignField: "id_centre",
          as: "terrainsInfo",
        },
      },
      {
        $lookup: {
          from: "vestiaires", // Utiliser la collection "vestiaires" pour la jointure
          localField: "id_centre",
          foreignField: "id_centre",
          as: "vestiairesInfo",
        },
      },
      {
        $lookup: {
          from: "centres", // Utiliser la collection "vestiaires" pour la jointure
          localField: "id_centre",
          foreignField: "id_centre",
          as: "centresInfo",
        },
      },
      {
        $project: {
          _id: 0,
          nom_centre: 1,
          terrainsInfo: 1,
          vestiairesInfo: 1,
          centresInfo: 1,
        },
      }, // Inclure les informations des terrains et vestiaires dans le résultat
    ]);
    if (centre.length === 0) {
      return res.status(404).json({ error: "Centre not found" });
    }
    res.json(centre[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/terrains", async (req, res) => {
  const terrains = await Terrain.find();

  res.json(terrains);
});

app.get("/terrains/:id", async (req, res) => {
  const centreId = Number(req.params.id); // Convertir l'ID en un nombre
  try {
    const terrains = await Terrain.find({ id_centre: centreId });
    if (terrains.length === 0) {
      return res.status(404).json({ error: "Centre not found" });
    }
    res.json(terrains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* --------------- Patinoire -------------------- */

app.get("/patinoires", async (req, res) => {
  const patinoires = await Patinoire.find();

  res.json(patinoires);
});

/* --------------- Salles de gyms -------------------- */

app.get("/gyms", async (req, res) => {
  const gyms = await Gym.find();

  res.json(gyms);
});

app.get("/gyms/:id", async (req, res) => {
  const gymId = Number(req.params.id);
  try {
    const gym = await Gym.aggregate([
      { $match: { id_gym: gymId } },
      {
        $lookup: {
          from: "salles",
          localField: "id_gym",
          foreignField: "id_gym",
          as: "sallesInfo",
        },
      },
      { $project: { _id: 0, nom_gym: 1, sallesInfo: 1 } },
    ]);
    console.log("Gym:", gym);
    if (gym.length === 0) {
      return res.status(404).json({ error: "Gym not found" });
    }
    res.json(gym[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/salles", async (req, res) => {
  const salles = await Salle.find();

  res.json(salles);
});

app.get("/salles/:id", async (req, res) => {
  const gymId = Number(req.params.id); // Convertir l'ID en un nombre
  try {
    const salles = await Salle.find({ id_gym: gymId });
    if (salles.length === 0) {
      return res.status(404).json({ error: "Centre not found" });
    }
    res.json(salles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3001, () => console.log("Server starter on port 3001"));
