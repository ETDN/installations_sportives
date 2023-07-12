import styled from "styled-components";

export const Container = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 768px) {
    height: 1100px;
  }

  @media screen and (max-width: 480px) {
    height: 1300px;
  }
`;

export const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 110px;
  padding: 0 50px;
  z-index: 3;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const Card = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 300px;
  transition: all 0.2s ease-in-out;
`;

export const Icon = styled.img`
  height: 250px;
  width: 320px;
  margin-bottom: 20px;
  transition: transform 0.5s ease;
  box-shadow: rgb(237, 14, 46)-10px 10px;
  z-index: 3;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const Titre = styled.h1`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 500;
`;

export const H1 = styled.h1`
  color: black;
  font-weight: 400;
  font-size: 2rem;
  margin-top: 50px;
  margin-bottom: 40px;
  z-index: 3;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const H2 = styled.h2`
  display: flex;
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const Paragraph = styled.p`
  color: black;
  font-size: 1.2rem;
  margin-bottom: 25px;
`;

export const List = styled.ul`
  font-size: 1rem;
  font-weight: 500;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ListElement = styled.li`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 10px;
  cursor: pointer;
  max-width: 200px; /* Set the desired maximum width */

  &:hover {
    color: red;
  }
`;

export const Button = styled.button`
  display: flex;
  margin-top: 10px;
  align-items: center;
  margin-left: 20px;
  justify-content: center;
  background-color: #ed0e2e;
  color: white;
  width: fit-content;
  height: 50px;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
`;
