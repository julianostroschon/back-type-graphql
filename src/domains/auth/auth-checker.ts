import { ResolverData } from 'type-graphql';

export type AuthCheckerFn<TContextType = object, TRoleType = string[]> = (
  resolverData: ResolverData<TContextType>,
  roles: TRoleType
) => boolean | Promise<boolean>;

export const authChecker: AuthCheckerFn = (
  { root, args, context, info },
  rules
) => {
  return false;
};
