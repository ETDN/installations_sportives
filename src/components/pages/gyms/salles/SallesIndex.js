import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, List, ListElement, Titre } from "./SalleElement";

const SallesIndex = () => {
  const { id_gym } = useParams();
  const [gym, setGym] = useState(null);
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

  return (
    <Container>
      <Titre>Salles de gym</Titre>
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
    </Container>
  );
};

export default SallesIndex;
