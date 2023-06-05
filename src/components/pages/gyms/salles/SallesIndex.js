import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  List,
  ListElement,
  Paragraph,
  Titre,
} from "../../infrastructures/InfrastructureElement";
import { ContainerImg, ContainerSalle, IconGym } from "./SalleElement";

const SallesIndex = () => {
  const { id_gym } = useParams();
  const [gym, setGym] = useState(null);
  const [gyms, setGyms] = useState(null);
  const [salles, setSalles] = useState([]);

  useEffect(() => {
    const fetchGym = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/gyms/${id_gym}?_embed=salles`
        );
        const data = response.data;
        console.log("Gym data:", data);
        setGym(data);
        setGyms(data.gymsInfo);
        setSalles(data.sallesInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGym();
  }, [id_gym]);

  if (!gym) {
    return <div>Loading...</div>;
  }

  console.log("Salles:", salles);
  console.log("Image:", gym.image);

  return (
    <ContainerSalle>
      <Titre>Salles de gym</Titre>
      <Paragraph>
        Sierre dispose d’une quinzaine de salles de gym situées aux quatre
        points cardinaux de la ville
      </Paragraph>
      <ContainerImg>
        <IconGym src="https://storage.googleapis.com/infrastructures_sportives/gyms.jpeg" />
      </ContainerImg>
      <List>
        {salles && salles.length > 0 ? (
          salles.map((salle) => (
            <ListElement key={salle._id}>
              {salle.nom_salle} {salle.utilisation}
            </ListElement>
          ))
        ) : (
          <ListElement>Aucune salle disponible</ListElement>
        )}
      </List>
    </ContainerSalle>
  );
};

export default SallesIndex;
