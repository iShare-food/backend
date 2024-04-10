import { Connection } from "../connection";

export class TableCreator extends Connection {
  public async createTables(): Promise<void> {
    try {
      await Connection.connection.raw(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                phone_number VARCHAR(255) NOT NULL,
                zip_code VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                FOREIGN KEY (role_id) REFERENCES roles(id)
            );

            CREATE TABLE IF NOT EXISTS roles (
                id INT PRIMARY KEY,
                role VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS posts (
                id VARCHAR(255) PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id),
                created_at DATE NOT NULL,
                due_date DATE NOT NULL,
                picture VARCHAR(255)
            );

            CREATE TABLE IF NOT EXISTS donations (
                id VARCHAR(255) PRIMARY KEY,
                post_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (post_id) REFERENCES posts(id),
                title VARCHAR(255) NOT NULL,
                quantity INT NOT NULL,
                category_id INT NOT NULL,
                FOREIGN KEY (category_id) REFERENCES categories(id)
            );
                
            CREATE TABLE IF NOT EXISTS categories (
                id INT PRIMARY KEY,
                category VARCHAR(255) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS orders (
                id VARCHAR(255) PRIMARY KEY,
                donation_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (donation_id) REFERENCES donations(id),
                quantity INT NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
