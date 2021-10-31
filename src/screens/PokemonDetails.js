import React from "react";
import { Box, Image, Grid, useToast } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { COLORS, ICONS } from "../contants";

//components
import {
  Character,
  DetailsTitle,
  State,
  Additinal,
  PokemonDesc,
  Header,
} from "../components";

//api
import { getPokemon } from "../api/PokemonAPI";

//storage functions
import { checkIfExist, addMyPokemon, removeMyPokemon } from "../api/myPokemons";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isInMyTeam, setIsInMyTeam] = React.useState(false);

  //init toast ui
  const toast = useToast();

  //add/remove pokemon
  const removeAdd = () => {
    if (isInMyTeam) {
      removeMyPokemon(id);
      setIsInMyTeam(false);
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
    } else {
      if (
        addMyPokemon(
          `${id};${
            pokemon.name[0].toUpperCase() + pokemon.name.substring(1)
          };${pokemon.types
            .map((e) => e.type.name[0].toUpperCase() + e.type.name.substring(1))
            .join("/")}`
        ) !== -1
      ) {
        setIsInMyTeam(true);
        toast({
          position: "bottom-left",
          duration: 3000,
          isClosable: true,
          render: () => (
            <Box color={COLORS.white} p={3} bg="blue.500">
              Pokemon added successfully.
            </Box>
          ),
        });
      } else {
        toast({
          position: "bottom-left",
          duration: 3000,
          isClosable: true,
          render: () => (
            <Box color={COLORS.white} p={3} bg="green.500">
              Your Pokemon team is FULL.
            </Box>
          ),
        });
      }
    }
  };

  React.useEffect(() => {
    setIsInMyTeam(checkIfExist(id));
    getPokemon(parseInt(id))
      .then((res) => {
        setPokemon(res);
        console.log(res);
        setLoading(false);
      })
      .catch(console.log);
  }, [id]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <Box position="relative">
      <Header />
      <DetailsTitle
        title={pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
        id={id}
      />
      <Grid
        maxWidth="890px"
        margin="auto"
        padding="20px"
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
        ]}
        gap={4}
      >
        <Box w="100%" margin="10px" position="relative">
          <Box
            position="absolute"
            left="0"
            top="0"
            margin="10px"
            padding="5px"
            borderRadius="10px"
            cursor="pointer"
            onClick={removeAdd}
            title={isInMyTeam ? "Remove from my team" : "Add to my team"}
            _hover={{ background: "dodgerblue" }}
          >
            <Image
              height="50px"
              width="50px"
              objectFit="contain"
              src={
                isInMyTeam
                  ? ICONS.removePokemon.default
                  : ICONS.addPokemon.default
              }
            />
          </Box>
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`}
            background={COLORS.lightgray}
            borderRadius="10px"
            w="100%"
            marginBottom="20px"
            alt={`#${id.padStart(3, "0")}`}
          />
          <State stats={pokemon.stats} />
        </Box>
        <Box w="100%" margin="10px">
          <PokemonDesc abilities={pokemon.abilities} />
          <Character
            character={{
              Height: pokemon.height,
              Moves: pokemon.moves.length,
              Weight: pokemon.weight,
              "Base Experience": pokemon.base_experience,
            }}
          />
          <Additinal
            data={pokemon.types.map(
              (e) => e.type.name[0].toUpperCase() + e.type.name.substring(1)
            )}
          />
        </Box>
      </Grid>
    </Box>
  );
}

export default PokemonDetails;
