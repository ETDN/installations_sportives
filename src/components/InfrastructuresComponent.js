import React, { useEffect, useState } from "react";
import axios from "axios";
import Bassin from "../models/BassinsModel";

const InfrastructuresComponent = () => {
  const [piscines, setPiscines] = useState([]);
  const [centres, setCentres] = useState([]);
  const [patinoires, setPatinoires] = useState([]);
  const [bassins, setBassins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          piscinesResponse,
          centresResponse,
          infrastructureResponse,
          patinoireResponse,
          bassinResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3001/piscines"),
          axios.get("http://localhost:3001/centres_sportifs"),
          axios.get("http://localhost:3001/infrastructures"),
          axios.get("http://localhost:3001/patinoires"),
          axios.get("http://localhost:3001/bassins"),
        ]);

        console.log("Piscines Response:", piscinesResponse.data);
        console.log("Centres Response:", centresResponse.data);
        console.log("Infrastructure Response:", infrastructureResponse.data);
        console.log("Patinoire Response:", patinoireResponse.data);
        console.log("Bassins Response:", bassinResponse.data);

        setPiscines(piscinesResponse.data);
        setCentres(centresResponse.data);
        setPatinoires(patinoireResponse.data);
        setBassins(bassinResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBassins = async () => {
      try {
        const bassinsResponse = await axios.get(
          "http://localhost:3001/bassins"
        );
        const fetchedBassins = bassinsResponse.data;
        setBassins(fetchedBassins);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBassins();
  }, []);

  const getBassinName = (bassinId) => {
    const bassin = bassins.find((b) => b.id_bassin === bassinId);
    return bassin ? bassin.nom_bassin : "Unknown";
  };

  return (
    <div>
      {centres.map((centre) => (
        <div key={centre._id}>
          <h3>{centre.id_centre}</h3>
          <p>Nom: {centre.nom_centre}</p>
          <p>ID Infrastructure: {centre.id_infrastructure}</p>
          <p>Terrains: {centre.terrains.join(", ")}</p>
          <p>Vestiaires: {centre.vestiaires.join(", ")}</p>
        </div>
      ))}

      {piscines.map((piscine) => (
        <div key={piscine._id}>
          <h3>{piscine.id_piscine}</h3>
          <p>Nom: {piscine.nom_piscine}</p>
          <p>ID Infrastructure: {piscine.id_infrastructure}</p>
          <p>
            Bassins:{" "}
            {piscine.bassins
              .map((bassinId) => {
                const bassin = bassins.find((b) => b.id_bassin === bassinId);
                return bassin ? bassin.nom_bassin : "Unknown";
              })
              .join(", ")}
          </p>
        </div>
      ))}

      {patinoires.map((patinoire) => (
        <div key={patinoire._id}>
          <h3>{patinoire.id_patinoire}</h3>
          <p>Nom: {patinoire.nom_patinoire}</p>
          <p>Capacite: {patinoire.capacite}</p>
          <p>ID Infrastructure: {patinoire.id_infrastructure}</p>
        </div>
      ))}
    </div>
  );
};

export default InfrastructuresComponent;
