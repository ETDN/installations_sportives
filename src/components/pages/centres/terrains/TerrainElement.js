import styled from "styled-components";
import "typeface-roboto";

export const TerrainContainer = styled.div`
  background: white;
  padding: 0 30px;
  height: 100vh;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const TerrainTitre = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const TerrainH2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const TerrainList = styled.ul`
  font-size: 1rem;
  font-weight: 500;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const TerrainPlan = styled.img`
  background-color: orange;
  width: 250px;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 3;
  cursor: pointer;

  &.active {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2);
    z-index: 4;
    width: 300px;
  }
`;

export const TerrainInfo = styled.div``;
