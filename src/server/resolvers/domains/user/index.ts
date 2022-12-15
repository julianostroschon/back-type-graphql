import pwdHash from 'password-hash';
import { HASH_ALGORITHM, HASH_SALTS } from '../../../../support/constants';

export function hashPassword(password: string): string {
  return pwdHash.generate(password, {
    algorithm: HASH_ALGORITHM,
    saltLength: HASH_SALTS,
  }) as string;
}
