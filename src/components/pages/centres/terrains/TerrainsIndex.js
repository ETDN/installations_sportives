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
import { ListElement } from "../../infrastructures/InfrastructureElement";

const TerrainsIndex = () => {
  const { id_centre } = useParams();
  const [centre, setCentre] = useState(null);
  const [terrains, setTerrains] = useState([]);
  const [centres, setCentres] = useState([]);
  const [vestiaires, setVestiaires] = useState([]);

  const [msg, setMsg] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);

  const [activeImage, setActiveImage] = useState(null);

  const handleZoomImg = (imageId) => {
    setActiveImage((prevImageId) => (prevImageId === imageId ? null : imageId));
  };

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

  // const enterArea = (area) => {
  //   //hoveredArea: area, ???
  //   setHoveredArea(area);
  //   setMsg(
  //     `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
  //       area.coords
  //     )} !`
  //   );
  // };

  // const leaveArea = (area) => {
  //   setHoveredArea(null);
  //   setMsg(
  //     `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
  //       area.coords
  //     )} !`
  //   );
  // };

  // const moveOnArea = (area, evt) => {
  //   const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  //   setMoveMsg(
  //     "You moved on " +
  //       area.shape +
  //       " " +
  //       area.name +
  //       ' at coords {"x":' +
  //       coords.x +
  //       ',"y":' +
  //       coords.y +
  //       "} !"
  //   );
  // };

  // const moveOnImage = (evt) => {
  //   const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
  //   setMoveMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  // };

  // const getTipPosition = (area) => {
  //   return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  // };

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
            <ListElement key={terrain._id}>{terrain.nom_terrain}</ListElement>
          ))
        ) : (
          <li>Aucun terrain disponible</li>
        )}
        <VestiaireIndex centreId={id_centre} />
      </TerrainList>
      <div className="grid">
        <div className="presenter">
          <div style={{ position: "relative" }}>
            <React.Fragment>
              {centres.map((centre) => {
                return (
                  <div key={centre._id} style={{ position: "relative" }}>
                    {/* <p>Bonjour</p> */}
                    {terrains.map((terrain) => {
                      const areaCoordinates = JSON.parse(terrain.area);
                      console.log("Area coordinates:", areaCoordinates);
                      console.log("Terrain:", terrain);
                      console.log("Centre:", centre);
                      const areas = [
                        {
                          name: terrain.nom_terrain,
                          shape: "rect",
                          coords: areaCoordinates,
                          preFillColor: "red",
                        },
                      ];
                      // return (
                      //   <ImageMapper
                      //     className="image_mapper"
                      //     src={centre.plan_image}
                      //     alt={centre.nom_centre}
                      //     map={{ name: `my-map-${terrain._id}`, areas }}
                      //     width={500}
                      //     lineWidth={3}
                      //     strokeColor={"white"}
                      //     onClick={(area) => handleClick(area.name)}
                      //     onImageClick={() => handleZoomImg(centre._id)}
                      //   />
                      // );
                    })}
                    {hoveredArea && (
                      <span className="tooltip">
                        {hoveredArea && hoveredArea.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          </div>
          <pre className="message">{msg ? msg : null}</pre>
          <pre>{moveMsg ? moveMsg : null}</pre>
        </div>
      </div>
    </TerrainContainer>
  );
};

export default TerrainsIndex;
