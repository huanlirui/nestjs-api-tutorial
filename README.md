## Description

### nest 项目基本的操作以及 e2e 测试整个项目的 curd 过程

#### - orm: prisma

#### - 数据库：postgresql

#### - 测试框架：jest

#### - API 模拟工具：pactum.js

#### - 环境搭建：docker

#### - API 客户端 : [insomnia](https://insomnia.rest/) insomnia

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

> 视频在这里 -> [youtube-freeCodeCamp.org-nest](https://youtu.be/GHTA143_b-s)

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
