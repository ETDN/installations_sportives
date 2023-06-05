import styled from "styled-components";

export const BassinContainer = styled.div`
  display: flex;
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
    left: 50%;
    display: block;
  }
`;

export const DescriptionContainer = styled.div`
  position: flex;
  margin-right: 100px;
  padding: 20px;
  z-index: 3;
`;

export const CalendarContainer = styled.div`
  margin-top: 20px; /* Espace entre la description et le calendrier */
  z-index: 1;
`;

// export const IconImage = styled.img`
//   height: 160px;
//   width: 220px;
//   margin-bottom: 20px;
//   transition: transform 0.5s ease;
//   box-shadow: rgb(237, 14, 46) -10px 10px;
//   z-index: 3;
// `;

export const TerrainInfo = styled.div``;
