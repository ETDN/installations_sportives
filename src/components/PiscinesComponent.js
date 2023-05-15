import React, { useEffect, useState } from "react";
import axios from "axios";
import Bassin from "../models/BassinsModel";

const InfrastructuresComponent = () => {
  const [piscines, setPiscines] = useState([]);
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
          axios.get("http://localhost:3001/bassins"),
        ]);

        setPiscines(piscinesResponse.data);
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
    </div>
  );
};

export default InfrastructuresComponent;
