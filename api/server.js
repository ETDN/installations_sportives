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

//if we make a request to localhost 3001/todos it's gonna to find our todos and find our model
app.get("/infrastructures", async (req, res) => {
  const infrastructures = await Infrastructure.find();

  res.json(infrastructures);
});

app.get("/piscines", async (req, res) => {
  const piscines = await Piscine.find();

  res.json(piscines);
});

app.get("/centres_sportifs", async (req, res) => {
  const centres = await CentreSportif.find();

  res.json(centres);
});

app.listen(3001, () => console.log("Server starter on port 3001"));
