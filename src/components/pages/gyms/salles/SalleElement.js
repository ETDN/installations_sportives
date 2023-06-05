import styled from "styled-components";
import "typeface-roboto";

export const ContainerSalle = styled.div`
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

export const IconGym = styled.img`
  width: 600px;
  height: 350px;
  aspect-ratio: 1;
  outline: calc(400px / 2) solid #0009;
  outline-offset: calc(400px / -2);
  cursor: pointer;

  &:hover {
    outline: 4px;
    outline-offset: 2px;
  }
`;

export const Titre = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const H2 = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const List = styled.ul`
  font-size: 1rem;
  font-weight: 500;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ContainerImg = styled.div`
  margin-bottom: 30px;
`;

export const ListElement = styled.li`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
