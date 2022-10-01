import { CssBaseline, Box, Stack } from "@mui/material";
import { AppProvider } from "./providers/AppProvider";
import { Header } from "./sections/Home";
import { Section1 } from "./sections/Section1";
import { Section2 } from "./sections/Section2";
import { Section3 } from "./sections/Section3";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <Box sx={{ backgroundColor: "background.default" }}>
        <Header />
        <Stack sx={{ maxWidth: 1600, margin: "4rem auto", width: "85vw", gap: 4 }}>
          <Section1 />
          <Section2 />
          <Section3 />
        </Stack>
      </Box>
    </AppProvider>
  );
}

export default App;
