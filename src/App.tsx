import { CssBaseline, Box } from "@mui/material";
import { AppProvider } from "./providers/AppProvider";
import { Header } from "./sections/Home";
import { Section1 } from "./sections/Section1";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <Box sx={{ backgroundColor: "background.default" }}>
        <Header />
        <Box sx={{ maxWidth: 1600, margin: "4rem auto", width: "85vw" }}>
          <Section1 />
        </Box>
      </Box>
    </AppProvider>
  );
}

export default App;
