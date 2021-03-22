import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import claims from "../../claims";
import { IUserInput, IUserPayload } from "../types/user"
import dbUser, { IUser, IUserDoc } from "../../database/models/user";

const secret = process.env.JWT_SECRET as string;
const saltRounds = 10;

export async function register(user: IUserInput) {

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);

    const hashedUserInfo: IUser = {
        email: user.email,
        password: hashedPassword,
        claims: [claims.USER]
    };

    return dbUser.create(hashedUserInfo);
}

export async function login(user: IUserInput): Promise<IUserPayload> {

    let result = await dbUser.findOne({ email: user.email }); //handle null
    let userFromDb = result?.toObject() as IUser; //Possibly null

    if (!userFromDb) {
        return { status: "Incorrect email or password" }
    }

    let correctPassword = await bcrypt.compare(user.password, userFromDb.password);

    if (correctPassword) {
        let token = jwt.sign({ email: user.email }, secret, {
            expiresIn: "1h"
        });

        return { status: "Succesfully logged in", authToken: token };
    }

    return { status: "Incorrect email or password" };
}

export async function giveClaims(userEmail: string, newClaims: Array<string>) {

    let doc = await dbUser.findOne({ email: userEmail });
    const user = doc as IUserDoc;
    newClaims.forEach(claim => !user.claims?.includes(claim) ? user.claims?.push(claim) : null);
    await user.save();
    return user;
}