/* eslint-disable @typescript-eslint/return-await */
import { Hasher } from '@/data/protocols/critography/hasher'
import { HashComparer } from '@/data/protocols/critography/hash-comparer'
import { Encrypter } from '@/data/protocols/critography/encrypter'
import { Decrypter } from '@/data/protocols/critography/decrypter'
import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.random.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.random.uuid()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return Promise.resolve(this.plaintext)
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.random.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return await Promise.resolve(this.ciphertext)
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true
  async compare (plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return Promise.resolve(this.isValid)
  }
}
