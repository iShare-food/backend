import { UserDatabase } from "../Data/UserDatabase";
import { IdGenerator } from "../Utils/IdGenerator";

export class UserBusiness {
    constructor (
        private userDatabase: UserDatabase
    ) {}

    public createUser = async (input: any) => {

        const idGenerator = new IdGenerator();

        const id = idGenerator.generateId();

        input = {
            id: "9876",
            ...input
        }

        await this.userDatabase.insertUser(input);
    }
};