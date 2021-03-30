import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import faker from 'faker'

export const mockSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: faker.random.uuid(),
  surveyId: faker.random.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSurveyResult = (): SurveyResultModel => ({
  surveyId: faker.random.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: faker.random.number({ min: 0, max: 1000 }),
    percent: faker.random.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: true
  }, {
    answer: faker.random.word(),
    image: faker.image.imageUrl(),
    count: faker.random.number({ min: 0, max: 1000 }),
    percent: faker.random.number({ min: 0, max: 100 }),
    isCurrentAccountAnswer: true
  }],
  date: faker.date.recent()
})
