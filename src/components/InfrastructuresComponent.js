import React, { useEffect, useState } from "react";
import axios from "axios";

const InfrastructuresComponent = () => {
  const [piscines, setPiscines] = useState([]);
  const [centres, setCentres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [piscinesResponse, centresResponse] = await Promise.all([
          axios.get("http://localhost:3001/piscines"),
          axios.get("http://localhost:3001/centres_sportifs"),
          axios.get("http://localhost:3001/infrastructures"),
        ]);

        console.log("Piscines Response:", piscinesResponse.data);
        console.log("Centres Response:", centresResponse.data);

        setPiscines(piscinesResponse.data);
        setCentres(centresResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {centres.map((centre) => (
        <div key={centre._id}>
          <h3>{centre.id_centre}</h3>
          <p>Nom : {centre.nom_centre}</p>
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
          <p>Bassins: {piscine.bassins.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default InfrastructuresComponent;
