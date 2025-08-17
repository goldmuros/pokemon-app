import type { PokemonData, PokemonDataStats } from "./types";

export const pokemonDetailDto = {
  from: (data): PokemonData => {
    return {
      id: data.id,
      name: data.name,
      number: data.order,
      types: data.types.map(data => data.type.name),
      moves: data.moves.map(data => data.move.name),
      stats: statsDto(data.stats)
  }}
}

const statsDto = (stats): PokemonDataStats => {
  const stat = {} as PokemonDataStats;

  stats.forEach(statData => {
    switch (statData.stat.name) {
      case "hp": stat.hp = statData.base_stat;
      break
      case "attack": stat.attack = statData.base_stat;
      break
      case "defense": stat.defense = statData.base_stat;
      break
      case "special-attack": stat.specialAttack = statData.base_stat;
      break
      case "special-defense": stat.specialDefense = statData.base_stat;
      break
      case "speed": stat.speed = statData.base_stat;
      break
    }
  });
  
  return stat
}