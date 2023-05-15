import React, { useEffect, useState } from "react";
import axios from "axios";

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
          axios.get("http://localhost:3001/centres"),
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
        </div>
      ))}

      {piscines.map((piscine) => (
        <div key={piscine._id}>
          <h3>Nom: {piscine.nom_piscine}</h3>
          {/* <p>
            Bassins:{" "}
            {piscine.bassins
              .map((bassinId) => {
                const bassin = bassins.find((b) => b.id_bassin === bassinId);
                return bassin ? bassin.nom_bassin : "Unknown";
              })
              .join(", ")}
          </p> */}
        </div>
      ))}

      {patinoires.map((patinoire) => (
        <div key={patinoire._id}>
          <h3>Nom: {patinoire.nom_patinoire}</h3>
        </div>
      ))}
    </div>
  );
};

export default InfrastructuresComponent;
