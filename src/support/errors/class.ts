import { ApolloError } from 'apollo-server';

export class ValidationError extends ApolloError {
  constructor(message: string) {
    super(message, 'GRAPHQL_VALIDATION_FAILED');
    Object.assign(this, { name: 'ValidationError' });
  }

  static build(message: string): ValidationError {
    return new ValidationError(message);
  }
}
