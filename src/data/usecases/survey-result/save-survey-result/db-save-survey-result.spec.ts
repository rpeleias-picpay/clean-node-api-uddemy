import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { throwError } from '@/domain/test'
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/data/test'
import { mockSurveyResult, mockSurveyResultData } from '@/domain/test/mock-survey-result'
import { LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'

interface SutTypes {
  sut: DbSaveSurveyResult
  saveSurveyRepositoryStub: SaveSurveyResultRepository
  loadSurveyRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyRepositoryStub = mockSaveSurveyResultRepository()
  const loadSurveyRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyRepositoryStub, loadSurveyRepositoryStub)
  return {
    sut,
    saveSurveyRepositoryStub,
    loadSurveyRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(saveSurveyRepositoryStub, 'save')
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadBySurveyId')
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(surveyResultData.surveyId, surveyResultData.accountId)
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const surveyResultData = mockSurveyResultData()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadSurveyRepositoryStub, 'loadBySurveyId')
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(addSpy).toHaveBeenCalledWith(surveyResultData.surveyId, surveyResultData.accountId)
  })

  test('Should return SurveyReturn on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSurveyResultData())
    expect(surveyResult).toEqual(mockSurveyResult())
  })
})
