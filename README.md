# back-parti-notes

Backend escrito em Node.js

### :books: Technologias usadas

- [Node.js >16.0.0 < 17.0.0](https://nodejs.org/en/download/)
- [Apollo Server 3.11.1](https://github.com/apollographql/apollo-server)
- [Yarn 1.22+](https://classic.yarnpkg.com/en/docs/install/)
- [Docker 20.10+](https://docs.docker.com/engine/install/)
- [Docker Compose 1.29+](https://docs.docker.com/compose/install/)

### :rocket: Projeto

**Parti Notes** Este projeto tem objetivo de (complementar)...

### :mortar_board: Instruções

**Clonar** o repositório:

```bash
git clone git@github.com:partithura-estagiarios/back-parti-notes.git
```

**Tenha certeza** de que você esteja de fato no diretório:

```sh
cd back-parti-notes
```

Para rodar o **backend** - Execute os seguintes comandos no terminal:

```bash
# instalar pacotes/dependências
yarn

# inicializando servidor como modo de desenvolvimento
yarn dev
```

### :card_file_box: Migrations e Seeds

As migrations e os seeds são controlados pelo `[knex](http://knexjs.org/)`

As `data migrations` são, normalmente, registros de configurações salvos no banco de dados, sendo estes necessários para o funcionamento do sistema. Com isso, é necessário executar o comando `yarn data:migrate` **antes** de executar os `seeds`.

```sh
# executa as migrations
yarn knex:migrate

# executando rollback em todas as migrations
yarn knex:rollback

# executa os seeds
yarn knex:seed

# prepara o ambiente, executando a composição de migrate e seed
yarn db:prepare
```

Outros [comandos do knex](http://knexjs.org/#Migrations) podem ser acessados usando o `npx`

```sh
npx knex seed:run
npx knex migrate:rollback --all
```

### :test_tube: Testes

```sh
# executa os testes
yarn unit:test
```
