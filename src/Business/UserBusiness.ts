import { TableCreator } from "../Data/Migration";
import { UserDatabase } from "../Data/UserDatabase";
import { User, UserInputDTO } from "../Model/User";
import { FieldValidators } from "../Utils/FieldsValidators";
import { HashGenerator } from "../Utils/HashGenerator";
import { IdGenerator } from "../Utils/IdGenerator";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private createTable: TableCreator
  ) {}

  public createUser = async (input: UserInputDTO) => {
    const { name, email, password, phoneNumber, zipCode, roleId } = input;

    const fields = [
      { value: name, key: "nome" },
      { value: email, key: "email" },
      { value: password, key: "senha" },
      { value: phoneNumber, key: "telefone" },
      { value: zipCode, key: "cep" },
      { value: roleId, key: "tipo de usuário" },
    ];

    fields.forEach((item) => {
      if (!item.value) throw new Error(`Campo '${item.key}' vazio`);
    });

    const errorMessage = FieldValidators.isAllUserFieldsValid(
      email,
      name,
      phoneNumber,
      zipCode
    );
    if (errorMessage) {
      throw new Error(errorMessage);
    }

    User.idToUserRole(roleId);

    await this.createTable.createTables();

    const idGenerator = new IdGenerator();

    const id = idGenerator.generateId();

    const hashGenerator = new HashGenerator();

    const hashedPassword = hashGenerator.createHash(password);

    const newUser: User = new User(
      id,
      name,
      email,
      hashedPassword,
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
