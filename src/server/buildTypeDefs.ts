import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFiles } from '@graphql-tools/load-files';
import { DocumentNode } from 'graphql';
import path from 'path';

export const buildTypeDefs = async (): Promise<DocumentNode> => {
  const typesArray = await loadFiles(path.join(__dirname, '../'), {
    extensions: ['graphql'],
  });

  return mergeTypeDefs(typesArray);
};
