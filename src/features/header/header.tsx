import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import CatchingPokemonTwoToneIcon from "@mui/icons-material/CatchingPokemonTwoTone";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";

export const Header = () => {
  return (
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
  );
};
