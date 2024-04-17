import { compareSync, genSaltSync, hashSync } from "bcryptjs";

const cost = Number(process.env.BCRYPT_COST);

export class HashGenerator {
  public createHash = (password: string): string => {
    const salt: string = genSaltSync(cost);

    const cypherText: string = hashSync(password, salt);

    return cypherText;
  };

  public compareHash = (password: string, cypherPassword: string): boolean => {
    return compareSync(password, cypherPassword);
  };
}
