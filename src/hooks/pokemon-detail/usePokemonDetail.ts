import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { pokemonDetailDto } from "./pokemonDetailDto";
import { BASE_URL } from "../constants";

export const getPokemonDetail = async (id: string): Promise<unknown> => {
  const response = await axios.get(
      `${BASE_URL}/pokemon/${id}`,
    ).then((response) => response.data)

  return response
}

export const usePokemonDetail = (
  id: string
) => {
  return useQuery({
    queryKey: ["getPokemonDetail"],
    queryFn: () => getPokemonDetail(id),
    select: (data) => pokemonDetailDto.from(data)
  });
};