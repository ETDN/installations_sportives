import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TerrainsIndex = () => {
  const { id_centre } = useParams();
  const [centre, setCentre] = useState(null);
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    // Récupérer les détails du centre en fonction de l'ID dans l'URL depuis votre backend
    const fetchCentre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/centres/${id_centre}?_embed=terrains`
        );
        const data = response.data;
        setCentre(data);
        // Accéder aux terrains à partir de la propriété "terrainsInfo" dans les données
        setTerrains(data.terrainsInfo); // Utiliser "terrainsInfo" au lieu de "centreInfo"
        console.log("Données terrains : ", data.terrainsInfo); // Utiliser "terrainsInfo" au lieu de "centreInfo"
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchCentre();
  }, [id_centre]);

  if (!centre) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Terrains du centre {centre.nom_centre}</h1>
      <ul>
        {terrains && terrains.length > 0 ? (
          terrains.map((terrain) => (
            <li key={terrain._id}>{terrain.nom_terrain}</li>
          ))
        ) : (
          <li>Aucun terrain disponible</li>
        )}
      </ul>
    </div>
  );
};

export default TerrainsIndex;
