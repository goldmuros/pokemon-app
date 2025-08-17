import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../constants';
import type { PokemonListResponse } from './types';
import { getPokemonDetail } from '../pokemon-detail/usePokemonDetail';
import { pokemonDetailDto } from '../pokemon-detail/pokemonDetailDto';

interface PokemonListParams {
  limit?: number;
  offset?: number;
}

const getPokemonList = async ({limit, offset}: PokemonListParams = {}): Promise<PokemonListResponse> => {
    const response = await axios.get<PokemonListResponse>(
      `${BASE_URL}/pokemon`,
      {
        params: {
          limit,
          offset
        },
        timeout: 10000
      }
    ).then((response) => response.data)

    return response
};

export const usePokemonList = (page = 1, limit = 20) => {
  const offset = (page - 1) * limit;
  
  const pokemonListQuery =  useQuery({
    queryKey: ['getPokemonList', page, limit],
    queryFn: () => getPokemonList({ limit, offset }),
    staleTime: Infinity
  });

  const pokemonIds = pokemonListQuery.data?.results?.map(pokemon => {
    const match = pokemon.url.match(/\/pokemon\/(\d+)\/?$/);
    return match ? match[1] : '';
  }).filter(id => id !== '') || [];

 const pokemonDetailQueries = useQueries({
  queries: pokemonIds.map(id => ({
      queryKey: ["getPokemonDetail", id],
      queryFn: () => getPokemonDetail(id),
      select: (data) => pokemonDetailDto.from(data),
      enabled: Boolean(pokemonListQuery.data),
      staleTime: 1000 * 60 * 15,
      cacheTime: 1000 * 60 * 30,
    }))  
});

const pokemonWithDetails = pokemonDetailQueries
  .filter(hook => hook.data)
  .map(hook => hook.data)

  return {
    pokemonsData: pokemonWithDetails,
    pokemonListQuery,
  };
};
