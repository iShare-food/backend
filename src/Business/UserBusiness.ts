import { TableCreator } from "../Data/Migration";
import { UserDatabase } from "../Data/UserDatabase";
import { LoginInputDTO, User, UserInputDTO } from "../Model/User";
import { Authenticator } from "../Utils/Authenticator";
import { FieldValidators } from "../Utils/FieldsValidators";
import { HashGenerator } from "../Utils/HashGenerator";
import { IdGenerator } from "../Utils/IdGenerator";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private createTable: TableCreator,
    private hashGenerator: HashGenerator,
    private authenticator: Authenticator
  ) { }

  public checkRequiredUserFields = (user: UserInputDTO) => {
    const { name, email, password, phoneNumber, zipCode, roleId } = user;

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
  }
  public createUser = async (input: UserInputDTO) => {
    const { name, email, password, phoneNumber, zipCode, roleId } = input;

    this.checkRequiredUserFields(input);

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

    const hashedPassword = this.hashGenerator.createHash(password);

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

  public login = async (input: LoginInputDTO) => {
    const { email, password } = input;

    if (!email || !password) throw new Error("Um dos campos está vazio");

    await this.createTable.createTables();
    const user: User | undefined = await this.userDatabase.getUserByEmail(
      email
    );

    if (!user) throw new Error("Email não cadastrado!");

    const isPasswordCorrect: boolean = this.hashGenerator.compareHash(
      password,
      user.getPassword()
    );

    if (!isPasswordCorrect) throw new Error("Senha incorreta!");

    const token: string = this.authenticator.generateToken({
      id: user.getId(),
      role: user.getRole(),
    });

    return token;
  };
}
