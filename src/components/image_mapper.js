import React, { useState } from "react";
import "../css/image_mapper.css";
import ImageMapper from "react-image-mapper";
import image from "../img/plan_terrain_ecossia.PNG";

//ES6 way
const SportsFieldMap = (props) => {
  const [msg, setMsg] = useState(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [moveMsg, setMoveMsg] = useState(null);

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

  const load = () => {
    setMsg("Interact with image !");
  };

  const clicked = (area) => {
    setMsg(
      `You clicked on ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`
    );
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
    //hoveredArea: area, ???
    setHoveredArea(area);
    setMsg(
      `You entered ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`
    );
  };

  const leaveArea = (area) => {
    setHoveredArea(null);
    setMsg(
      `You leaved ${area.shape} ${area.name} at coords ${JSON.stringify(
        area.coords
      )} !`
    );
  };

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
            lineWidth={3}
            strokeColor={"white"}
          />

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
  );
  //return React.createElement('div', {className:"App"}, React.createElement('h1',null,'Hi 2 !!!'))
};

export default SportsFieldMap;
