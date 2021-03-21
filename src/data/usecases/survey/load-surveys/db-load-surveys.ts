import { LoadSurveyRepository, LoadSurveys, SurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveyRepository: LoadSurveyRepository) {}
  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll(accountId)
    return surveys
  }
}
