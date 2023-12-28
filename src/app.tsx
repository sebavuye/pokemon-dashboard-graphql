import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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
  const { data } = useQuery(GET_POKEMONS, { variables: { limit: 25, offset: 0 } });

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

      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} p={2}>
        {data?.pokemons?.results?.map((pokemon) => (
          <Card key={pokemon?.name} sx={{ display: "flex" }}>
            <CardMedia component="img" image={pokemon?.image ?? undefined} alt={pokemon?.name ?? undefined} sx={{ maxHeight: "100px", objectFit: "contain" }} />
            <CardContent sx={{ flex: "1 0 auto", width: "60%" }}>
              <Typography gutterBottom variant="h5" component="div">
                {pokemon?.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default App;
