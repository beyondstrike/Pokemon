import { Box, Grid, Text } from "@chakra-ui/layout";
import React from "react";
import { COLORS } from "../contants";

//api
import { getTypes } from "../api/PokemonAPI";

function Additinal({ data }) {
  //init stats
  const [double, setDouble] = React.useState([]);
  const [half, setHalf] = React.useState([]);
  const [non, setNone] = React.useState([]);

  // algorithm to find all weaknesses
  React.useEffect(() => {
    data.map((e) => {
      return getTypes(e.toLowerCase()).then((res) => {
        setDouble((prev) => [
          ...prev,
          ...res.double_damage_from.map(
            (s) => s.name[0].toUpperCase() + s.name.substring(1)
          ),
        ]);
        setHalf((prev) => [
          ...prev,
          ...res.half_damage_from.map(
            (s) => s.name[0].toUpperCase() + s.name.substring(1)
          ),
        ]);
        setNone((prev) => [
          ...prev,
          ...res.no_damage_from.map(
            (s) => s.name[0].toUpperCase() + s.name.substring(1)
          ),
        ]);
      });
    });
  }, [data]);

  return (
    <Box>
      <Box>
        <Text fontSize="xl" marginTop="20px" marginBottom="15px">
          Type
        </Text>
        <Grid gap={2} w="100%" templateColumns={"repeat(3, 1fr)"}>
          {data.map((e, i) => (
            <Box
              key={i}
              w="100%"
              background={COLORS[e]}
              padding="5px"
              borderRadius="5px"
            >
              <Text color={COLORS.white} textAlign="center">
                {e}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>
      <Box>
        <Text fontSize="xl" marginTop="20px" marginBottom="15px">
          Weaknesses
        </Text>
        <Grid gap={2} w="100%" templateColumns={"repeat(3, 1fr)"}>
          {[...new Set(double)].map((e, i) => {
            if (!half.includes(e) && !non.includes(e)) {
              return (
                <Box
                  key={i}
                  w="100%"
                  background={COLORS[e]}
                  padding="5px"
                  borderRadius="5px"
                >
                  <Text color={COLORS.white} textAlign="center">
                    {e}
                  </Text>
                </Box>
              );
            } else {
              return "";
            }
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default Additinal;
