import bcrypt from "bcrypt";
import claims from "../../claims";
import { IUserInput } from "../types/user"
import dbUser, { IUser } from "../../database/models/user";

const saltRounds = 10;

export async function register(input: IUserInput){
    
    const hashedPassword = await bcrypt.hash(input.password, saltRounds);

    const hashedUserInfo: IUser = {
        email: input.email,
        password: hashedPassword,
        claims: [claims.USER]
    };

    return dbUser.create(hashedUserInfo);
}