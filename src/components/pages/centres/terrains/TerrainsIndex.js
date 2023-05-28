import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import VestiaireIndex from "../vestiaires/VestiairesIndex";
import {
  TerrainContainer,
  TerrainH2,
  TerrainInfo,
  TerrainList,
  TerrainPlan,
  TerrainTitre,
} from "./TerrainElement";
import "../../../../css/App.css";

const TerrainsIndex = () => {
  const { id_centre } = useParams();
  const [centre, setCentre] = useState(null);
  const [terrains, setTerrains] = useState([]);
  const [centres, setCentres] = useState([]);
  const [vestiaires, setVestiaires] = useState([]);

  const [activeImage, setActiveImage] = useState(null);

  const handleClick = (imageId) => {
    setActiveImage((prevImageId) => (prevImageId === imageId ? null : imageId));
  };

  useEffect(() => {
    const fetchCentre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/centres/${id_centre}?_embed=terrains&_embed=vestiaires`
        );
        const data = response.data;
        setCentre(data);
        setTerrains(data.terrainsInfo);
        setVestiaires(data.vestiairesInfo);
        setCentres(data.centresInfo);
        console.log("Données terrains : ", data.terrainsInfo);
        console.log("Données vestiaires : ", data.vestiairesInfo);
        console.log("Données centres : ", data.centresInfo);
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
            <li key={terrain._id}>{terrain.nom_terrain}</li>
          ))
        ) : (
          <li>Aucun terrain disponible</li>
        )}
        <VestiaireIndex centreId={id_centre} />
      </TerrainList>

      <TerrainInfo>
        {centres.map((centre) => (
          <div key={centre.id_infrastructure}>
            <TerrainPlan
              src={centre.plan_image}
              alt={centre.plan_image}
              className={
                activeImage === centre.id_infrastructure ? "active" : ""
              }
              onClick={() => handleClick(centre.id_infrastructure)}
            />
          </div>
        ))}
      </TerrainInfo>
    </TerrainContainer>
  );
};

export default TerrainsIndex;
