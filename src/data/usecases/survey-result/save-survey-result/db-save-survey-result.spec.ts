import { DbSaveSurveyResult } from './db-save-survey-result'
import { LoadSurveyResultRepositorySpy, SaveSurveyResultRepositorySpy } from '@/data/test'
import { mockSurveyResultData } from '@/domain/test/mock-survey-result'
import { throwError } from '@/domain/test'
import MockDate from 'mockdate'

interface SutTypes {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositorySpy: SaveSurveyResultRepositorySpy
  loadSurveyRepositorySpy: LoadSurveyResultRepositorySpy
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositorySpy = new SaveSurveyResultRepositorySpy()
  const loadSurveyRepositorySpy = new LoadSurveyResultRepositorySpy()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySpy, loadSurveyRepositorySpy)
  return {
    sut,
    saveSurveyResultRepositorySpy,
    loadSurveyRepositorySpy
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
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSurveyResultRepositorySpy.saveSurveyResultParams).toEqual(surveyResultData)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositorySpy } = makeSut()
    jest.spyOn(saveSurveyResultRepositorySpy, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSurveyResultData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const surveyResultData = mockSurveyResultData()
    await sut.save(surveyResultData)
    expect(loadSurveyRepositorySpy.surveyId).toBe(surveyResultData.surveyId)
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    jest.spyOn(loadSurveyRepositorySpy, 'loadBySurveyId').mockImplementationOnce(throwError)
    const surveyResultData = mockSurveyResultData()
    const promise = sut.save(surveyResultData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyReturn on success', async () => {
    const { sut, loadSurveyRepositorySpy } = makeSut()
    const surveyResult = await sut.save(mockSurveyResultData())
    expect(surveyResult).toEqual(loadSurveyRepositorySpy.surveyResultModel)
  })
})
