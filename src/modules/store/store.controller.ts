import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, product, store, systemError } from "../../entities";
import { RequestHelper } from "../../core/request.helper";
import { ResponseHelper } from "../../framework/response.helper";
import { RetailStoreServiceInst as RetailStoreService, RetailProductServiceInst as RetailProductService } from "./store.service";
import { NON_EXISTENT_ID } from "../../constants";

class StoreController {

  constructor() {}

  async getStores(req: Request, res: Response, next: NextFunction) {
    //console.log("User data: ", (req as AuthenticatedRequest).userData);
    RetailStoreService.getStores()
        .then((result: store[]) => {
            return res.status(200).json({
                message: result
            });
        })
        .catch ((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
  }

  async getStoreById(req: Request, res: Response, next: NextFunction) {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            RetailStoreService.getStoreById(numericParamOrError)
                .then((result: store) => {
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
  }

    // SQL injection made by sending the following as a parameter: <' OR 1=1 -- >
    async getStoreByTitle(req: Request, res: Response, next: NextFunction) {
        let title: string = req.params.title;
        
        RetailStoreService.getStoreByTitle(title)
            .then((result: store[]) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }

    async updateStoreById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        if(typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                const body: store = req.body;

                RetailStoreService.updateStoreById({
                    id: numericParamOrError,
                    store_title: body.store_title,
                    store_address: body.store_address,
                    manager_id: body.manager_id
                }, (req as AuthenticatedRequest).userData.userId)
                    .then((result: store) => {
                        return res.status(200).json(result);
                    })
                    .catch((error: systemError) => {
                        return ResponseHelper.handleError(res, error);
                    });
            }
            else{
                //TODO: Error hendling
            }
        }
        else {
            return ResponseHelper.handleError(res, numericParamOrError);
        }
    }

    async addStore(req: Request, res: Response, next: NextFunction) {
        const body: store = req.body;
    
        RetailStoreService.addStore({
            id: NON_EXISTENT_ID,
            store_title: body.store_title,
            store_address: body.store_address,
            manager_id: body.manager_id
        }, (req as AuthenticatedRequest).userData.userId)
            .then((result: store) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }

    async addStoreByStoredProcedure(req: Request, res: Response, next: NextFunction) {
        const body: store = req.body;
    
        RetailStoreService.addStoreByStoredProcedure({
            id: NON_EXISTENT_ID,
            store_title: body.store_title,
            store_address: body.store_address,
            manager_id: body.manager_id
        }, (req as AuthenticatedRequest).userData.userId)
            .then((result: store) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    };
    
    async addStoreByStoredProcedureOutput(req: Request, res: Response, next: NextFunction) {
        const body: store = req.body;
    
        RetailStoreService.addStoreByStoredProcedureOutput({
            id: NON_EXISTENT_ID,
            store_title: body.store_title,
            store_address: body.store_address,
            manager_id: body.manager_id
        }, (req as AuthenticatedRequest).userData.userId)
            .then((result: store) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }

    async deleteStoreById(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                RetailStoreService.deleteStoreById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
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
    }

    //-------------Products-------------
    async getProducts(req: Request, res: Response, next: NextFunction) {
        console.log("User data: ", (req as AuthenticatedRequest).userData);
        RetailProductService.getProducts()
            .then((result: product[]) => {
                return res.status(200).json({
                    message: result
                });
            })
            .catch ((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            })
    };
    
    async getProduct(req: Request, res: Response, next: NextFunction) {
        const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
        
        if (typeof numericParamOrError === "number") {
            if (numericParamOrError > 0) {
                RetailProductService.getProduct(numericParamOrError)
                    .then((result: product) => {
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



export default new StoreController();