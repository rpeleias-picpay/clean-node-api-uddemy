import { mockSurvey, mockSurveys } from '@/domain/test'
import { AddSurvey, AddSurveyParams } from '@/presentation/controllers/survey/add-survey/add-survey-controller-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { LoadSurveyById } from '../controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurveyParams

  async add (data: AddSurveyParams): Promise<void> {
    this.addSurveyParams = data
    return await Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveys()
  callsCount = 0

  async load (): Promise<SurveyModel[]> {
    this.callsCount++
    return await Promise.resolve(this.surveyModels)
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurvey()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return await Promise.resolve(this.surveyModel)
  }
}
