/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapters'
import { auth } from '@/main/middlewares/admin-auth'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
