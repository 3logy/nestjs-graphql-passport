export class PerformLoginCommand {
    constructor(
        public readonly email: string, 
        public readonly password: string,
    ){ }
}