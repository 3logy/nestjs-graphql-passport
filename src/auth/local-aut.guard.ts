import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

    constructor() {
        super();
    }  

    async canActivate(context: ExecutionContext): Promise<boolean> {
        await super.canActivate(context);
        const ctx = GqlExecutionContext.create(context);
        const request  = ctx.getContext();
        request.body = ctx.getArgs();
        return true;
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request  = ctx.getContext();
        request.body = ctx.getArgs();
        return request;
    }


}