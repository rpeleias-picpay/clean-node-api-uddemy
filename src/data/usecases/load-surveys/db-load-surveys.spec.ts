import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveyRepositoryStub: LoadSurveyRepository
}

const makeLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositoryStub = makeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveyRepositoryStub)
  return {
    sut, loadSurveyRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })
})
