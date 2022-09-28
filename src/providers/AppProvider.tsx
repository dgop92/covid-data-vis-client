import { ThemeProvider } from "@mui/material/styles";
import { RepositoryContext } from "./context/covid.repository.contex";
// import { CovidMockRepository } from "../services/repository/covid-mock.repository";
import { muiTheme } from "../styles/theme";
import { createAxiosClient } from "../services/api/axios-client";
import { CovidRepository } from "../services/repository/covid.repository";

interface AppProviderProps {
  children: React.ReactNode;
}

// const covidRepository = new CovidMockRepository();
const client = createAxiosClient();
const covidRepository = new CovidRepository(client);

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <ThemeProvider theme={muiTheme}>
      {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
      <RepositoryContext.Provider value={{ repository: covidRepository }}>
        {children}
      </RepositoryContext.Provider>
    </ThemeProvider>
  );
}
