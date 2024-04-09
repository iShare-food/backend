import { Request, Response } from 'express';
import { UserBusiness } from '../Business/UserBusiness';

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public createUser = async (req: Request, res: Response): Promise<void | Response> => {
        try {
            const { name, email, password, phone, zipCode } = req.body;

            const input = {
                name,
                email,
                phone_number: phone,
                zip_code: zipCode,
                password
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