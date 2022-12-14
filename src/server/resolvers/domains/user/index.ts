import pwdHash from 'password-hash';
import { hashAlgorithm, hashSaltLength } from '../../../../support/constants/index';

export function hashPassword(password: string): string {
  return pwdHash.generate(password, { algorithm: hashAlgorithm, saltLength: hashSaltLength });
}
