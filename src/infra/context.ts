import { database } from './database';
import { Context } from '../contracts/general/context';

const user = { name: 'Juliano', password: 'senhazinha' };

const defineContext = async (): Promise<Context> => {
  return {
    database,
    user
  };
};

export async function createContext() {
  return {
    context: async (): Promise<Context> => {
      return await defineContext();
    }
  };
}
