## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

<!-- 图形化数据库工具 -->
```
npx prisma studio 
```

<!-- 数据库迁移 -->
```
npx prisma migration dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

if jest cant find absolute path

add "moduleDirectories": ["<rootDir>/../", "node_modules"] in /test/jest-e2e.json
