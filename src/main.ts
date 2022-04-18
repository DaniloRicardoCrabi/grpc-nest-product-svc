import { INestMicroservice, ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './product/product.pb';

async function bootstrap() {
  const url = '0.0.0.0:50053';
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: url,
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/product.proto'),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
  const logger = new Logger('Main');
  logger.log(`gRPC application running on: ${url}`);
}
bootstrap();
