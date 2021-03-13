import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import { SaveSurveyResult } from '@/domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository)
}
