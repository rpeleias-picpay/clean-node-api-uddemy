import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'
import { serverError, ok } from '@/presentation/helpers/http/http-helper'

import { mockAccountModel } from '@/domain/test'
import { LogErrorRepositorySpy } from '@/data/test'
import faker from 'faker'

const mockRequest = (): HttpRequest => {
  const password = faker.internet.password()
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  return serverError(fakeError)
}

interface SutTypes{
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

class ControllerSpy implements Controller {
  httpResponse = ok(mockAccountModel())
  httpRequest: HttpRequest

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.httpRequest = httpRequest
    return await Promise.resolve(this.httpResponse)
  }
}

const makeSut = (): SutTypes => {
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(controllerSpy.httpRequest).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
