import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    GraphQLModule.forRootAsync({
      useFactory: () => ({
        context: ({ req }) =>  ({ req }),
        typeDefs: [],
        resolvers: [],
        typePaths: ['./**/*.graphql'],
        installSubscriptionHandlers: true,
        definitions: {
          path: join(process.cwd(), 'graphql.schema.ts'),
          outputAs: 'class',
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    CqrsModule],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {}
