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

  const [centres, setCentres] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);

  const [terrains, setTerrains] = useState([]);

  const [patinoires, setPatinoires] = useState([]);

  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);

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
        setGyms(gymResponse.data);
        setTerrains(terrainsResponse.data);

        console.log("centresResponse ", centresResponse.data);
      } catch (error) {
        console.error("Error " + error);
      }
    };

    fetchData();
  }, []);

  const handleClickPiscine = (id) => {
    setSelectedPiscine(id === selectedPiscine ? null : id);
  };

  const handleClickCentre = (id) => {
    setSelectedCentre(id === selectedCentre ? null : id);
  };

  const handleClickGym = (id) => {
    setSelectedPiscine(id === selectedPiscine ? null : id);
  };

  return (
    <>
      <InfrastructureContainer id="projects">
        <InfrastructureH1>Infrastructures sportives</InfrastructureH1>
        <InfrastructureWrapper>
          {centres.map((centre) => (
            <InfrastructureCard
              key={centre.id_centre}
              onClick={() => handleClickCentre(centre.id_centre)}
              selected={selectedCentre === centre.id_centre}
            >
              <Link to={`/centre/${centre.id_centre}/terrains`}>
                <InfrastructureIcon
                  src={centre.image}
                  alt={centre.nom_centre}
                />
              </Link>
              <InfrastructureH2>{centre.nom_centre}</InfrastructureH2>
            </InfrastructureCard>
          ))}

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
            <InfrastructureCard
              key={gym.id_gym}
              onClick={() => handleClickGym(gym.id_gym)}
              selected={selectedGym === gym.id_gym}
            >
              <Link to={`/gym/${gym.id_gym}/salles`}>
                <InfrastructureIcon src={gym.image} alt={gym.nom_gym} />
              </Link>

              <InfrastructureH2>Salles de gyms</InfrastructureH2>
            </InfrastructureCard>
          ))}
        </InfrastructureWrapper>
      </InfrastructureContainer>
    </>
  );
};

export default InfrastructuresIndex;
