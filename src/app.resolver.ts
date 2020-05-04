import { Mutation, Resolver, GqlExecutionContext } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { createParamDecorator, ExecutionContext, Body, UseGuards } from '@nestjs/common';
import { CreateUserCommand } from './users/commands/impl/create-user.command';
import { LocalAuthGuard } from './auth/local-aut.guard';
import { AuthPayload } from 'graphql.schema';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context);
      const request  = ctx.getContext();
      request.body = ctx.getArgs();
      return request.user;
    },
);

export class SignUp { 

    email: string;
    username: string;
    password: string;
};

@Resolver ('App')
export class AppResolver { 

    constructor(
        private commandBus: CommandBus,
    ) {}


    @Mutation('signup')
    public async signup(@Body('input') input: SignUp ) {
        
        try {
            return await this.commandBus.execute( 
                new CreateUserCommand(input.username, 
                   input.email, input.password));
        } catch (errors) {
            console.log("Caught promise rejection (validation failed). Errors: ", errors);
        }
    }

    @UseGuards(LocalAuthGuard)
    @Mutation('login')
    public async login(@CurrentUser() req ): Promise<AuthPayload> {
        
        return {
            email: req.email, 
        };
    }
}