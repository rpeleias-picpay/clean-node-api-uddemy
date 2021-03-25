import { mockSurveyResult } from '@/domain/test/mock-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SaveSurveyResult, SaveSurveyResultParams, SurveyResultModel } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller-protocols'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResult())
    }
  }
  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResult())
    }
  }
  return new LoadSurveyResultStub()
}
