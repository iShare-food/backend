import {app} from './app';
import { UserController } from './Controller/UserController';
import { UserBusiness } from './Business/UserBusiness';
import { UserDatabase } from './Data/UserDatabase';

const userDatabase: UserDatabase = new UserDatabase();
const userBusiness: UserBusiness = new UserBusiness(userDatabase);
const userController: UserController = new UserController(userBusiness);

//User requests:
app.post("/user", userController.createUser);