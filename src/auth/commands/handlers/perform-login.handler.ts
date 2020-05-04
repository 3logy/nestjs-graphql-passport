import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { PerformLoginCommand } from "../impl/perform-login.command";
import { Users } from "src/users/users.entity";
import { getRepository } from "typeorm";

@CommandHandler(PerformLoginCommand)
export class PerformLoginHandler implements ICommandHandler<PerformLoginCommand> {


    async execute(command: PerformLoginCommand) : Promise<any> {
        
        const { email, password } = command;

        const user = getRepository(Users)
            .find({email: email, password: password});
        return user;
    }
}