
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/usecases/account/authentication/db-authentication-protocols'
import { AddAccount, AddAccountParams, AccountModel, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadByAccountEmailRepository: LoadAccountByEmailRepository) {}

  async add (data: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadByAccountEmailRepository.loadByEmail(data.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(data.password)
      const newAccount = await this.addAccountRepository.add(Object.assign({}, data, { password: hashedPassword }))
      return newAccount
    }
    return null
  }
}
