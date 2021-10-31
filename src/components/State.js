import { Box, HStack, Text } from "@chakra-ui/layout";
import React from "react";
import { StateBar } from ".";
import { COLORS } from "../contants";

function State({ stats }) {
  return (
    <Box
      w="100%"
      background={COLORS.darkgray}
      borderRadius="7px"
      padding="15px"
    >
      <Text textAlign="center" fontWeight="bold">
        STATS
      </Text>
      <HStack justifyContent="center" alignItems="baseline" marginTop="20px">
        {stats && //displaying pokemon stats in grapgh ( MADE BY ME )
          stats.map((s, i) => (
            <StateBar key={i} title={s.stat.name} state={s.base_stat} />
          ))}
      </HStack>
    </Box>
  );
}

export default State;
