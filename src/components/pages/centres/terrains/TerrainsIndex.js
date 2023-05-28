import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageMapper from "react-image-mapper";
import VestiaireIndex from "../vestiaires/VestiairesIndex";
import "../../../../css/image_mapper.css";

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

  const [msg, setMsg] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);

  // const [activeImage, setActiveImage] = useState(null);

  // const handleClick = (imageId) => {
  //   setActiveImage((prevImageId) => (prevImageId === imageId ? null : imageId));
  // };

  const [activeArea, setActiveArea] = useState(null);

  const handleClick = (areaId) => {
    setActiveArea((prevAreaId) => (prevAreaId === areaId ? null : areaId));
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

  let MAP = {
    name: "my-map",
    areas: [
      {
        name: "Foot juniors",
        shape: "poly",
        coords: [366, 220, 367, 345, 450, 345, 450, 220],
        preFillColor: "transparent",
        fillColor: "blue",
      },
      {
        name: "Foot juniors",
        shape: "poly",
        coords: [285, 205, 285, 280, 345, 280, 345, 205],
        preFillColor: "transparent",
        fillColor: "pink",
      },
      {
        name: "Foot",
        shape: "poly",
        coords: [55, 220, 55, 350, 142, 350, 142, 220],
        preFillColor: "transparent",
        fillColor: "yellow",
      },
      {
        name: "Foot",
        shape: "poly",
        coords: [72, 388, 95, 515, 180, 502, 156, 375],
        preFillColor: "transparent",
        fillColor: "red",
      },
      {
        name: "Foot",
        shape: "poly",
        coords: [170, 213, 170, 340, 270, 340, 270, 213],
        preFillColor: "transparent",
        fillColor: "purple",
      },
      {
        name: "Street-hockey",
        shape: "poly",
        coords: [295, 285, 295, 355, 335, 355, 335, 285],
        preFillColor: "transparent",
        fillColor: "orange",
      },
      {
        name: "Vestiaire 1",
        shape: "poly",
        coords: [155, 140, 155, 157, 175, 157, 175, 140],
        preFillColor: "transparent",
        fillColor: "green",
      },
      {
        name: "Vestiaire 2",
        shape: "poly",
        coords: [180, 140, 180, 157, 200, 157, 200, 140],
        preFillColor: "transparent",
        fillColor: "green",
      },

      {
        name: "Vestiaire 3",
        shape: "poly",
        coords: [210, 140, 210, 155, 230, 155, 230, 140],
        preFillColor: "transparent",
        fillColor: "green",
      },

      {
        name: "Vestiaire 4",
        shape: "poly",
        coords: [230, 140, 230, 155, 250, 155, 250, 140],
        preFillColor: "transparent",
        fillColor: "green",
      },
    ],
  };

  const enterArea = (area) => {
    //hoveredArea: area, ???
    setHoveredArea(area);
    setMsg(
      `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`
    );
  };

  // const leaveArea = (area) => {
  //   setHoveredArea(null);
  //   setMsg(
  //     `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
  //       area.coords
  //     )} !`
  //   );
  // };

  const moveOnArea = (area, evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(
      "You moved on " +
        area.shape +
        " " +
        area.name +
        ' at coords {"x":' +
        coords.x +
        ',"y":' +
        coords.y +
        "} !"
    );
  };

  const moveOnImage = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

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

      <div className="grid">
        <div className="presenter">
          <div style={{ position: "relative" }}>
            <p>Imageeeeeeeeee</p>
            <p>Nom image : {centre.plan_image}</p>
            {centres.map((centre) => (
              <ImageMapper
                src={centre.plan_image}
                alt={centre.nom_centre}
                map={MAP}
                width={500}
                // onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
                // onMouseEnter={(area) => enterArea(area)}
                // onMouseLeave={(area) => leaveArea(area)}
                // onImageMouseMove={(evt) => moveOnImage(evt)}
                lineWidth={3}
                strokeColor={"white"}
              />
            ))}

            {hoveredArea && (
              <span
                className="tooltip"
                style={{ ...getTipPosition(hoveredArea) }}
              >
                {hoveredArea && hoveredArea.name}
              </span>
            )}
          </div>

          <pre className="message">{msg ? msg : null}</pre>
          <pre>{moveMsg ? moveMsg : null}</pre>
        </div>
      </div>
    </TerrainContainer>
  );
};

export default TerrainsIndex;
