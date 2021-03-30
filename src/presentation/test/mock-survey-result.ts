import { mockSurveyResult } from '@/domain/test/mock-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResult()
  saveSurveyResultParams: SaveSurveyResultParams

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data
    return await Promise.resolve(this.surveyResultModel)
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResult()
  id: string

  async load (id: string): Promise<SurveyResultModel> {
    this.id = id
    return await Promise.resolve(this.surveyResultModel)
  }
}
