import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UserCreatedEvent } from './events/impl/user-created.event';
import { UsersSagas } from './sagas/users.saga';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers =  [];
export const EventHandlers = [UserCreatedEvent];
@Module({
    imports: [CqrsModule,
        TypeOrmModule.forFeature([UserRepository])
    ],
    providers: [
        UserRepository,
        UsersResolver,
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers, 
        UsersSagas,
    ],
})
export class UsersModule {}
