
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'
import { AddAccount, AddAccountModel, AccountModel, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadByAccountEmailRepository: LoadAccountByEmailRepository) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const account = await this.loadByAccountEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }))
      return await new Promise(resolve => resolve(newAccount))
    }
    return null
  }
}
