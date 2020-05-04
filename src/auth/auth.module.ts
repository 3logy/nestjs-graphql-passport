import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformLoginHandler } from './commands/handlers/perform-login.handler';
import { LocalStrategy } from './local.strategy';

export const CommandHandlers = [PerformLoginHandler];
export const QueryHandlers =  [];
export const EventHandlers = [];
@Module({
  imports: [CqrsModule,
    PassportModule.register({defaultStrategy: 'local'}), 
    TypeOrmModule.forFeature([ ]),
  ],
  providers: [
    LocalStrategy,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
  exports: [],
})
export class AuthModule {}