import { createTheme, alpha } from "@mui/material";
// eslint-disable-next-line import/no-extraneous-dependencies
import { SxProps } from "@mui/system";

declare module "@mui/material/styles/createTypography" {
  interface FontStyle {
    titleFontFamily: string;
  }
}

// TODO: dark and light colors are assumptions, change with the real one
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#6746ED",
      light: "#6746ED",
      dark: "#6746ED",
      contrastText: "#FFFFFC",
    },
    secondary: {
      main: "#2BEBC8",
      light: "#2BEBC8",
      dark: "#2BEBC8",
      contrastText: "#FFFFFC",
    },
    background: {
      default: "#1E1F22",
      paper: "#0C0C0E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FDFDFD",
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
    titleFontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
  },

  // Disable some google default styles

  components: {
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableElevation: true,
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        containedPrimary: ({ theme }) => ({
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.85),
          },
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        containedSecondary: ({ theme }) => ({
          "&:hover": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.85),
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        colorPrimary: ({ theme }) => ({
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.85),
          },
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        colorSecondary: ({ theme }) => ({
          "&:hover": {
            backgroundColor: alpha(theme.palette.secondary.main, 0.85),
          },
        }),
      },
    },
  },
});

export type MuiTheme = typeof muiTheme;
export type SxThemeProps = SxProps<MuiTheme>;

/* 
--main: #6746ED;
--primary-text: #FFFFFF;
--primary-text2: #FDFDFD;
--secondary-text: #A8ABB6;
--divider-color: #BDBDBD;
--background: #1E1F22;
--constrast-text: #FFFFFF;
--secondary: #2BEBC8;
--card: #0C0C0E;
*/
