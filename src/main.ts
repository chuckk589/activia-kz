import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './modules/app-config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({ type: VersioningType.URI });
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get(AppConfigService);
  await app.listen(configService.get('port'));
}
bootstrap();
