import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveyRepository, SurveyModel } from '@/data/usecases/survey/load-surveys/db-load-surveys-protocols'
import { mockSurvey, mockSurveys } from '@/domain/test/mock-survey'

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  surveyModel = mockSurvey()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveyRepository {
  surveyModels = mockSurveys()
  callsCount = 0

  async loadAll (): Promise<SurveyModel[]> {
    this.callsCount++
    return await Promise.resolve(this.surveyModels)
  }
}
