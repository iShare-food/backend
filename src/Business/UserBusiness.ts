import { TableCreator } from "../Data/Migration";
import { UserDatabase } from "../Data/UserDatabase";
import { GetUserDTO, LoginInputDTO, User, UserInputDTO, UserOutput, UserUpdateDTO } from "../Model/User";
import { AuthenticationData, Authenticator } from "../Utils/Authenticator";
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

  public checkRequiredUserFields = (fields: any) => {
    fields.forEach((item: { value: any, key: string }) => {
      if (!item.value) throw new Error(`Campo '${item.key}' vazio`);
    });
  }
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

    this.checkRequiredUserFields(fields);

    const errorMessage: string = FieldValidators.isAllUserFieldsValid(
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

    const idGenerator: IdGenerator = new IdGenerator();

    const id: string = idGenerator.generateId();

    const hashedPassword: string = this.hashGenerator.createHash(password);

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

  public getUser = async (input: GetUserDTO): Promise<UserOutput | undefined> => {
    const { id, token } = input;

    const authentication = this.authenticator.getTokenData(token) as AuthenticationData

    if (!authentication) throw new Error("Token inválido!");

    const user: User | undefined = await this.userDatabase.getUserById(id);

    if (!user) throw new Error("Usuário não existe!");

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      zipCode: user.getZipCode(),
      roleId: user.getRole(),
    }
  }

  public updateUser = async (input: UserUpdateDTO): Promise<void> => {
    const { id, name, email, phoneNumber, zipCode, roleId, token } = input;

    const authentication = this.authenticator.getTokenData(token);

    if (!authentication) throw new Error("Token inválido!");

    const fields = [
      { value: id, key: 'id' },
      { value: name, key: 'nome' },
      { value: email, key: 'email' },
      { value: phoneNumber, key: 'telefone' },
      { value: zipCode, key: 'cep' },
      { value: token, key: 'token' }
    ];

    this.checkRequiredUserFields(fields);

    const errorMessage: string = FieldValidators.isAllUserFieldsValid(
      email,
      name,
      phoneNumber,
      zipCode
    );
    if (errorMessage) {
      throw new Error(errorMessage);
    }

    User.idToUserRole(roleId);

    const user = await this.userDatabase.getUserById(id);

    if (!user) throw new Error("Usuário não existe!");

    await this.userDatabase.updateUser(id, name, email, phoneNumber, zipCode, roleId);
  }
}
