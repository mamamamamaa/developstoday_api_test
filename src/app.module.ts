import { Module } from '@nestjs/common';
import { CountriesModule } from './modules';
import { ConfigModule } from '@nestjs/config';
import { apiConfig, appConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, apiConfig],
    }),
    CountriesModule,
  ],
})
export class AppModule {}
