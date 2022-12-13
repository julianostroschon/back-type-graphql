import { loadFiles } from '@graphql-tools/load-files';
import path from 'path';

export const buildResolvers = async (): Promise<any[]> => {
  const resolversArrayBundle = await loadFiles(
    path.join(__dirname, './resolvers/**/')
  );

  return resolversArrayBundle.map((resolver: object[]) => {
    return Object.values(resolver)[0];
  });
};
