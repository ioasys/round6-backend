import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { winstonTransport } from './config/transports/winston.transport';
import { LoggerInterceptor } from './config/interceptors/logger.interceptor';
import { OrdersModule } from './app/orders/orders.module';
import { ToursModule } from './app/tours/tours.module';
import { StoriesModule } from './app/stories/stories.module';
import { PaymentsModule } from './app/payments/payments.module';
import { CheckoutsModule } from './app/checkouts/checkouts.module';
import { TokensModule } from './app/tokens/tokens.module';
import { DiaresModule } from './app/diares/diares.module';
import { CommentsModule } from './app/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRoot(winstonTransport),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: false,
      ssl: process.env.NODE_ENV === 'production' ? true : false,
      extra:
        process.env.NODE_ENV === 'production'
          ? {
              ssl: { rejectUnauthorized: false },
            }
          : null,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    } as TypeOrmModuleOptions),
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.THROTTLER_TTL),
      limit: parseInt(process.env.THROTTLER_LIMIT),
    }),
    UsersModule,
    AuthModule,
    OrdersModule,
    ToursModule,
    StoriesModule,
    PaymentsModule,
    CheckoutsModule,
    TokensModule,
    DiaresModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
