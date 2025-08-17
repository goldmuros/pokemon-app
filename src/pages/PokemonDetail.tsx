import { useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/pokemon-detail/usePokemonDetail';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  getFavoritePokemons,
  LOCAL_STORAGE_FAVORITE,
  saveFavoritePokemons,
} from '../utils/localStorage';
import type { PokemonData, PokemonDataStats } from '../hooks/pokemon-detail/types';
import PokemonTypeChips from '../components/PokemonTypeChips';
import PokemonStats from '../components/PokemonStats';

const PokemonDetail = (): ReactNode => {
  const [isDisplayAlertSuccess, setIsDisplayAlertSuccess] = useState(false);
  const [isDisplayAlertError, setIsDisplayAlertError] = useState(false);

  const navigate = useNavigate();
  const { id = '1' } = useParams();

  const { data: pokemon } = usePokemonDetail(id);

  const existFavoritePokemon = () => {
    const localStoragePokemon = getFavoritePokemons(LOCAL_STORAGE_FAVORITE);
    let pokemonList: PokemonData[] = [];
    if (localStoragePokemon) {
      pokemonList = JSON.parse(localStoragePokemon);
    }

    return pokemonList.some((pokemon) => pokemon.id === parseInt(id));
  };

  const addFavorites = () => {
    if (!existFavoritePokemon()) {
      saveFavoritePokemons(LOCAL_STORAGE_FAVORITE, pokemon ?? ({} as PokemonData));
      setIsDisplayAlertSuccess(true);
    } else {
      setIsDisplayAlertError(true);
    }
  };

  const handleBackToList = () => {
    navigate('/');
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <Container
      maxWidth='md'
      sx={{ py: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Box
        sx={{
          textAlign: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1,
          }}
        >
          Detail of {pokemon?.name}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            color: 'text.secondary',
            textTransform: 'capitalize',
          }}
        >
          Pokemon #{pokemon?.number}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {isDisplayAlertSuccess && (
          <Alert severity='success' onClose={() => setIsDisplayAlertSuccess(false)} sx={{ mb: 3 }}>
            {`${pokemon?.name} was added to favorites!`}
          </Alert>
        )}
        {isDisplayAlertError && (
          <Alert severity='error' onClose={() => setIsDisplayAlertError(false)} sx={{ mb: 3 }}>
            {`${pokemon?.name} has already been added to favorites`}
          </Alert>
        )}
        <Grid container spacing={3} sx={{ flex: 1, maxHeight: '600px', overflow: 'auto' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, height: 'fit-content' }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                Basic Information
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                    Name:
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ ml: 1, pt: '2px', textTransform: 'capitalize' }}
                  >
                    {pokemon?.name}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                    Number:
                  </Typography>
                  <Typography variant='body1' sx={{ ml: 1, pt: '3px' }}>
                    #{pokemon?.number}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mr: 1 }}>
                    Types:
                  </Typography>
                  <PokemonTypeChips types={pokemon?.types} />
                </Box>

                <Box sx={{ textAlign: 'center', pt: 2 }}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={addFavorites}
                    sx={{ px: 4, py: 1 }}
                  >
                    Add to Favoritos
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{ p: 3, height: 'fit-content', maxHeight: '237px', overflow: 'auto' }}
            >
              <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                Stats
              </Typography>

              <PokemonStats stats={pokemon?.stats ?? ({} as PokemonDataStats)} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={2}
              sx={{ p: 3, maxHeight: '240px', display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                Moves
              </Typography>

              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  flex: 1,
                  overflow: 'auto',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                {pokemon?.moves.map((move, index) => (
                  <ListItem
                    key={`move-${index}`}
                    sx={{
                      borderBottom: index < pokemon.moves.length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider',
                    }}
                  >
                    <ListItemText
                      primary={move}
                      sx={{
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box
        component='footer'
        sx={{
          mt: 3,
          py: 3,
          backgroundColor: 'background.paper',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Button
          variant='contained'
          onClick={handleBackToList}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
          }}
        >
          Back to List
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleGoToFavorites}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
          }}
        >
          View Favorites
        </Button>
      </Box>
    </Container>
  );
};

export default PokemonDetail;
