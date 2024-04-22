import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import dotenv from 'dotenv';

export class HashGenerator {
  public createHash = (password: string | undefined): string => {
    const cost = Number(process.env.BCRYPT_COST);
    const salt: string = genSaltSync(cost);

    if (!password) throw new Error('Senha não recebida');

    return hashSync(password, salt);
  };

  public compareHash = (password: string, cypherPassword: string): boolean => {
    return compareSync(password, cypherPassword);
  };
}
