import { useState, useCallback, type ChangeEvent, type ReactNode } from 'react';
import { usePokemonList } from '../hooks/pokemon-list/usePokemonList';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
  alpha,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PokemonTypeChips from '../components/PokemonTypeChips';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:nth-of-type(odd)': {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    transform: 'translateX(4px)',
    boxShadow: `inset 4px 0 0 ${theme.palette.primary.main}`,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
}));

const ROW_PER_PAGE = [5, 10, 20, 50];

const PokemonList = (): ReactNode => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROW_PER_PAGE[1]);

  const theme = useTheme();
  const navigate = useNavigate();
  const { pokemonsData, pokemonListQuery } = usePokemonList(page + 1, rowsPerPage);

  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    [],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

  const handleClick = useCallback(
    (id?: number) => {
      if (id) {
        navigate(`/detail/${id}`);
      }
    },
    [navigate],
  );

  const handleFavorite = useCallback(() => {
    navigate('/favorites');
  }, [navigate]);

  const renderTableView = () => (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 2,
        boxShadow: `0 4px 16px ${alpha(theme.palette.common.black, 0.1)}`,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '600px',
      }}
    >
      <Table sx={{ minWidth: 650 }} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='subtitle2'>Number</Typography>
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='subtitle2'>Name</Typography>
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='subtitle2'>Types</Typography>
              </Box>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonsData.map((pokemon) => (
            <StyledTableRow key={pokemon?.id} onClick={() => handleClick(pokemon?.id)}>
              <TableCell component='th' scope='row'>
                <Typography
                  variant='body2'
                  sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                  }}
                >
                  #{pokemon?.number}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='body1'
                  sx={{
                    textTransform: 'capitalize',
                    fontWeight: 'medium',
                  }}
                >
                  {pokemon?.name}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <PokemonTypeChips types={pokemon?.types} />
                </Box>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={pokemonListQuery?.data?.count ?? 0}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={ROW_PER_PAGE}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage='Rows per page:'
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count}`}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );

  const renderSkeletonTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Number</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Types</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: rowsPerPage }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant='text' width='60%' />
              </TableCell>
              <TableCell>
                <Skeleton variant='text' width='80%' />
              </TableCell>
              <TableCell>
                <Stack direction='row' spacing={0.5}>
                  <Skeleton variant='rounded' width={60} height={24} />
                  <Skeleton variant='rounded' width={60} height={24} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (pokemonListQuery.isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <HeaderContainer>
          <Typography
            component='h1'
            align='center'
            variant='h4'
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              fontWeight: 'bold',
              mb: 1,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            List of Pokemons
          </Typography>
        </HeaderContainer>

        {renderSkeletonTable()}
      </Container>
    );
  }

  return (
    <Container maxWidth='lg' sx={{ py: 3 }}>
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
          List of Pokemons
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>{renderTableView()}</Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
        }}
      >
        <Button
          variant='contained'
          size='large'
          onClick={handleFavorite}
          startIcon={<FavoriteIcon />}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
            borderRadius: 3,
            fontSize: '1rem',
            fontWeight: 'medium',
            px: 4,
            py: 1.5,
            textTransform: 'none',
            '&:hover': {
              background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
              transform: 'translateY(-2px)',
            },
          }}
        >
          Go to Favorites
        </Button>
      </Box>
    </Container>
  );
};

export default PokemonList;
