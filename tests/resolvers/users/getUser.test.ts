import { buildDbMock } from '../../../src/support/database'
import { UserResolver } from '../../../src/server/resolvers/user'

describe('Resolver getUser', () => {
  test('Deve retornar usuário com o id 3 `pong`', () => {
    const { getUser } = new UserResolver()
    const user = { id: '2', name: 'Juliano', email: 'arrobinha' }
    const { database, queries } = buildDbMock(
      Promise.resolve({ id: '3', name: 'Jesualdo', email: 'arrobinha@dosguri' })
    )

    const ctx = { database, user }
    const [query] = queries

    const id = '3'

    expect(getUser({}, id, ctx)).resolves.toEqual({
      id: '3',
      name: 'Jesualdo',
      email: 'arrobinha@dosguri'
    })

    expect(database).toHaveBeenCalledTimes(1)
    expect(query.where).toHaveBeenCalledTimes(1)
    expect(query.first).toHaveBeenCalledTimes(1)

    expect(database).toHaveBeenCalledWith('users')
    expect(query.where).toHaveBeenCalledWith({ id: '3' })
    expect(query.first).toHaveBeenCalledWith()
  })
})
