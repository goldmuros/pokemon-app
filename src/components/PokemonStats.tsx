import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import type { PokemonDataStats } from '../hooks/pokemon-detail/types';

interface PokemonStatsProps {
  stats: PokemonDataStats;
}

const PokemonStats = ({ stats }: PokemonStatsProps): ReactNode => {
  return (
    <Stack spacing={2}>
      {[
        { label: 'HP', value: stats.hp },
        { label: 'Attack', value: stats.attack },
        { label: 'Defense', value: stats.defense },
        { label: 'Speed', value: stats.speed },
        { label: 'Special Attack', value: stats.specialAttack },
        { label: 'Special Defense', value: stats.specialDefense },
      ].map((stat) => (
        <Box key={stat.label}>
          <Typography variant='body2' sx={{ fontWeight: 'bold', mb: 1 }}>
            {stat.label}: {stat.value}
          </Typography>
          <LinearProgress
            variant='determinate'
            value={stat.value}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default PokemonStats;
