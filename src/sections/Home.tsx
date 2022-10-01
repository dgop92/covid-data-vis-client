import { Typography, Box } from "@mui/material";
import { ReactComponent as HeaderWave } from "../assets/header-wave.svg";

const WAVE_HEIGHT = 387;

export function Header() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        position: "relative",
        height: WAVE_HEIGHT,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontFamily: "titleFontFamily",
          fontWeight: 700,
          color: "text.primary",
          fontSize: { md: 56, xs: 48 },
          padding: 1,
          zIndex: 2,
          alignSelf: "center",
          px: 4,
        }}
      >
        Covid Data Vizualization
      </Typography>
      <Box
        style={{ position: "absolute", zIndex: 1, overflow: "hidden", width: "100%" }}
      >
        <HeaderWave height={WAVE_HEIGHT} style={{ transform: "scale(1.8, 1)" }} />
      </Box>
    </Box>
  );
}

// style={{ position: 'absolute', bottom: -150, right: -60, zIndex: 1 }}
