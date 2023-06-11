import styled from "styled-components";

export const BassinContainer = styled.div`
  display: flex;
`;

export const ContainerRight = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 20px;
  border-right: 5px solid #ed0e2e;
`;

export const WrapperImg = styled.div`
  float: left;
`;

export const WrapperDescription = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const DescriptionContainer = styled.div`
  border: 1px solid lightgray;
  text-align: left;
  font-size: 1rem;
  max-width: 600px;
  max-height: fit-content; /* Adjust the value to control the number of lines */
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5rem; /* Adjust the line height for proper spacing */
  padding: 0.5rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

export const GridContainer = styled.div`
  float: right;
  background-color: #f3f3f3;
  width: 200px;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
`;

export const AddressTitle = styled.h3`
  text-align: center;
  font-size: 1.2rem;
`;

export const AdressElement = styled.p`
  text-align: center;
  font-size: 1rem;
`;

export const InfoContainer = styled.div`
  grid-gap: 20px;
`;

export const CalendarContainer = styled.div`
  margin-top: 120px;
  width: fit-content;
  height: fit-content;
  flex: 1;
`;

export const TimeslotsContainer = styled.div`
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
`;

export const TimeslotsItem = styled.p`
  text-align: center;
  max-width: 90px;
  border: 2px solid #d3d3d3;
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 1rem;

  &:hover {
    background-color: #7393b3;
    color: white;
  }

  &.selected {
    background-color: #ed0e2e;
    color: white;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4caf50;
  color: white;
  width: fit-content;
  height: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const TerrainInfo = styled.div``;
