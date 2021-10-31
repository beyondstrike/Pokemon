import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { COLORS } from "../contants";

// title component for details page
function DetailsTitle({ title, id }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop="0px"
      marginBottom="20px"
      background={COLORS.white}
    >
      <Text marginRight="2" fontSize="4xl">
        {title}
      </Text>
      <Text fontSize="4xl" color={COLORS.darkgray}>
        #{id}
      </Text>
    </Box>
  );
}

export default DetailsTitle;
