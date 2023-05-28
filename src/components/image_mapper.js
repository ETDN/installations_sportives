import React, { useState } from "react";
import "../css/image_mapper.css";
import ImageMapper from "react-image-mapper";
import image from "../img/plan_terrain_ecossia.PNG";

const SportsFieldMap = (props) => {
  const [msg, setMsg] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);

  const generateAreas = () => {
    return props.terrains.map((terrain) => ({
      name: terrain.id_terrain.toString(),
      shape: "poly",
      coords: terrain.coords,
      preFillColor: "transparent",
      fillColor: terrain.fillColor,
    }));
  };

  const MAP = {
    name: "my-map",
    areas: generateAreas(),
  };

  const load = () => {
    setMsg("Interact with image !");
  };

  const clicked = (area) => {
    setMsg(`You clicked on ${area.name} (${area.coords.join(", ")})!`);
  };

  const clickedOutside = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMsg(`You clicked on the image at coords ${JSON.stringify(coords)} !`);
  };

  const moveOnImage = (evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(`You moved on the image at coords ${JSON.stringify(coords)} !`);
  };

  const enterArea = (area) => {
    setHoveredArea(area);
    setMsg(`You entered ${area.name} (${area.coords.join(", ")})!`);
  };

  const leaveArea = (area) => {
    setHoveredArea(null);
    setMsg(`You left ${area.name} (${area.coords.join(", ")})!`);
  };

  const moveOnArea = (area, evt) => {
    const coords = { x: evt.nativeEvent.layerX, y: evt.nativeEvent.layerY };
    setMoveMsg(
      `You moved on ${area.name} (${area.coords.join(", ")}) at coords (${
        coords.x
      }, ${coords.y})!`
    );
  };

  const getTipPosition = (area) => {
    return { top: `${area.center[1]}px`, left: `${area.center[0]}px` };
  };

  return (
    <div className="grid">
      <div className="presenter">
        <div style={{ position: "relative" }}>
          <ImageMapper
            src={image}
            map={MAP}
            width={500}
            onLoad={() => load()}
            onMouseMove={(area, _, evt) => moveOnArea(area, evt)}
            onClick={(area) => clicked(area)}
            onMouseEnter={(area) => enterArea(area)}
            onMouseLeave={(area) => leaveArea(area)}
            onImageClick={(evt) => clickedOutside(evt)}
            onImageMouseMove={(evt) => moveOnImage(evt)}
            lineWidth={4}
            strokeColor={"white"}
          />

          {hoveredArea && (
            <span
              className="tooltip"
              style={{ ...getTipPosition(hoveredArea) }}
            >
              {hoveredArea.name}
            </span>
          )}
        </div>

        <pre className="message">{msg ? msg : null}</pre>
        <pre>{moveMsg ? moveMsg : null}</pre>
      </div>
    </div>
  );
};

export default SportsFieldMap;
