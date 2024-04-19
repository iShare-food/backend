import { app } from './app';
import { UserController } from './Controller/UserController';
import { UserBusiness } from './Business/UserBusiness';
import { UserDatabase } from './Data/UserDatabase';
import { TableCreator } from './Data/Migration';
import { HashGenerator } from './Utils/HashGenerator';
import { Authenticator } from './Utils/Authenticator';

const userDatabase: UserDatabase = new UserDatabase();
const tablesCreator: TableCreator = new TableCreator();
const hashGenerator: HashGenerator = new HashGenerator();
const authenticator: Authenticator = new Authenticator();

const userBusiness: UserBusiness = new UserBusiness(userDatabase, tablesCreator, hashGenerator, authenticator);
const userController: UserController = new UserController(userBusiness);

//User requests:
app.post("/user", userController.createUser);
app.post("/auth", userController.login);
app.get("/user:id", userController.getUser);