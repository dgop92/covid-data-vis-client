import { createContext, useContext } from "react";
import { ICovidRepository } from "../../services/repository/covid.repository.definition";

type RepositoryContextType = {
  repository: ICovidRepository;
};

export const RepositoryContext = createContext<RepositoryContextType>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  repository: null!,
});

export function useRepo() {
  return useContext(RepositoryContext);
}
