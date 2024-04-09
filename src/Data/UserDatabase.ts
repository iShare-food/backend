import {connection} from '../../src/connection';

export class UserDatabase {
    
    public insertUser = async (user: any): Promise<void> => {
        try {
            await connection('users')
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