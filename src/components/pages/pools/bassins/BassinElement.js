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
`;

export const CalendarContainer = styled.div`
  position: absolute;
  left: 67%;
  margin-top: 20px; /* Espace entre la description et le calendrier */
`;

export const TimeslotsContainer = styled.div`
  position: absolute;
  left: 67%;
  top: 45%;
  column-count: 4; /* Affiche les timeslots sur 2 colonnes */
  column-gap: 20px; /* Espacement horizontal entre les colonnes */
  margin-top: 20px; /* Espace entre le calendrier et les créneaux horaires */
`;

export const TimeslotsItem = styled.li`
  font-size: 0.8rem;
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
