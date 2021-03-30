import { DbAddSurvey } from './db-add-survey'
import MockDate from 'mockdate'
import { mockAddSurveyData, throwError } from '@/domain/test'
import { AddSurveyRepositorySpy } from '@/data/test'

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositorySpy: AddSurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy()
  const sut = new DbAddSurvey(addSurveyRepositorySpy)
  return {
    sut,
    addSurveyRepositorySpy
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    const surveyData = mockAddSurveyData()
    await sut.add(surveyData)
    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData)
  })

  test('Should throw if addSurveyRepositorySpy throws', async () => {
    const { sut, addSurveyRepositorySpy } = makeSut()
    jest.spyOn(addSurveyRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
