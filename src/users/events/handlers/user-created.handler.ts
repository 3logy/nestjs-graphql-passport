import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserCreatedEvent } from "../impl/user-created.event";

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements 
    IEventHandler<UserCreatedEvent> {

    handle(event: UserCreatedEvent) {
        console.log('UserCreatedEvent...'
            + event.userId );
    }
}