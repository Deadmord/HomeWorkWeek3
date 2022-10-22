import { Request, Response, NextFunction } from 'express';
import { NON_EXISTENT_ID } from '../constants';
import { systemError, store, product, AuthenticatedRequest } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { RetailService, RetailStoreService } from '../services/store.service';

const errorService: ErrorService = new ErrorService();
const retailProductService: RetailService = new RetailService(errorService);
const retailStoreService: RetailStoreService = new RetailStoreService(errorService);

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData);
    retailStoreService.getStores()
        .then((result: store[]) => {
            return res.status(200).json({
                message: result
            });
        })
        .catch ((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            retailStoreService.getStoreById(numericParamOrError)
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
};

const updateStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: store = req.body;

            retailStoreService.updateStoreById({
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
};

const addStore = async (req: Request, res: Response, next: NextFunction) => {
    const body: store = req.body;

    retailStoreService.addStore({
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
const addStoreByStoredProcedure = async (req: Request, res: Response, next: NextFunction) => {
    const body: store = req.body;

    retailStoreService.addStoreByStoredProcedure({
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

const addStoreByStoredProcedureOutput = async (req: Request, res: Response, next: NextFunction) => {
    const body: store = req.body;

    retailStoreService.addStoreByStoredProcedureOutput({
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

const deleteStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            retailStoreService.deleteStoreById(numericParamOrError, (req as AuthenticatedRequest).userData.userId)
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

// SQL injection made by sending the following as a parameter: <' OR 1=1 -- >
const getStoreByTitle = async (req: Request, res: Response, next: NextFunction) => {
    let title: string = req.params.title;
    
    retailStoreService.getStoreByTitle(title)
        .then((result: store[]) => {
            return res.status(200).json(result);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

//-------------Products-------------
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    console.log("User data: ", (req as AuthenticatedRequest).userData);
    retailProductService.getProducts()
        .then((result: product[]) => {
            return res.status(200).json({
                message: result
            });
        })
        .catch ((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        })
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            retailProductService.getProduct(numericParamOrError)
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

export default { getStores, getStoreById, updateStoreById, addStore, addStoreByStoredProcedure, addStoreByStoredProcedureOutput, deleteStoreById, getStoreByTitle, getProducts, getProduct };