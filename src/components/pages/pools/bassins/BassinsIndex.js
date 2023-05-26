import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BassinsIndex = () => {
  const { id_piscine } = useParams();
  const [piscine, setPiscine] = useState(null);
  const [bassins, setBassins] = useState([]);

  useEffect(() => {
    // Récupérer les détails de la piscine en fonction de l'ID dans l'URL depuis votre backend
    const fetchPiscine = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/piscines/${id_piscine}?_embed=bassins`
        );
        const data = response.data;
        setPiscine(data);
        // Accéder aux bassins à partir de la propriété "bassinsInfo" dans les données
        setBassins(data.bassinsInfo);
        console.log("Données bassins : ", data.bassinsInfo);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchPiscine();
  }, [id_piscine]);

  if (!piscine) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bassins de {piscine.nom_piscine}</h1>
      <ul>
        {bassins && bassins.length > 0 ? (
          bassins.map((bassin) => <li key={bassin._id}>{bassin.nom_bassin}</li>)
        ) : (
          <li>Aucun bassin disponible</li>
        )}
      </ul>
    </div>
  );
};

export default BassinsIndex;
