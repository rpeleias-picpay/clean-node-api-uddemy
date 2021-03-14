
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/usecases/account/authentication/db-authentication-protocols'
import { AddAccount, AddAccountParams, AccountModel, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadByAccountEmailRepository: LoadAccountByEmailRepository) {}

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadByAccountEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }))
      return await Promise.resolve(newAccount)
    }
    return null
  }
}
