import {JwtPayload} from "jsonwebtoken";

export const tokenCheck = async (token: JwtPayload, type: string = "login") => {
        return token.type == type;
}