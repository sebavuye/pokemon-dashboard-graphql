import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useApolloClient, useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const GET_POKEMONS = gql(`
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
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

export const Overview = () => {
  const client = useApolloClient();
  // there is a better way, investigate
  const cache = client.readQuery({
    query: GET_POKEMONS,
    variables: { limit: LIMIT, offset: 0 },
  });

  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(GET_POKEMONS, { variables: { limit: LIMIT, offset: (page - 1) * LIMIT } });

  return (
    <>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2} p={2}>
        {loading &&
          skeletons?.map((skeleton) => {
            return <Skeleton key={skeleton} variant="rounded" height={100} />;
          })}
        {data?.pokemons?.results?.map((pokemon) => (
          <Link key={pokemon?.name} to={`pokemon/${pokemon?.name}`}>
            <Card sx={{ display: "flex" }}>
              <CardMedia component="img" image={pokemon?.image ?? undefined} alt={pokemon?.name ?? undefined} sx={{ minHeight: "100px", maxHeight: "100px", objectFit: "contain" }} />
              <CardContent sx={{ flex: "1 0 auto", alignItems: "center", width: "60%", display: "flex" }}>
                <Typography gutterBottom variant="h6" component="div" mb={0}>
                  {pokemon?.name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" p={2}>
        <Pagination
          page={page}
          count={Math.ceil((cache?.pokemons?.count ?? data?.pokemons?.count ?? 0) / 24)}
          color="primary"
          onChange={(_event, value) => {
            setPage(value);
          }}
        />
      </Box>
    </>
  );
};
