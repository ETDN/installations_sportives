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

//if we make a request to localhost 3001/todos it's gonna to find our todos and find our model
app.get("/infrastructures", async (req, res) => {
  const infrastructures = await Infrastructure.find();

  res.json(infrastructures);
});

app.get("/piscines", async (req, res) => {
  const piscines = await Piscine.find();

  res.json(piscines);
});

app.get("/bassins/:id", async (req, res) => {
  const piscineId = Number(req.params.id); // Convert id to a number
  try {
    const bassins = await Piscine.aggregate([
      { $match: { id_piscine: piscineId } },
      {
        $lookup: {
          from: "bassins",
          localField: "bassins",
          foreignField: "id_bassin",
          as: "bassinsInfo",
        },
      },
      { $project: { _id: 0, "bassinsInfo.nom_bassin": 1 } },
    ]);
    if (bassins.length === 0) {
      return res.status(404).json({ error: "Piscine not found" });
    }
    res.json(bassins[0].bassinsInfo.map((bassin) => bassin.nom_bassin));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/bassins", async (req, res) => {
  const bassins = await Bassin.find();

  res.json(bassins);
});

app.get("/patinoires", async (req, res) => {
  const patinoires = await Patinoire.find();

  res.json(patinoires);
});

app.get("/centres", async (req, res) => {
  const centres = await CentreSportif.find();

  res.json(centres);
});

app.listen(3001, () => console.log("Server starter on port 3001"));
