export type CovidBasicSerie = {
  dates: Date[];
  cases: number[];
  deaths: number[];
};

export type CountryBasicInfo = {
  isoCode: string;
  continent: string;
  totalCases: number;
  totalDeaths: number;
  populationDensity?: number;
  population?: number;
  gdpPerCapita?: number;
  lifeExpectancy?: number;
  humanDevelopmentIndex?: number;
};

export type CountryBasicInfoOptions = {
  startDate?: string;
  endDate?: string;
};

export interface ICovidRepository {
  getBasicSerieByCountry(isoCode: string, semester?: string): Promise<CovidBasicSerie>;
  getCountriesBasicInfo(options?: CountryBasicInfoOptions): Promise<CountryBasicInfo[]>;
}
