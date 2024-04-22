import { Request, Response } from 'express';
import { UserBusiness } from '../Business/UserBusiness';
import { GetUserDTO, LoginInputDTO, UserInputDTO, UserOutput, UserUpdateDTO } from '../Model/User';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public createUser = async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const { name, email, password, phoneNumber, zipCode, roleId } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                phoneNumber,
                zipCode,
                password,
                roleId
            }

            await this.userBusiness.createUser(input);
            res.status(201).send({ input, message: "Usuário criado com sucesso!" });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message);
            }
            res.status(500).send("Erro ao cadastrar");
        }
    };

    public login = async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const { email, password } = req.body;

            const input: LoginInputDTO = {
                email,
                password
            }

            const token = await this.userBusiness.login(input);
            res.status(200).send({ token, message: "Login efetuado com sucesso!" });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message);
            }
            res.status(500).send("Erro ao efetuar login");
        }
    };

    public getUser = async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const token: string = req.headers.authorization as string
            const id: string = req.params.id;

            const input: GetUserDTO = {
                id,
                token
            }

            const user: UserOutput | undefined = await this.userBusiness.getUser(input);

            res.status(200).send(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message);
            }
            res.status(500).send("Erro ao cadastrar");
        }
    }

    public updateUser = async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const token: string = req.headers.authorization as string;
            const id: string = req.params.id;
            const { name, email, phoneNumber, zipCode, roleId } = req.body;

            const input: UserUpdateDTO = {
                id, name, email, phoneNumber, zipCode, roleId, token
            }

            await this.userBusiness.updateUser(input);

            res.status(200).send("Usuário atualizado com sucesso");
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message);
            }
            res.status(500).send("Erro ao cadastrar");
        }
    }
}
