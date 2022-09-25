import { CovidBasicSerie, ICovidRepository } from "./covid.repository.definition";

export class CovidMockRepository implements ICovidRepository {
  getBasicSerieByCountry(isoCode: string, semester?: string): Promise<CovidBasicSerie> {
    // return 30 records
    return Promise.resolve({
      dates: Array.from({ length: 1000 }, (_, i) => new Date(2020, 0, i + 1)),
      cases: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000)),
      deaths: Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100)),
    });
  }
}
