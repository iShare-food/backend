import { Connection } from "../../src/connection";
import { User } from "../Model/User";

export class UserDatabase extends Connection {
  private static TABLE_NAME = "users";

  public async insertUser(
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    zipCode: string,
    roleId: number
  ): Promise<void> {
    try {
      await Connection.connection
        .insert({
          id,
          name,
          email,
          password,
          phone_number: phoneNumber,
          zip_code: zipCode,
          role_id: roleId,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (err: any) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error(err.sqlMessage);
      }
    }
  };

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user: User[] = await Connection.connection.where({ email }).from(UserDatabase.TABLE_NAME);
      return user[0];
    } catch (err: any) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error(err.sqlMessage);
      }
    }
  }
}
