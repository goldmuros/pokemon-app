import { Container } from '@mui/material';
import PokemonList from './pages/PokemonList';
import { useRoutes } from 'react-router-dom';
import PokemonDetail from './pages/PokemonDetail';
import PokemonFavorites from './pages/PokemonFavorites';
import NoPage from './pages/NoPage';

const ROUTES = [
  {
    path: '/',
    element: <PokemonList />,
  },
  {
    path: '/detail/:id',
    element: <PokemonDetail />,
  },
  {
    path: '/favorites',
    element: <PokemonFavorites />,
  },
  {
    path: '*',
    element: <NoPage />,
  },
];
const App = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}
    >
      {useRoutes(ROUTES)}
    </Container>
  );
};

export default App;
