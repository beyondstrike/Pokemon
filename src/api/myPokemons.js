//storage functions for demonstration

//getting all pokemon lists
const getMyPokemon = () => {
  return localStorage.getItem("myPokemons")
    ? localStorage.getItem("myPokemons").split(",")
    : [];
};

//adding pokemon to local storage formart ====>  {id};{name};{abilities}
const addMyPokemon = (pokemon) => {
  //            [saperated by /]
  let myPokemonsList = localStorage.getItem("myPokemons");
  if (myPokemonsList) {
    if (myPokemonsList.split(",").length < 6) {
      myPokemonsList += `,${pokemon}`;
    } else {
      return -1;
    }
  } else {
    myPokemonsList = pokemon;
  }
  localStorage.setItem("myPokemons", myPokemonsList);
  return myPokemonsList.split(",");
};

//Remove from my pokemon list
const removeMyPokemon = (pokemon) => {
  const selectedId = localStorage.getItem("selected") ?? -1;
  if (selectedId === pokemon) {
    localStorage.removeItem("selected");
  }
  const newPokemonList = localStorage
    .getItem("myPokemons")
    .split(",")
    .filter((pok) => pok.split(";")[0] !== pokemon);
  localStorage.setItem("myPokemons", newPokemonList.join(","));
  return newPokemonList;
};

// check if pokemon exists in my list
const checkIfExist = (pokemon) => {
  return localStorage.getItem("myPokemons")
    ? localStorage
        .getItem("myPokemons")
        .split(",")
        .find((pok) => pok.split(";")[0] === pokemon)
    : false;
};

// check selected pokemon if there is any
const getSelected = () => {
  return localStorage.getItem("selected") ?? -1;
};

// changing or removing selected
const setPokemonSelected = (id) => {
  localStorage.setItem("selected", id);
};

export {
  getMyPokemon,
  addMyPokemon,
  removeMyPokemon,
  checkIfExist,
  getSelected,
  setPokemonSelected,
};
