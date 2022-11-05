import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { RequestHelper } from "../../core/request.helper";
import { AuthenticatedRequest, systemError, user, userRelation } from "../../entities";
import { ResponseHelper } from "../../framework/response.helper";
import UserService from "./user.service";
import { NON_EXISTENT_ID } from "../../constants";

class UserController {

  constructor() {}

  async getByIdtest(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      success: true,
      data: [
        {
          name: "John",
        },
        {
          name: "Steve",
        },
      ],
    });
  }
  async getById(req: Request, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const result: user = await UserService.getById(numericParamOrError);
            return res.status(200).json(result);
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
  }

  async add(req: Request, res: Response, next: NextFunction) {
      const body: user = req.body;

      const hashedPassword: string = bcrypt.hashSync(body.password as string);

      UserService.add({
          id: NON_EXISTENT_ID,
          firstName: body.firstName,
          lastName: body.lastName,
          login: body.login,
          password: hashedPassword
      }, (req as AuthenticatedRequest).userData.userId)
          .then((result: user) => {
              const returnedUser: user = {
                  id: result.id,
                  firstName: result.firstName,
                  lastName: result.lastName
              };
              return res.status(200).json(returnedUser);
          })
          .catch((error: systemError) => {
              return ResponseHelper.handleError(res, error);
          });
  };

  async updateById(req: Request, res: Response, next: NextFunction) {
      const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
      if (typeof numericParamOrError === "number") {
          if (numericParamOrError > 0) {
              const body: user = req.body;

              UserService.updateById({
                  id: numericParamOrError,
                  firstName: body.firstName,
                  lastName: body.lastName
              }, (req as AuthenticatedRequest).userData.userId)
                  .then((result: user) => {
                      return res.status(200).json(result);
                  })
                  .catch((error: systemError) => {
                      return ResponseHelper.handleError(res, error);
                  });
          }
          else {
              // TODO: Error handling
          }
      }
      else {
          return ResponseHelper.handleError(res, numericParamOrError);
      }
  };

  async deleteById(req: Request, res: Response, next: NextFunction) {
      const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
      if (typeof numericParamOrError === "number") {
          if (numericParamOrError > 0) {
              UserService.deleteById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                  .then(() => {
                      return res.sendStatus(200);
                  })
                  .catch((error: systemError) => {
                      return ResponseHelper.handleError(res, error);
                  });
          }
          else {
              // TODO: Error handling
          }
      }
      else {
          return ResponseHelper.handleError(res, numericParamOrError);
      }
  };

  async spGetById(req: Request, res: Response, next: NextFunction) {
      const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
      if (typeof numericParamOrError === "number") {
          if (numericParamOrError > 0) {
              UserService.spGetById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
                  .then((result: user) => {
                      return res.status(200).json(result);
                  })
                  .catch((error: systemError) => {
                      return ResponseHelper.handleError(res, error);
                  });
          }
          else {
              // TODO: Error handling
          }
      }
      else {
          return ResponseHelper.handleError(res, numericParamOrError);
      }
  };

  async spGetByStoreId(req: Request, res: Response, next: NextFunction) {
      const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
      if (typeof numericParamOrError === "number") {
          if (numericParamOrError > 0) {
              UserService.spGetByStoreId(numericParamOrError)
                  .then((result: user[]) => {
                      return res.status(200).json(result);
                  })
                  .catch((error: systemError) => {
                      return ResponseHelper.handleError(res, error);
                  });
          }
          else {
              // TODO: Error handling
          }
      }
      else {
          return ResponseHelper.handleError(res, numericParamOrError);
      }
  };

  async spUpdateById(req: Request, res: Response, next: NextFunction) {
      const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
      if (typeof numericParamOrError === "number") {
          if (numericParamOrError > 0) {
              const body: userRelation = req.body;

              UserService.spUpdateById({
                  id: numericParamOrError,
                  storeId: body.storeId,
                  supervisorId: body.supervisorId,
                  firstName: body.firstName,
                  lastName: body.lastName,
                  role: body.role,
                  status: body.status,
                  newStoreId: body.newStoreId,
                  newSupervisorId: body.newSupervisorId,
                  position: body.position,
                  relation_status: body.relation_status
              }, (req as AuthenticatedRequest).userData.userId)
                  .then((result: userRelation) => {
                      return res.status(200).json(result);
                  })
                  .catch((error: systemError) => {
                      return ResponseHelper.handleError(res, error);
                  });
          }
          else {
              // TODO: Error handling
          }
      }
      else {
          return ResponseHelper.handleError(res, numericParamOrError);
      }
  };
}

export default new UserController();