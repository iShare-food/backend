import knex, {Knex} from 'knex';
import dotenv from "dotenv";

dotenv.config();

// estabelecer a conexão com o banco no index.ts:

export abstract class Connection {
  protected static connection: Knex = knex ({
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    }
  })
};
