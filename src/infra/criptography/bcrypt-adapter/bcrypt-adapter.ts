import bcrypt from 'bcrypt'
import { HashComparer } from '@/data/protocols/critography/hash-comparer'
import { Hasher } from '@/data/protocols/critography/hasher'

export class BCryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    const hash = await bcrypt.hash(plaintext, this.salt)
    return hash
  }

  async compare (plaintext: string, digest: string): Promise<boolean> {
    const isValid = await bcrypt.compare(plaintext, digest)
    return isValid
  }
}
