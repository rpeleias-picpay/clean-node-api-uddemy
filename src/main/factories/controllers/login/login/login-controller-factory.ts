import { Controller } from '@/presentation/protocols'
import { makeLoginValdiation } from './login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeLoginValdiation(), makeDbAuthentication())
  return makeLogControllerDecorator(loginController)
}
