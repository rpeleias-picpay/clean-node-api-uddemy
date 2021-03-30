import jwt from 'jsonwebtoken'
import { Decrypter } from '@/data/protocols/critography/decrypter'
import { Encrypter } from '@/data/protocols/critography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (plaintext: string): Promise<string> {
    const accessToken = await jwt.sign({ id: plaintext }, this.secret)
    return accessToken
  }

  async decrypt (ciphertext: string): Promise<string> {
    const value: any = await jwt.verify(ciphertext, this.secret)
    return value
  }
}
