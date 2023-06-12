import styled from "styled-components";

export const BassinContainer = styled.div`
  display: flex;
`;

export const ContainerRight = styled.div`
  display: flex;
  width: 45%;
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
  width: 40%;
  margin-top: 20px;
  margin-left: 30px;
`;

export const CalendarContainer = styled.div`
  background-color: red;
  margin-top: 50px;
  margin-left: 20px;
  margin-bottom: 30px;
  width: fit-content;
  height: fit-content;
  flex: 1;
`;

export const TimeslotsContainer = styled.div`
  flex: 1;
  margin-top: -330px;
  margin-right: 60px;
  float: right;
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
  margin-left: 20px;
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

export const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;

  h2 {
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 8px 16px;
    margin-right: 10px;
    border-radius: 4px;
    border: none;
    color: white;
    background-color: #007bff;
    cursor: pointer;
  }
`;

export const TerrainInfo = styled.div``;
