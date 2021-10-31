import React from "react";

import { Image, Box, Text } from "@chakra-ui/react";
//api
import { getMyPokemon, getSelected } from "../api/myPokemons";

//components
import { Header, CardList } from "../components";
import { ICONS } from "../contants";

function MyPokemon() {
  const [cardData, setCardData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState("");

  const getMyList = () => {
    setLoading(true);
    getMyPokemon().forEach((e) => {
      const [id, name, types] = e.split(";");
      setCardData((prev) => [...prev, { id, name, types: types.split("/") }]);
    });
    setLoading(false);
  };

  React.useEffect(() => {
    setSelected(getSelected());
    getMyList();
  }, []);

  return (
    <Box height="100">
      <Header />
      {cardData.length > 0 && selected === -1 && (
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="50px"
        >
          <Text fontSize="3xl">No selected pokemons yet! click the </Text>
          <Image height="20px" margin="10px " src={ICONS.blankStar.default} />
          <Text fontSize="3xl">to select it!</Text>
        </Box>
      )}
      {cardData.length === 0 && (
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Image
            height="40px"
            src={ICONS.pikachu.default}
            alt="loading"
            marginRight="20px"
          />
          <Text fontSize="3xl">No Pokemons in your team yet.</Text>
          <Image
            height="40px"
            src={ICONS.pikachu.default}
            alt="loading"
            marginLeft="20px"
          />
        </Box>
      )}
      {loading ? (
        <Box w="100%" display="flex" justifyContent="center">
          <Image height="180px" src={ICONS.loading.default} alt="loading" />
        </Box>
      ) : (
        <Box h="40px" margin="auto" maxWidth="677px">
          <CardList
            cardData={cardData}
            myList={true}
            setCardData={setCardData}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      )}
    </Box>
  );
}

export default MyPokemon;
