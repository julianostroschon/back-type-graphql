import path from 'path';
import { loadFiles } from '@graphql-tools/load-files';
import { values, map, first } from 'lodash';

export const buildResolvers = async () => {
  const resolverPath = path.join(__dirname, './resolvers/**/');
  const resolversArrayBundle = await loadFiles(resolverPath);
  return map(resolversArrayBundle, (resolver: any) => {
    return first(values(resolver));
  });
};
