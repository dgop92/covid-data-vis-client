export type CovidBasicSerie = {
  dates: Date[];
  cases: number[];
  deaths: number[];
};

export type CountryBasicInfo = {
  isoCode: string;
  totalCases: number;
  populationDensity: number;
  population: number;
};

export interface ICovidRepository {
  getBasicSerieByCountry(isoCode: string, semester?: string): Promise<CovidBasicSerie>;
  getCountriesBasicInfo(): Promise<CountryBasicInfo[]>;
}
