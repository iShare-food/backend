import { Request, Response } from 'express';
import { UserBusiness } from '../Business/UserBusiness';
import { UserInputDTO } from '../Model/User';

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
            res.status(201).send({input, message: "Usuário criado com sucesso!" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message);
            }
            res.status(500).send("Erro ao cadastrar");
        }
    }
};