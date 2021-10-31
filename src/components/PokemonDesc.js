import { Button } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import React from "react";
import { COLORS, ICONS } from "../contants";

import { getAbilities } from "../api/PokemonAPI";

function PokemonDesc({ abilities }) {
  //init states
  const [loading, setLoading] = React.useState(true);
  const [current, setCurrent] = React.useState(0);
  const [desc, setDesc] = React.useState("");

  //getting abilities description from Pokemon API
  React.useEffect(() => {
    setLoading(true);
    getAbilities(abilities[current].ability.name)
      .then((res) =>
        setDesc(res.effect_entries.find((a) => a.language.name === "en").effect)
      )
      .catch(console.log);
    setLoading(false);
  }, [current, abilities]);
  return (
    <Box>
      {loading ? ( //displaying loading logo
        <Image src={ICONS.loading2.default} alt="loading" />
      ) : (
        //showing each ability descriptions
        <>
          <Text fontSize="18px">{desc}</Text>
          <Box marginTop="30px" display="flex" alignItems="center">
            <Text fontSize="18px" fontWeight="400" marginRight="15px">
              Abilities:
            </Text>
            <Button
              onClick={() =>
                current === abilities.length - 1
                  ? setCurrent(0)
                  : setCurrent(current + 1)
              }
              _hover={{ bg: COLORS.primary, color: COLORS.white }}
            >
              <Text>{abilities[current].ability.name}</Text>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default PokemonDesc;
