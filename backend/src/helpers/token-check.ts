import {JwtPayload} from "jsonwebtoken";

export const tokenCheck = async (token: JwtPayload, type: string = "login") => {
        return token.type == type; //world's most useful line of code
}