import React, { useEffect, useState } from "react";
import axios from "axios";
import { TerrainH2 } from "../terrains/TerrainElement";

const VestiaireIndex = ({ centreId }) => {
  const [vestiaires, setVestiaires] = useState([]);

  useEffect(() => {
    const fetchVestiaires = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/centres/${centreId}?_embed=vestiaires`
        );
        const data = response.data;
        setVestiaires(data.vestiairesInfo);
        console.log("Données vestiaires : ", data.vestiairesInfo);
      } catch (error) {
        // Gérer les erreurs
      }
    };

    fetchVestiaires();
  }, [centreId]);

  return (
    <div>
      <TerrainH2>Vestiaires</TerrainH2>
      {vestiaires && vestiaires.length > 0 ? (
        vestiaires.map((vestiaire) => (
          <li key={vestiaire._id}>{vestiaire.nom_vestiaire}</li>
        ))
      ) : (
        <li>Aucun vestiaire disponible</li>
      )}
    </div>
  );
};

export default VestiaireIndex;
