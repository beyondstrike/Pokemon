import React from "react";
import { Box } from "@chakra-ui/react";

//components
import { PokemonSearch, Header, CardList } from "../components";

function Home() {
  const [cardData, setCardData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Header />
      <Box width="100%" display="flex" justifyContent="center" marginTop="10px">
        <Box h="40px" minWidth="677px">
          {/* search */}
          <PokemonSearch setCardData={setCardData} setLoading={setLoading} />
          <CardList cardData={cardData} loading={loading} />
        </Box>
      </Box>
    </>
  );
}

export default Home;
