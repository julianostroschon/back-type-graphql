import { Resolver, Query } from 'type-graphql';

@Resolver()
export class pingResolver {
  @Query()
  ping(): string {
    // logger.info('pingou');
    return 'pong!';
  }
}
