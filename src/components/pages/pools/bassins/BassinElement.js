import styled from "styled-components";

export const BassinContainer = styled.div``;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerImg = styled.div`
  width: 55%;
  float: left;
  padding: 20px;

  :after {
    content: "";
    background-color: rgb(237, 14, 46);
    position: absolute;
    width: 5px;
    height: 700px;
    top: 10px;
    left: 57%;
    display: block;
  }
`;

export const DescriptionContainer = styled.div`
  background-color: burlywood;
  font-size: 1rem;
`;

export const CalendarContainer = styled.div`
  position: absolute;
  left: 67%;
  margin-top: 20px; /* Espace entre la description et le calendrier */
`;

export const TimeslotsContainer = styled.div`
  column-count: 4; /* Affiche les timeslots sur 2 colonnes */
  column-gap: 20px; /* Espacement horizontal entre les colonnes */
  margin-top: 30px;
  margin-bottom: 30px;
  overflow: scroll;
`;

export const TimeslotsItem = styled.p`
  text-align: center;
  justify-content: space-evenly;
  background-color: #d3d3d3;
  padding-top: 5px;
  margin-bottom: 10px;
  height: 30px;
  width: 150px;
  border-radius: 20px;
  font-size: 1rem;

  &:hover {
    background-color: #7393b3;
  }
`;

export const Button = styled.button`
  background-color: #4caf50; /* Couleur de fond */
  color: white; /* Couleur du texte */
  height: 50px;
  padding: 10px 20px; /* Espacement intérieur */
  border: none; /* Supprime les bordures */
  border-radius: 4px; /* Arrondi des coins */
  cursor: pointer; /* Curseur au survol */
`;

export const TerrainInfo = styled.div``;
