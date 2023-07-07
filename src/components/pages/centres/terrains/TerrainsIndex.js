import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import VestiaireIndex from "../vestiaires/VestiairesIndex";
import "../../../../css/image_mapper.css";

import {
  TerrainContainer,
  TerrainH2,
  TerrainList,
  TerrainTitre,
} from "./TerrainElement";
import "../../../../css/App.css";
import { ListElement } from "../../infrastructures/InfrastructureElement";

const TerrainsIndex = () => {
  const { id_centre } = useParams();
  const [centre, setCentre] = useState(null);
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    const fetchCentre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/centres/${id_centre}`
        );
        const data = response.data;
        setCentre(data);
        setTerrains(data.terrains);
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
    <TerrainContainer>
      <TerrainTitre>
        Terrains et vestiaires du centre {centre.nom_centre}
      </TerrainTitre>
      <TerrainH2>Terrains</TerrainH2>
      <TerrainList>
        {terrains && terrains.length > 0 ? (
          terrains.map((terrain) => (
            <ListElement key={terrain.id_terrain}>
              {terrain.nom_terrain}
            </ListElement>
          ))
        ) : (
          <li>Aucun terrain disponible</li>
        )}
        <VestiaireIndex centreId={id_centre} />
      </TerrainList>
    </TerrainContainer>
  );
};

export default TerrainsIndex;
