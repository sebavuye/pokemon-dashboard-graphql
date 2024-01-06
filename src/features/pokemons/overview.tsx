import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useFragment, useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const GET_POKEMONS = gql(`
query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    count
    status
    message
    next
    previous
    nextOffset
    results {
      url
      name
      image
    }
  }
}`);

const COUNT_FRAGMENT = gql(`
  fragment count on PokemonList {
    count
}
`);

const LIMIT = 24;
const skeletons = Array.from({ length: LIMIT }, (_, key) => key);

export const Overview = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") ?? "1", 10);

  const { data, loading } = useQuery(GET_POKEMONS, { variables: { limit: LIMIT, offset: (page - 1) * LIMIT } });
  const { data: countFragment } = useFragment({
    fragmentName: "count",
    fragment: COUNT_FRAGMENT,
    from: {
      __typename: "PokemonList",
      nextOffset: 24,
    },
  });

  const count = data?.pokemons?.count;
  const cachedCount = countFragment?.count;

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
          count={Math.ceil((cachedCount ?? count ?? 0) / LIMIT)}
          renderItem={(item) => {
            return <PaginationItem component={Link} to={`?page=${item.page}`} {...item} />;
          }}
        />
      </Box>
    </>
  );
};
