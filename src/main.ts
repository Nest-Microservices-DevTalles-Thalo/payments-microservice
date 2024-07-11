import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

declare const module: any;

async function bootstrap() {

  const logger = new Logger('Payments-ms');


  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.useGlobalPipes( 
    new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    }) 
   );

  await app.listen(envs.port);

  logger.log(`Payments!!!!! Microservice running on port ${envs.port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
