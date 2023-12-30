import { useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
    <Box p={2}>
      <Typography gutterBottom variant="h3" component="h1" mb={0}>
        {data?.pokemon?.name}
      </Typography>
    </Box>
  );
};
