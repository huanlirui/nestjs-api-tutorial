import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // pipe is used to validate the request body  过滤不符合dto类型的请求
  // whiteList is to allow specific fields to be passed in the request body 只接收dto类型的参数
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3333);
}
bootstrap();
