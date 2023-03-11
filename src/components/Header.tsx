import { AppBar, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
            Hacker News
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
