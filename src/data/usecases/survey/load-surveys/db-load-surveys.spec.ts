import { LoadSurveyRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import { mockSurveys, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { LoadSurveysRepositorySpy } from '@/data/test'

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveyRepositorySpy: LoadSurveysRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositorySpy = new LoadSurveysRepositorySpy()
  const sut = new DbLoadSurveys(loadSurveyRepositorySpy)
  return {
    sut, loadSurveyRepositorySpy
  }
}

const accountId = 'any_account_id'

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    await sut.load(accountId)
    expect(loadSurveyRepositorySpy.callsCount).toBe(1)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const surveys = await sut.load(accountId)
    expect(surveys).toEqual(loadSurveyRepositorySpy.surveyModels)
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(accountId)
    await expect(promise).rejects.toThrow()
  })
})
