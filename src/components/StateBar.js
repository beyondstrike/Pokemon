import { Box, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { COLORS } from "../contants";

function StateBar({ title, state }) {
  let name = title.split("-");
  name[0] = name[0][0].toUpperCase() + name[0].substring(1);
  if (name.length > 1) {
    name[1] = name[1][0].toUpperCase() + name[1].substring(1);
  }
  name = name.join(" ");
  return (
    <VStack spacing={1} position="relative" width="50px">
      {[...Array(15)].map((_, i) => (
        <Box
          key={i}
          h="8px"
          w="100%"
          background={
            i < 15 - (state / 15).toFixed() ? COLORS.white : COLORS.primary
          }
        ></Box>
      ))}
      <Text textAlign="center" fontSize="12px" fontWeight="bold">
        {name}
      </Text>
    </VStack>
  );
}

export default StateBar;
