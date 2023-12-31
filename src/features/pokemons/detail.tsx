import { useNavigate, useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { capitalize } from "../../utils";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";

const GET_POKEMON = gql(`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    base_experience
    stats {
      base_stat
      effort
      stat {
        name
      }
    }
    sprites {
      front_default
      front_shiny
    }
    abilities {
      ability {
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
  const { data, loading } = useQuery(GET_POKEMON, { variables: { name } });
  const navigate = useNavigate();

  return (
    <Box p={4} display="flex" justifyContent="center">
      <Box width="60%" display="grid" gridTemplateColumns="75% 1fr" gap={2}>
        {loading ? (
          <>
            <Skeleton height={500} variant="rounded" animation="wave" />
            <Skeleton height={500} variant="rounded" animation="wave" />
          </>
        ) : (
          <>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography gutterBottom variant="h3" component="h1" mb={0}>
                {capitalize(data?.pokemon?.name ?? "")}
              </Typography>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Box display="flex" gap={1}>
                  {data?.pokemon?.types?.map((type) => <Chip size="small" color="info" key={type?.type?.name} label={type?.type?.name ?? ""} />)}
                </Box>
                <Chip color="success" size="small" label={`XP ${data?.pokemon?.base_experience}`} />
              </Box>
              <Divider />
              <Box mt={5}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Stat</TableCell>
                        <TableCell>Base</TableCell>
                        <TableCell>Effort</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.pokemon?.stats?.map((stat) => (
                        <TableRow key={stat?.stat?.name}>
                          <TableCell>{stat?.stat?.name}</TableCell>
                          <TableCell>{stat?.base_stat}</TableCell>
                          <TableCell>{stat?.effort}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box mt={5} display="flex" justifyContent="space-between">
                <Button
                  startIcon={<ArrowBack />}
                  variant="contained"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Back to overview
                </Button>
                <Button variant="contained" color="success" endIcon={<Add />}>
                  Add to Pokedex
                </Button>
              </Box>
            </Box>
            <Box width="100%" height="100%">
              <Box component="img" alt={data?.pokemon?.name ?? undefined} src={data?.pokemon?.sprites?.front_default ?? undefined} width="100%" />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};
