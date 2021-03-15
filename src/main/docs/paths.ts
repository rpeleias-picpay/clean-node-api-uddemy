import {
  loginPath,
  surveyPath,
  signUpPath,
  surveyResultPath
} from './paths/'

export default {
  '/login': loginPath,
  '/signup': signUpPath,
  '/survey': surveyPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
