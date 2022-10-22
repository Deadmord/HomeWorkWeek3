import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { ErrorService } from '../services/error.service';
import { AuthenticationService } from '../services/authentication.service';
import { authenticationToken, jwtUserData, systemError } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { TOKEN_SECRET } from '../constants';
import bcrypt from "bcryptjs"

interface localUser {
    login: string;
    password: string;
}

const errorService: ErrorService = new ErrorService();
const authenticationService: AuthenticationService = new AuthenticationService(errorService);

const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: localUser = req.body;

    try {
        const userData: jwtUserData = await authenticationService.login(user.login, user.password);

        const authenticationToken: authenticationToken = {
            userData: userData
        };
            
        const token: string = jwt.sign(
            authenticationToken,
            TOKEN_SECRET,
            {
                expiresIn: "30m",
            });

        return res.status(200).json({
            token: token
        });
    }
    catch (error: any) {
        return ResponseHelper.handleError(res, error as systemError, true);
    }
};

const loginTest = async (req: Request, res: Response, next: NextFunction) => {
    //const user: localUser = req.body;

    const hashedPassword: string = bcrypt.hashSync("password");
    return res.status(200).json({
        result: hashedPassword
    });
};

export default { login, loginTest };