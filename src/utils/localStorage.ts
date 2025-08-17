import type { PokemonData } from "../hooks/pokemon-detail/types";
export const LOCAL_STORAGE_FAVORITE = 'favoritePokemons'
export const saveFavoritePokemons = (storageName: string, pokemon: PokemonData) => {
  const storageData = getFavoritePokemons(storageName)

  let data = []
  if (storageData) {
    const oldData = [...JSON.parse(storageData)] as PokemonData []

    data = [...oldData, pokemon]
  } else {
    data.push(pokemon)
  }

  localStorage.setItem(storageName, JSON.stringify(data));
};

export const getFavoritePokemons = (storageName: string) => localStorage.getItem(storageName);