import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authenticationToken, jwtUserData, systemError } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import AuthenticationService from "./authentication.service";
import { TOKEN_SECRET } from "../../constants";

interface localUser {
    login: string;
    password: string;
}

class AuthenticationController {

    constructor() {}

    async login(req: Request, res: Response, next: NextFunction) {
        const user: localUser = req.body;

        try {
            const userData: jwtUserData = await AuthenticationService.login(user.login, user.password);

            const authenticationToken: authenticationToken = {
                userData: userData
            };
                
            const token: string = jwt.sign(
                authenticationToken,
                TOKEN_SECRET,
                {
                    expiresIn: "3h",
                });

            return res.status(200).json({
                token: token
            });
        }
        catch (error: any) {
            return ResponseHelper.handleError(res, error as systemError, true);
        }
    };

    async loginTest(req: Request, res: Response, next: NextFunction) {
        //const user: localUser = req.body;

        const hashedPassword: string = bcrypt.hashSync("password");
        return res.status(200).json({
            result: hashedPassword
        });
    };
}
export default new AuthenticationController;