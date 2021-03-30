import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import faker from 'faker'

export const mockSurvey = (): SurveyModel => {
  return {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [{
      answer: faker.random.word()
    }, {
      answer: faker.random.word(),
      image: faker.image.imageUrl()
    }],
    date: faker.date.recent()
  }
}

export const mockSurveys = (): SurveyModel[] => {
  return [mockSurvey(), mockSurvey()]
}

export const mockAddSurveyData = (): AddSurveyParams => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }, {
    answer: faker.random.word()
  }],
  date: faker.date.recent()
})
