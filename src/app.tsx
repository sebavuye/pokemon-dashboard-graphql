import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const GET_POKEMONS = gql(`
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}`);

function App() {
  const { data } = useQuery(GET_POKEMONS);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" gap={1} alignItems="center">
            <CatchingPokemonTwoToneIcon />
            <Typography variant="h6" component="h1">
              Pokemon Dashboard
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {data?.pokemons?.results?.map((pokemon) => {
        return <div key={pokemon?.name}>{pokemon?.name}</div>;
      })}
    </div>
  );
}

export default App;
