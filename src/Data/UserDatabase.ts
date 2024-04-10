import {Connection} from '../../src/connection';

export class UserDatabase extends Connection {
    
    public insertUser = async (user: any): Promise<void> => {
        try {
            await Connection.connection('users')
                .insert(user);
        }
        catch (err: any) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error(err.sqlMessage);
            }
        }
    }
};