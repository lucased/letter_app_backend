import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const config = require('config');

async function bootstrap() {
  const serverConfig = config.get('server');

  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: serverConfig.origin,
    });
  } else {
    app.enableCors();
  }

  const PORT = process.env.PORT || serverConfig.port;
  await app.listen(PORT);
}
bootstrap();
