import { database } from './database';
import { Context } from '../contracts/general/context';

const user = {
  id: 'sasas',
  name: 'Juliano',
  password: '',
  email: 'ssaa',
};

const defineContext = (): Context => {
  return {
    database,
    user,
  };
};

export async function createContext() {
  return async (): Promise<Context> => await defineContext();
}
