import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';

export const buildTypeDefs = async () => {
  const dir = path.join(__dirname, './');
  const typesArray = await loadFiles(dir, {
    extensions: ['graphql']
  });

  return mergeTypeDefs(typesArray);
};
