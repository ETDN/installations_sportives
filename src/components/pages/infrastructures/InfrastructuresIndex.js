import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  InfrastructureCard,
  InfrastructureContainer,
  InfrastructureH1,
  InfrastructureH2,
  InfrastructureIcon,
  InfrastructureWrapper,
} from "./InfrastructureElement";

const InfrastructuresIndex = () => {
  const [piscines, setPiscines] = useState([]);
  const [centres, setCentres] = useState([]);
  const [patinoires, setPatinoires] = useState([]);
  const [bassins, setBassins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          piscinesResponse,
          centresResponse,
          infrastructureResponse,
          patinoireResponse,
          bassinResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3001/piscines"),
          axios.get("http://localhost:3001/centres"),
          axios.get("http://localhost:3001/infrastructures"),
          axios.get("http://localhost:3001/patinoires"),
          axios.get("http://localhost:3001/bassins"),
        ]);

        console.log("Piscines Response:", piscinesResponse.data);
        console.log("Centres Response:", centresResponse.data);
        console.log("Infrastructure Response:", infrastructureResponse.data);
        console.log("Patinoire Response:", patinoireResponse.data);
        console.log("Bassins Response:", bassinResponse.data);

        setPiscines(piscinesResponse.data);
        setCentres(centresResponse.data);
        setPatinoires(patinoireResponse.data);
        setBassins(bassinResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBassins = async () => {
      try {
        const bassinsResponse = await axios.get(
          "http://localhost:3001/bassins"
        );
        const fetchedBassins = bassinsResponse.data;
        setBassins(fetchedBassins);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBassins();
  }, []);

  const getBassinName = (bassinId) => {
    const bassin = bassins.find((b) => b.id_bassin === bassinId);
    return bassin ? bassin.nom_bassin : "Unknown";
  };

  return (
    <>
      <InfrastructureContainer id="projects">
        <InfrastructureH1>Infrastructures sportives</InfrastructureH1>
        <InfrastructureWrapper>
          {centres.map((centre) => (
            <InfrastructureCard key={centre._id}>
              {/* <img src={piscine} alt={centre.nom_piscine} /> */}
              <InfrastructureIcon
                src={centre.image}
                alt={centre.nom_centre}
              ></InfrastructureIcon>
              <InfrastructureH2>{centre.nom_centre}</InfrastructureH2>
            </InfrastructureCard>
          ))}

          {piscines.map((piscine) => (
            <InfrastructureCard key={piscine._id}>
              <InfrastructureIcon
                src={piscine.image}
                alt={piscine.nom_piscine}
              ></InfrastructureIcon>
              <InfrastructureH2>{piscine.nom_piscine}</InfrastructureH2>
            </InfrastructureCard>
          ))}

          {patinoires.map((patinoire) => (
            <InfrastructureCard key={patinoire._id}>
              <InfrastructureIcon />
              <InfrastructureH2>{patinoire.nom_patinoire}</InfrastructureH2>
            </InfrastructureCard>
          ))}
        </InfrastructureWrapper>
      </InfrastructureContainer>
    </>
  );
};

export default InfrastructuresIndex;
