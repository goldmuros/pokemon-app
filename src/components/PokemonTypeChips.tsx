import { alpha, Chip, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

interface PokemonTypeChipsProps {
  types?: string[];
}
const PokemonTypeChips = ({ types }: PokemonTypeChipsProps): ReactNode => {
  const theme = useTheme();

  if (!types) return null;
  return types.map((type, index) => (
    <Chip
      key={index}
      label={type.trim()}
      size='small'
      variant='outlined'
      sx={{
        marginRight: 0.5,
        marginBottom: 0.5,
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }}
    />
  ));
};

export default PokemonTypeChips;
