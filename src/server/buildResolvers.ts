import { loadFiles } from '@graphql-tools/load-files';
import { TypeResolvers } from './types';
import path from 'path';

export const buildResolvers = async (): Promise<TypeResolvers> => {
  const resolversArrayBundle = await loadFiles(
    path.join(__dirname, './resolvers/**/')
  );

  return resolversArrayBundle.map((resolver: object[]) => {
    return Object.values(resolver)[0];
  }) as TypeResolvers;
};
