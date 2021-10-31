import React from "react";
import {
  HStack,
  Text,
  Input,
  Button,
  Box,
  VStack,
  Image,
} from "@chakra-ui/react";

//contants
import { COLORS, ICONS } from "../contants";

//api
import { getRandom, getPokemon } from "../api/PokemonAPI";

//context
import { PokemonContext } from "../context";

function PokemonSearch({ setCardData, setLoading }) {
  //init states
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState([]);

  //getting context data
  const { data } = React.useContext(PokemonContext);

  //surpiseMe
  const surpiseMe = () => {
    setLoading(true);
    getRandom()
      .then((res) => {
        setCardData([
          {
            id: `${res.id}`,
            name: res.name,
            types: res.types.map(
              (t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
            ),
          },
        ]);
        setSearch("");
        setLoading(false);
      })
      .catch(console.log);
  };

  // show resuts
  const searchSubmit = () => {
    if (data.find((e) => e.name === search)) {
      setLoading(true);
      getPokemon(search)
        .then((res) => {
          res.id <= 898 &&
            setCardData([
              {
                id: `${res.id}`,
                name: res.name,
                types: res.types.map(
                  (t) =>
                    t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
                ),
              },
            ]);
          setSearch("");
          setLoading(false);
        })
        .catch(console.log);
    } else {
      setCardData([]);
      setSearch("");
    }
  };

  // handling result click
  const handleSearch = (s) => {
    setSearch(s);
  };

  // handle input change for search suggestion
  React.useEffect(() => {
    // console.log(results[0], search === results[0].name);
    search.length > 0
      ? setResults(
          data.filter((each) => each.name.includes(search)).slice(0, 4)
        )
      : setResults([]);
  }, [search, data]);

  //handling search bug
  React.useEffect(() => {
    if (results[0] && search === results[0].name) {
      setResults([]);
    }
  }, [results, search]);

  return (
    <Box>
      {/* search input */}
      <HStack alignItems="flex-start">
        <Box w="100%" h="160px">
          <VStack spacing={0}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a pokemon..."
              size="md"
              value={search}
            />
            {results.map((each, key) => (
              <Button
                key={key}
                w="100%"
                padding="1"
                background={COLORS.white}
                justifyContent="flex-start"
                onClick={() => handleSearch(each.name)}
              >
                {each.name}
              </Button>
            ))}
          </VStack>
        </Box>
        <Button marginTop="20px" colorScheme="blue" onClick={searchSubmit}>
          <Image w="30px" src={ICONS.search.default} alt="Search" />
        </Button>
        <Button
          padding="0 30px"
          marginTop="20px"
          colorScheme="blue"
          onClick={surpiseMe}
        >
          <Image
            h="20px"
            w="20px"
            marginRight="1"
            marginLeft="15"
            src={ICONS.random.default}
            alt="Random"
          />
          <Text fontSize="md" marginRight="5">
            Surprise Me!
          </Text>
        </Button>
      </HStack>
      {/* results */}
    </Box>
  );
}

export default PokemonSearch;
