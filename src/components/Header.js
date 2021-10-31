import React from "react";
import { Link } from "react-router-dom";
import { Image, Box, Text } from "@chakra-ui/react";
import { ICONS } from "../contants";

// Navbar to make easier for users to nav through
function Header() {
  return (
    <Box
      padding="10"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Link to="/">
        <Box display="flex" alignItems="center" cursor="pointer">
          <Image
            objectFit="contain"
            height="60px"
            marginRight="15px"
            src={ICONS.pokemonLOGO.default}
          />
          <Text fontSize="4xl">POKEMON</Text>
        </Box>
      </Link>
      <Link to="/myPokemon">
        <Box display="flex" alignItems="center" cursor="pointer">
          <Text fontSize="sm" fontWeight="bold">
            MY POKEMON
          </Text>
          <Image
            objectFit="contain"
            height="30px"
            marginLeft="5px"
            src={ICONS.myPokemons.default}
          />
        </Box>
      </Link>
    </Box>
  );
}

export default Header;
