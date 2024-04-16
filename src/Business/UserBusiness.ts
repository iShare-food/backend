import { TableCreator } from "../Data/Migration";
import { UserDatabase } from "../Data/UserDatabase";
import { User, UserInputDTO } from "../Model/User";
import { FieldValidators } from "../Utils/FieldsValidators";
import { IdGenerator } from "../Utils/IdGenerator";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private createTable: TableCreator
  ) {}

  public createUser = async (input: UserInputDTO) => {
    const { name, email, password, phoneNumber, zipCode, roleId } = input;

    if (!name || !email || !password || !phoneNumber || !zipCode || !roleId) {
        throw new Error("Campos incompletos !");
    }

    const errorMessage = FieldValidators.isAllUserFieldsValid(email, name, phoneNumber, zipCode);
    if (errorMessage) {
        throw new Error(errorMessage);
    }

    User.idToUserRole(roleId);

    await this.createTable.createTables();

    const idGenerator = new IdGenerator();

    const id = idGenerator.generateId();

    const newUser: User = new User(
      id,
      name,
      email,
      password,
      phoneNumber,
      zipCode,
      roleId
    );

    await this.userDatabase.insertUser(
      newUser.getId(),
      newUser.getName(),
      newUser.getEmail(),
      newUser.getPassword(),
      newUser.getPhoneNumber(),
      newUser.getZipCode(),
      newUser.getRole()
    );
  };
}
