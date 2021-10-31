import { Image } from "@chakra-ui/image";
import { Box, Grid, Text } from "@chakra-ui/layout";
import React from "react";
import { COLORS, ICONS } from "../contants";

function Character({ character }) {
  return (
    <Box>
      <Grid
        background={COLORS.primary}
        padding="15px"
        borderRadius="10px"
        marginTop="40px"
        templateColumns={["repeat(2, 1fr)"]}
        gap={4}
      >
        {/* displaying characteristics in grid */}
        {Object.keys(character).map((key, i) => (
          <Box key={i} padding="5px" opacity="0.95">
            <Text color={COLORS.white} fontWeight="400">
              {key}
            </Text>
            <Text fontSize="18px" fontWeight="600" marginTop="5px">
              {key === "Height"
                ? `${character[key] * 10} cm`
                : key === "Weight"
                ? `${character[key]} g`
                : character[key]}
            </Text>
          </Box>
        ))}
        {/* adding gender icons */}
        <Box padding="5px" opacity="0.95">
          <Text color={COLORS.white} fontWeight="400">
            Gender
          </Text>
          <Box marginTop="5px" display="flex">
            <Image w="18px" margin="5px" src={ICONS.male.default} alt="male" />
            <Image
              w="18px"
              margin="5px"
              src={ICONS.female.default}
              alt="female"
            />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default Character;
