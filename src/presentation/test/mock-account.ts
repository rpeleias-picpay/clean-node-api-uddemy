import { mockAccount } from '@/domain/test'
import { AccountModel, AddAccount, AddAccountParams } from '../controllers/login/signup/signup-controller-protocols'
import { Authentication, AuthenticationParams } from '../controllers/login/login/login-controller-protocols'
import { LoadAccountByToken } from '../middlewares/auth-middleware-protocols'
import { AuthenticationModel } from '@/domain/models/authentication'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return {
        accessToken: 'any_token',
        name: 'any_name'
      }
    }
  }
  return new AuthenticationStub()
}

export const mockLoadByAccountToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await Promise.resolve(mockAccount())
    }
  }
  return new LoadAccountByTokenStub()
}
