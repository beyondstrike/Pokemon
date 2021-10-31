import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const getAll = () =>
  api.get("/pokemon?limit=898").then((res) => res.data.results);

const getPokemon = (id) => api.get(`/pokemon/${id}`).then((res) => res.data);

const getRandom = () =>
  api
    .get(`/pokemon/${Math.floor(Math.random() * 899)}`)
    .then((res) => res.data);

const getTypes = (id) =>
  api.get(`/type/${id}`).then((res) => res.data.damage_relations);

const getAbilities = (id) => api.get(`/ability/${id}`).then((res) => res.data);

export { getAll, getPokemon, getRandom, getTypes, getAbilities };
