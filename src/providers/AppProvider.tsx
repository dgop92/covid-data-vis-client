import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../styles/theme";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
