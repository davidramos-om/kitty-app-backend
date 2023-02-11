import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import config from "./config";

async function bootstrap() {
  const cf = config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(cf.port);

  Logger.verbose(`\n\nApplication is running on: ${await app.getUrl()}`);
  Logger.debug(`Playground ${await app.getUrl()}/graphql`);
  Logger.debug("Api key : " + cf.crypto.CMC_KEY);
  Logger.debug("Api url : " + cf.crypto.CMC_URL);
  Logger.debug("Env : " + cf.env);
}

bootstrap();
