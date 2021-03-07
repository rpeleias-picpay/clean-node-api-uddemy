import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/critography/decrypter'
import { Encrypter } from '../../../data/protocols/critography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = await jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  decrypt: (value: string) => Promise<string>
}
