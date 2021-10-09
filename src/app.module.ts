import { Module } from '@nestjs/common';
import configuration from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { LogLevel } from '@sentry/types';
import { MongooseModule } from '@nestjs/mongoose';

// Application Entry
import { DomainModule } from './domains';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        dsn: cfg.get('sentry.dsn'),
        debug: true,
        environment: cfg.get('sentry.environment'),
        logLevel: LogLevel.Debug,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        uri: cfg.get('database.mongodb.uri'),
      }),
      inject: [ConfigService],
    }),
    DomainModule,
  ],
})
export class AppModule {}
