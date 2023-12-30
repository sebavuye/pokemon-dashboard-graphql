import { useQuery } from "@apollo/client";
import { gql } from "./__generated__";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { Header } from "./features";

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

const LIMIT = 24;

const skeletons = Array.from({ length: LIMIT }, (_, key) => key);

function App() {
  const { data, loading } = useQuery(GET_POKEMONS, { variables: { limit: LIMIT, offset: 0 } });

  return (
    <div>
      <Header />
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} p={2}>
        {loading &&
          skeletons?.map((skeleton) => {
            return <Skeleton key={skeleton} variant="rounded" height={100} />;
          })}
        {data?.pokemons?.results?.map((pokemon) => (
          <Card key={pokemon?.name} sx={{ display: "flex" }}>
            <CardMedia component="img" image={pokemon?.image ?? undefined} alt={pokemon?.name ?? undefined} sx={{ maxHeight: "100px", objectFit: "contain" }} />
            <CardContent sx={{ flex: "1 0 auto", alignItems: "center", width: "60%", display: "flex" }}>
              <Typography gutterBottom variant="h6" component="div" mb={0}>
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
