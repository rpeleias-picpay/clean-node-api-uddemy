import { Controller } from '../../../../../presentation/protocols'

import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurvey } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const loginController = new LoadSurveysController(makeDbLoadSurvey())
  return makeLogControllerDecorator(loginController)
}
