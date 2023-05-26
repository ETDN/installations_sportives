import styled from "styled-components";
import "typeface-roboto";

export const InfrastructureContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const InfrastructureBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
export const VideoBg = styled.img`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a40;
`;

export const InfrastructureWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 65px;
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

export const InfrastructureCard = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 300px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const InfrastructureIcon = styled.img`
  height: 220px;
  width: 280px;
  margin-bottom: 20px;
  transition: transform 0.5s ease;
  box-shadow: rgb(237, 14, 46)-10px 10px;
  z-index: 3;
`;

export const InfrastructureH1 = styled.h1`
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  font-size: 2rem;
  margin-top: 250px;
  margin-bottom: 40px;
  z-index: 3;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const InfrastructureH2 = styled.h2`
  display: flex;
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
  font-size: 1.4rem;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const InfrastructureP = styled.p`
  color: black;
  font-size: 1rem;
  text-align: center;
`;
