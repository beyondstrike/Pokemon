import React from "react";
import { Box, Grid, Image, useToast } from "@chakra-ui/react";

import { Card } from ".";
import { COLORS, ICONS } from "../contants";

//api
import { removeMyPokemon } from "../api/myPokemons";

function CardList({
  loading = false, // loading state
  cardData, // all card data [ array ]
  myList = false, // filtering buttons such as delete from list and add selected ( only appears in MyPokemon page )
  setCardData, // to make it dynamic
  selected, // adding css to selected items
  setSelected, // to make dynamic
}) {
  //init toast ui
  const toast = useToast();

  //removing pokemon using local storage demonstration api
  const removePokemon = (id) => {
    removeMyPokemon(id);
    if (selected === id) {
      setSelected(-1);
    }
    setCardData(cardData.filter((e) => e.id !== id));
    toast({
      position: "bottom-left",
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box color={COLORS.white} p={3} bg="red.500">
          Pokemon removed successfully.
        </Box>
      ),
    });
  };

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={4}
    >
      {/* displaying loading logo */}
      {loading ? (
        <Box
          h="100%"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={ICONS.loading.default}
            style={{ height: "100px" }}
            alt="loading"
          />
        </Box>
      ) : (
        // map through all data
        cardData.map((d, i) => (
          <Box key={i} display="flex" justifyContent="flex-end">
            {myList && (
              <Box
                onClick={() => removePokemon(d.id)}
                _hover={{ opacity: 0.7 }}
                position="absolute"
                cursor="pointer"
              >
                <Image height="30px" width="30px" src={ICONS.close.default} />
              </Box>
            )}
            <Card
              id={d.id.padStart(3, "0")}
              selected={d.id === selected}
              setSelected={setSelected}
              title={d.name}
              myList={myList}
              img={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${d.id.padStart(
                3,
                "0"
              )}.png`}
              abilities={d.types}
            />
          </Box>
        ))
      )}
    </Grid>
  );
}

export default CardList;
