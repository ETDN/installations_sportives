const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//L'usage de ChatGPT à été nécessaire à la création d'une partie de ce code.

const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");

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
const Gym = require("./models/GymsModel");

app.get("/infrastructures", async (req, res) => {
  s;
  const infrastructures = await Infrastructure.find();

  res.json(infrastructures);
});

/* --------------- Piscine -------------------- */

app.get("/piscines", async (req, res) => {
  const piscines = await Piscine.find();

  res.json(piscines);
});

app.get("/piscines/:id", async (req, res) => {
  const piscineId = Number(req.params.id);

  try {
    const piscine = await Piscine.findOne({ id_piscine: piscineId });

    if (!piscine) {
      return res.status(404).json({ error: "Piscine not found" });
    }

    res.json(piscine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/piscines/:id/bassins", async (req, res) => {
  const piscineId = Number(req.params.id);
  try {
    const piscine = await Piscine.findOne({ id_piscine: piscineId }).select(
      "bassins"
    );
    if (!piscine) {
      return res.status(404).json({ message: "Piscine not found" });
    }
    const bassins = piscine.bassins;
    res.json(bassins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// still not working

app.put("/save-reservation", async (req, res) => {
  const { piscineId, bassinId, dates, timeslot, client } = req.body;

  console.log("Id piscine : " + piscineId);
  console.log("Id bassin : " + bassinId);
  console.log("dates : ", dates);
  console.log("timeslot : ", timeslot);
  console.log("client : ", client);

  try {
    const piscine = await Piscine.findOne({ id_piscine: piscineId });

    if (!piscine) {
      return res.status(404).json({ error: "Piscine not found" });
    }

    const bassin = piscine.bassins.find((b) => b.id_bassin === bassinId);

    if (!bassin) {
      return res.status(404).json({ error: "Bassin not found" });
    }

    const selectedTimeslot = piscine.timeslots.find(
      (slot) => slot.timeslot_id === timeslot.timeslot_id
    );

    if (!selectedTimeslot) {
      return res.status(404).json({ error: "Timeslot not found" });
    }

    for (const date of dates) {
      const selectedDate = new Date(date);
      selectedDate.setMonth(selectedDate.getMonth() - 1);

      const reservation = {
        date: selectedDate,
        id_bassin: bassinId,
        id_piscine: piscineId,
        timeslot: {
          timeslot_id: selectedTimeslot.timeslot_id,
          start_time: selectedTimeslot.start_time,
          end_time: selectedTimeslot.end_time,
        },
        client: {
          nom: client.nom,
          adresse: client.adresse,
          telephone: client.telephone,
        },
      };

      piscine.reservations.push(reservation);
    }

    await piscine.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/reservations/:piscineId/:bassinId/:date", async (req, res) => {
  const { piscineId, bassinId, date } = req.params;

  try {
    const piscine = await Piscine.findOne({ id_piscine: piscineId });

    if (!piscine) {
      console.log("Piscine not found");
      return res.status(404).json({ error: "Piscine not found" });
    }

    const bassin = piscine.bassins.find(
      (b) => b.id_bassin === parseInt(bassinId)
    );

    if (!bassin) {
      console.log("Bassin not found");
      return res.status(404).json({ error: "Bassin not found" });
    }

    let databaseReservations = [];

    if (Array.isArray(date)) {
      // Si date est un tableau de dates
      const formattedDates = date.map((d) => new Date(d));
      databaseReservations = piscine.reservations.filter(
        (reservation) =>
          reservation.id_bassin === parseInt(bassinId) &&
          formattedDates.some(
            (d) => d.toDateString() === reservation.date.toDateString()
          )
      );
    } else {
      // Si date est une seule date
      const formattedDate = new Date(date);
      databaseReservations = piscine.reservations.filter(
        (reservation) =>
          reservation.id_bassin === parseInt(bassinId) &&
          reservation.date.toDateString() === formattedDate.toDateString()
      );
    }

    res.json(databaseReservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
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

/* --------------- Centres sportifs  -------------------- */

app.get("/centres", async (req, res) => {
  const centres = await CentreSportif.find();

  res.json(centres);
});

app.get("/centres/:id", async (req, res) => {
  try {
    const centre = await CentreSportif.findOne({ id_centre: req.params.id });
    if (!centre) {
      return res.status(404).json({ message: "Centre non trouvé" });
    }
    res.json(centre);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du centre" });
  }
});

app.get("/centres/:id/terrains", async (req, res) => {
  try {
    const centre = await CentreSportif.findOne({ id_centre: req.params.id });
    if (!centre) {
      return res.status(404).json({ message: "Centre non trouvé" });
    }
    const terrains = centre.terrains;
    res.json(terrains);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des terrains du centre",
    });
  }
});

app.get("/centres/:id/vestiaires", async (req, res) => {
  try {
    const centre = await CentreSportif.findOne({ id_centre: req.params.id });
    if (!centre) {
      return res.status(404).json({ message: "Centre non trouvé" });
    }
    const vestiaires = centre.vestiaires;
    res.json(vestiaires);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des vestiaires du centre",
    });
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

app.get("/gyms/salles/:id", async (req, res) => {
  try {
    const salleId = Number(req.params.id);
    const gyms = await Gym.find(
      { salles: { $elemMatch: { id_salle: salleId } } },
      { "salles.$": 1 }
    );
    if (gyms.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune gym trouvée pour cette salle" });
    }
    res.json(gyms);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des gyms" });
  }
});

app.get("/salles", async (req, res) => {
  try {
    const salles = await Gym.distinct("salles", {});
    res.json(salles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des salles" });
  }
});

app.listen(3001, () => console.log("Server starter on port 3001"));
