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
import { Link } from "react-router-dom";

const InfrastructuresIndex = () => {
  const [piscines, setPiscines] = useState([]);
  const [selectedPiscine, setSelectedPiscine] = useState(null);

  const [bassins, setBassins] = useState([]);

  const [centres, setCentres] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);

  const [terrains, setTerrains] = useState([]);

  const [patinoires, setPatinoires] = useState([]);

  const [gyms, setGyms] = useState([]);
  const [salles, setSalles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          centresResponse,
          terrainsResponse,
          piscinesResponse,
          infrastructureResponse,
          patinoireResponse,
          bassinResponse,
          gymResponse,
          salleResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3001/centres"),
          axios.get("http://localhost:3001/terrains"),
          axios.get("http://localhost:3001/piscines"),
          axios.get("http://localhost:3001/infrastructures"),
          axios.get("http://localhost:3001/patinoires"),
          axios.get("http://localhost:3001/bassins"),
          axios.get("http://localhost:3001/gyms"),
          axios.get("http://localhost:3001/salles"),
        ]);

        setPiscines(piscinesResponse.data);
        setCentres(centresResponse.data);
        setPatinoires(patinoireResponse.data);
        setBassins(bassinResponse.data);
        setGyms(gymResponse.data);
        setSalles(salleResponse.data);
        setTerrains(terrainsResponse.data);

        console.log("centresResponse ", centresResponse.data);
      } catch (error) {
        console.error("Error " + error);
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
        console.log(fetchBassins);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBassins();
  }, []);

  const handleClickPiscine = (id) => {
    console.log("Clicked piscine ID:", id);
    setSelectedPiscine(id === selectedPiscine ? null : id);
  };

  useEffect(() => {
    console.log("Selected piscine ntmmmmmmm:", selectedPiscine);
  }, [selectedPiscine]);

  const InfrastructureCard = ({ onClick, selected, children }) => {
    console.log("Selected:", selected);

    return (
      <div onClick={onClick} className={`... ${selected ? "selected" : ""}`}>
        {children}
      </div>
    );
  };

  return (
    <>
      <InfrastructureContainer id="projects">
        <InfrastructureH1>Infrastructures sportives</InfrastructureH1>
        <InfrastructureWrapper>
          {centres.map((centre) => (
            <InfrastructureCard
              key={centre._id}
              onClick={() => {
                if (selectedCentre === centre._id) {
                  setSelectedCentre(null);
                } else {
                  setSelectedCentre(centre._id);
                }
              }}
            >
              <InfrastructureIcon
                src={centre.image}
                alt={centre.nom_centre}
              ></InfrastructureIcon>
              <InfrastructureH2>{centre.nom_centre}</InfrastructureH2>
            </InfrastructureCard>
          ))}

          {selectedCentre && (
            <div>
              <h3>
                Terrains de{" "}
                {centres.find((p) => p._id === selectedCentre).nom_centre}
              </h3>
              <ul>
                {centres
                  .find((p) => p._id === selectedCentre)
                  .terrains.map((terrainId) => {
                    const terrain = terrains.find(
                      (b) => b.id_terrain === terrainId
                    );
                    return <li key={terrain._id}>{terrain.nom_terrain}</li>;
                  })}
              </ul>
            </div>
          )}

          {piscines.map((piscine) => (
            <InfrastructureCard
              key={piscine.id_piscine}
              onClick={() => handleClickPiscine(piscine.id_piscine)}
              selected={selectedPiscine === piscine.id_piscine}
            >
              <Link to={`/piscine/${piscine.id_piscine}/bassins`}>
                <InfrastructureIcon
                  src={piscine.image}
                  alt={piscine.nom_piscine}
                />
              </Link>
              <InfrastructureH2>{piscine.nom_piscine}</InfrastructureH2>
            </InfrastructureCard>
          ))}

          {patinoires.map((patinoire) => (
            <InfrastructureCard key={patinoire._id}>
              <InfrastructureIcon
                src={patinoire.image}
                alt={patinoire.nom_patinoire}
              ></InfrastructureIcon>
              <InfrastructureH2>{patinoire.nom_patinoire}</InfrastructureH2>
            </InfrastructureCard>
          ))}

          {gyms.map((gym) => (
            <InfrastructureCard key={gym._id}>
              <InfrastructureIcon
                src={gym.image}
                alt={gym.nom_gym}
              ></InfrastructureIcon>
              <InfrastructureH2>Salles de gyms</InfrastructureH2>
            </InfrastructureCard>
          ))}
        </InfrastructureWrapper>
      </InfrastructureContainer>
    </>
  );
};

export default InfrastructuresIndex;
