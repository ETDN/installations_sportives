import styled from "styled-components";
import css from "styled-components";

export const BassinContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const BassinList = styled.ul`
  list-style-type: none;
  float: left;
`;

export const BassinImg = styled.img`
  float: right;
  margin-bottom: 20px;
`;

export const ListElement = styled.li`
  position: relative;
  margin-left: 20px;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export const CheckboxBassin = styled.input`
  margin-left: 5px;
`;

export const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;

  @media (min-width: 768px) {
    width: 45%;
  }
`;

export const WrapperImg = styled.div`
  margin-top: 30px;
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
  max-height: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

export const GridContainer = styled.div`
  float: right;
  background-color: #f3f3f3;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  text-align: center;

  @media (min-width: 768px) {
    width: 200px;
  }
`;

export const AddressTitle = styled.h3`
  text-align: center;
  font-size: 1.2rem;
`;

export const AddressElement = styled.p`
  text-align: center;
  font-size: 1rem;
`;

export const InfoContainer = styled.div`
  margin-top: 20px;
  margin-left: 30px;

  @media (min-width: 768px) {
    width: 45%;
  }
`;

export const CalendarContainer = styled.div`
  background-color: red;
  margin-top: 50px;
  margin-left: 20px;
  margin-bottom: 30px;
  width: fit-content;
  height: fit-content;
  flex: 1;

  @media screen and (max-width: 480px) {
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 0;
    width: 50%;
    height: 200px;
  }
`;

export const TimeslotsContainer = styled.div`
  float: right;
  margin-top: 50px;
  margin-right: 100px;
  max-height: 300px;
  overflow-y: auto;

  @media (min-width: 768px) {
    height: 270px;
  }
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

  ${(props) =>
    props.reserved &&
    css`
      background-color: yellow;
    `}
`;

export const Button = styled.button`
  display: flex;
  margin-top: 120px;
  align-items: center;
  margin-left: 20px;
  justify-content: center;
  background-color: #ed0e2e;
  color: white;
  width: fit-content;
  height: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }
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
