import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import dotenv from 'dotenv';

export class HashGenerator {
  public createHash = (password: string): string => {
    const cost = Number(process.env.BCRYPT_COST);
    const salt: string = genSaltSync(cost);

    const cypherText: string = hashSync(password, salt);

    return cypherText;
  };

  public compareHash = (password: string, cypherPassword: string): boolean => {
    return compareSync(password, cypherPassword);
  };
}
