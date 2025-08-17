import { useEffect, useState, type ReactNode } from 'react';
import type { PokemonData } from '../hooks/pokemon-detail/types';
import { getFavoritePokemons, LOCAL_STORAGE_FAVORITE } from '../utils/localStorage';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  styled,
  Typography,
  type IconButtonProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useNavigate } from 'react-router-dom';
import PokemonTypeChips from '../components/PokemonTypeChips';
import PokemonStats from '../components/PokemonStats';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const PokemonFavorites = (): ReactNode => {
  const [pokemonsData, setPokemonsData] = useState<PokemonData[]>();
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = getFavoritePokemons(LOCAL_STORAGE_FAVORITE);

    if (localStorageData) setPokemonsData(JSON.parse(localStorageData));
  }, []);

  const handleCardClick = (pokemonNumber: number) => {
    navigate(`/detail/${pokemonNumber}`);
  };

  const handleBackToList = () => {
    navigate('/');
  };

  const handleExpandClick = (event: React.MouseEvent<HTMLButtonElement>, cardIndex: number) => {
    event.stopPropagation();
    setExpandedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  const deleteFavorites = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();

    if (pokemonsData) {
      const newPokemonArray = [...pokemonsData];
      newPokemonArray.splice(index, 1);
      setPokemonsData(newPokemonArray);

      localStorage.setItem(LOCAL_STORAGE_FAVORITE, JSON.stringify(newPokemonArray));
    }
  };

  return (
    <Container maxWidth='xl' sx={{ py: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant='h3'
          component='h1'
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <FavoriteIcon sx={{ fontSize: 'inherit', color: 'error.main' }} />
          Favorites Pokemons
        </Typography>
        <Typography variant='h6' sx={{ color: 'text.secondary' }}>
          {pokemonsData?.length === 0
            ? 'You have not favorite pokemons'
            : `${pokemonsData?.length} Pokemon${pokemonsData && pokemonsData.length > 1 ? 's' : ''} in your colection`}
        </Typography>
      </Box>
      {pokemonsData?.length === 0 && (
        <Paper
          elevation={1}
          sx={{
            p: 6,
            textAlign: 'center',
            mb: 4,
            backgroundColor: 'background.default',
          }}
        >
          <Typography variant='h6' sx={{ mb: 2, color: 'text.secondary' }}>
            You haven't added any Pokemon to your favorites yet!
          </Typography>
          <Typography variant='body1' sx={{ mb: 3, color: 'text.secondary' }}>
            Browse the Pokemon list and add your favorites to view them here.
          </Typography>
        </Paper>
      )}
      {pokemonsData && pokemonsData.length > 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(auto-fill, minmax(350px, 1fr))',
              md: 'repeat(auto-fill, minmax(400px, 1fr))',
            },
            gap: 3,
            mb: 4,
            overflowX: 'hidden',
            maxHeight: '560px',
          }}
        >
          {pokemonsData.map((pokemon, index) => (
            <Card
              key={`pokemon-${pokemon.number}-${index}`}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                height: 'fit-content',
                maxHeight: '550px',
                display: 'flex',
                flexDirection: 'column',
              }}
              onClick={() => handleCardClick(pokemon.id)}
              elevation={2}
            >
              <CardHeader
                title={
                  <Typography
                    variant='h5'
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      color: 'primary.main',
                    }}
                  >
                    {pokemon?.name}
                  </Typography>
                }
                subheader={
                  <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                    #{pokemon?.number}
                  </Typography>
                }
                action={
                  <IconButton
                    onClick={(event) => deleteFavorites(event, index)}
                    color='error'
                    sx={{ '&:hover': { backgroundColor: 'error.light', color: 'white' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />

              <CardContent sx={{ pt: 0, flex: 1, overflow: 'auto' }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                      Types
                    </Typography>
                    <PokemonTypeChips types={pokemon?.types} />
                  </Box>

                  <Box>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                      Moves ({pokemon?.moves.length})
                    </Typography>
                    <List
                      sx={{
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        maxHeight: 150,
                        overflow: 'auto',
                      }}
                    >
                      {pokemon?.moves.map((move, moveIndex) => (
                        <ListItem key={`move-${moveIndex}`} dense>
                          <ListItemText
                            primary={move}
                            sx={{
                              '& .MuiListItemText-primary': {
                                textTransform: 'capitalize',
                                fontSize: '0.875rem',
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                        Stats
                      </Typography>
                      <ExpandMore
                        expand={expandedCards[index] || false}
                        onClick={(event) => handleExpandClick(event, index)}
                        aria-expanded={expandedCards[index] || false}
                        size='small'
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </Box>

                    <Collapse in={expandedCards[index] || false} timeout='auto' unmountOnExit>
                      <Box sx={{ pt: 2 }}>
                        <PokemonStats stats={pokemon.stats} />
                      </Box>
                    </Collapse>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      <Box
        component='footer'
        sx={{
          backgroundColor: 'background.paper',
          borderColor: 'divider',
          borderTop: '1px solid',
          mt: 6,
          py: 3,
          textAlign: 'center',
        }}
      >
        <Button
          variant='contained'
          size='large'
          onClick={handleBackToList}
          sx={{
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
          }}
        >
          Return to Pokemon List
        </Button>
      </Box>
    </Container>
  );
};

export default PokemonFavorites;
