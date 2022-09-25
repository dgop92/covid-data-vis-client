export type CovidBasicSerie = {
  dates: Date[];
  cases: number[];
  deaths: number[];
};

export interface ICovidRepository {
  getBasicSerieByCountry(isoCode: string, semester?: string): Promise<CovidBasicSerie>;
}
