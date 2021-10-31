import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

//contants
import { COLORS, ICONS } from "../contants";

//api
import { setPokemonSelected } from "../api/myPokemons";

function Card({ id, title, img, abilities, selected, setSelected, myList }) {
  //handling redirect with click
  const history = useHistory();

  //setSelectedPokemon
  const setSele = (id) => {
    setSelected(id);
    setPokemonSelected(id);
  };
  return (
    <Box
      cursor="pointer"
      w="100%"
      marginTop="0"
      bg={COLORS.white}
      padding="2px"
      borderWidth={selected ? "2px" : 0}
      borderColor={COLORS.primary}
    >
      {myList && (
        <Box
          onClick={() => setSele(id)}
          position="absolute"
          padding="5px"
          zIndex="100"
          _hover={{ opacity: 0.7 }}
        >
          <Image
            height="25px"
            width="25px"
            src={selected ? ICONS.star.default : ICONS.blankStar.default}
          />
        </Box>
      )}
      <Box onClick={() => history.push(`/PokemonDetails/${id}`)}>
        <Image
          src={img}
          alt="646"
          style={{
            width: "100%",
            background: COLORS.lightgray,
            borderRadius: 10,
          }}
        />
        <Box marginLeft="10px">
          <Text fontSize="xs" fontWeight="bold" color={COLORS.darkgray}>
            #{id}
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="600"
            marginTop="5px"
            color={COLORS.dark}
          >
            {title}
          </Text>
          {/* Abilities */}
          <Box display="flex" marginTop="5px">
            {abilities.map((ability, id) => (
              <Box
                key={id}
                w="90px"
                lineHeight="18px"
                fontSize="11px"
                textAlign="center"
                borderRadius="3px"
                marginRight="6px"
                padding="2px"
                background={COLORS[ability] ?? COLORS.primary}
              >
                {ability}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
