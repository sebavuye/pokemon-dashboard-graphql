import { useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { capitalize } from "../../utils";

const GET_POKEMON = gql(`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    sprites {
      front_default
      front_shiny
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}
`);

export const Detail = () => {
  const { name = "" } = useParams();
  const { data } = useQuery(GET_POKEMON, { variables: { name } });

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Box width="60%" display="grid" gridTemplateColumns="75% 1fr">
        <Box>
          <Typography gutterBottom variant="h3" component="h1" mb={0}>
            {capitalize(data?.pokemon?.name ?? "")}
          </Typography>
        </Box>
        <Box width="100%" height="100%">
          <Box component="img" alt={data?.pokemon?.name ?? undefined} src={data?.pokemon?.sprites?.front_default ?? undefined} width="100%" />
        </Box>
      </Box>
    </Box>
  );
};
