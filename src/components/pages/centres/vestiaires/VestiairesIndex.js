import React, { useEffect, useState } from "react";
import axios from "axios";
import { TerrainH2 } from "../terrains/TerrainElement";
import { ListElement } from "../../infrastructures/InfrastructureElement";

const VestiaireIndex = ({ centreId }) => {
  const [vestiaires, setVestiaires] = useState([]);

  useEffect(() => {
    const fetchVestiaires = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/centres/${centreId}/vestiaires`
        );
        const data = response.data;
        setVestiaires(data);
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
          <ListElement key={vestiaire._id}>
            {vestiaire.nom_vestiaire}
          </ListElement>
        ))
      ) : (
        <li>Aucun vestiaire disponible</li>
      )}
    </div>
  );
};

export default VestiaireIndex;
