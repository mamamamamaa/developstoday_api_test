import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const config = app.get(ConfigService);
  const port = config.get('port');
  const prefix = config.get('prefix');

  app.enableCors();
  app.setGlobalPrefix(prefix);

  await app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/${prefix}`);
  });
}
bootstrap();
