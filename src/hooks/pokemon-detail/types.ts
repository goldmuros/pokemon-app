export interface PokemonDataStats {
  attack: number;
  defense: number;
  hp: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonData {
  id: number;
  moves: string[];
  name: string;
  number: number;
  stats: PokemonDataStats;
  types: string[];
}