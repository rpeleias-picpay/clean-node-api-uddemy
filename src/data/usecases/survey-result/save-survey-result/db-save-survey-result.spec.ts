import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { throwError } from '@/domain/test'
import { mockSaveSurveyResultRepository } from '@/data/test'
import { mockSurveyResult, mockSurveyResultData } from '@/domain/test/mock-survey-result'

interface SutTypes {
  sut: DbSaveSurveyResult
  saveSurveyRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyRepositoryStub)
  return {
    sut,
    saveSurveyRepositoryStub
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

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyRepositoryStub, 'save').mockImplementationOnce(throwError)
    const surveyResultData = mockSurveyResultData()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyReturn on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSurveyResultData())
    expect(surveyResult).toEqual(mockSurveyResult())
  })
})
