import {app} from './app';
import { UserController } from './Controller/UserController';
import { UserBusiness } from './Business/UserBusiness';
import { UserDatabase } from './Data/UserDatabase';
import { TableCreator } from './Data/Migration';

const userDatabase: UserDatabase = new UserDatabase();
const tablesCreator: TableCreator = new TableCreator();

const userBusiness: UserBusiness = new UserBusiness(userDatabase, tablesCreator);
const userController: UserController = new UserController(userBusiness);

//User requests:
app.post("/user", userController.createUser);