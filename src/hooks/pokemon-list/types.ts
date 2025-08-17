import type { PokemonData } from "../pokemon-detail/types";

export interface PokemonResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResource[];
  pokemons: PokemonData[]
}
