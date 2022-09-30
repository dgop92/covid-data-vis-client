export type CovidBasicSerie = {
  dates: Date[];
  cases: number[];
  deaths: number[];
};

export type CountryBasicInfo = {
  isoCode: string;
  totalCases: number;
  populationDensity?: number;
  population?: number;
  gdpPerCapita?: number;
  lifeExpectancy?: number;
  humanDevelopmentIndex?: number;
};

export type CountryBasicInfoOptions = {
  startDate?: string;
  endDate?: string;
  removeOutliers?: boolean;
};

export interface ICovidRepository {
  getBasicSerieByCountry(isoCode: string, semester?: string): Promise<CovidBasicSerie>;
  getCountriesBasicInfo(options?: CountryBasicInfoOptions): Promise<CountryBasicInfo[]>;
}
