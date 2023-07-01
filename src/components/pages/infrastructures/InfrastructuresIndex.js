import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  Container,
  H1,
  Icon,
  H2,
  Wrapper,
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
          patinoireResponse,
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
      <Container id="projects">
        <H1>Infrastructures sportives</H1>
        <Wrapper>
          {centres.map((centre) => (
            <Card
              key={centre.id_centre}
              onClick={() => handleClickCentre(centre.id_centre)}
              selected={selectedCentre === centre.id_centre}
            >
              <Link to={`/centre/${centre.id_centre}/terrains`}>
                <Icon src={centre.image} alt={centre.nom_centre} />
              </Link>
              <H2>{centre.nom_centre}</H2>
            </Card>
          ))}

          {piscines.map((piscine) => (
            <Card
              key={piscine.id_piscine}
              onClick={() => handleClickPiscine(piscine.id_piscine)}
              selected={selectedPiscine === piscine.id_piscine}
            >
              <Link to={`/piscine/${piscine.id_piscine}/bassins`}>
                <Icon src={piscine.image} alt={piscine.nom_piscine} />
              </Link>
              <H2>{piscine.nom_piscine}</H2>
            </Card>
          ))}

          {patinoires.map((patinoire) => (
            <Card key={patinoire._id}>
              <Icon src={patinoire.image} alt={patinoire.nom_patinoire}></Icon>
              <H2>{patinoire.nom_patinoire}</H2>
            </Card>
          ))}

          {gyms.map((gym) => (
            <Card
              key={gym.id_gym}
              onClick={() => handleClickGym(gym.id_gym)}
              selected={selectedGym === gym.id_gym}
            >
              <Link to={`/gym/${gym.id_gym}/salles`}>
                <Icon src={gym.image} alt={gym.nom_gym} />
              </Link>

              <H2>Salles de gyms</H2>
            </Card>
          ))}
        </Wrapper>
      </Container>
    </>
  );
};

export default InfrastructuresIndex;
