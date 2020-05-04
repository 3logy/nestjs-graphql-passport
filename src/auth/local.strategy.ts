import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PerformLoginCommand } from './commands/impl/perform-login.command';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private commandBus: CommandBus,
  ) { super(); }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.commandBus.execute(
      new PerformLoginCommand(email, password)
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}