import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

//screens
import { Home, MyPokemon, PokemonDetails } from "./screens";

//contexts
import { PokemonContext } from "./context";

//api
import { getAll } from "./api/PokemonAPI";

function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getAll().then((res) => setData(res));
  }, []);
  return (
    <PokemonContext.Provider value={{ data }}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route path="/PokemonDetails/:id" component={PokemonDetails} />
            <Route path="/MyPokemon" component={MyPokemon} />
            <Route path="/*" component={Home} />
          </Switch>
        </Router>
      </ChakraProvider>
    </PokemonContext.Provider>
  );
}

export default App;
