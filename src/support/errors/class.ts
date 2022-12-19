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
export class AppError extends ApolloError {
  constructor(message: string, originalError: Error) {
    super(message);
    Object.assign(this, { name: 'AppError', originalError });
  }

  static build(message: string, originalError: Error): ApolloError {
    return new AppError(message, originalError);
  }
}
