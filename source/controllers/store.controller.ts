import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorMessages } from '../constants';
import { systemError, store, product } from '../entities';
import { ErrorHelper } from '../helpers/error.helper';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { RetailService, RetailStoreService } from '../services/store.service';


const retailService: RetailService = new RetailService();
const retailStoreService: RetailStoreService = new RetailStoreService();

const getStores = async (req: Request, res: Response, next: NextFunction) => {
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
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.id)
    if(typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            retailStoreService.getStoreById(numericParamOrError)
                .then((result: store) => {
                    return res.status(200).json({
                        result
                    });
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
    let id: number = -1;

    const sId: string = req.params.id;
    if (isNaN(Number(sId))) {
        const nonNumericError: systemError = ErrorHelper.parseError(ErrorCodes.NonNumericInput, ErrorMessages.NonNumericInput)
        return ResponseHelper.handleError(res, nonNumericError);
    }

    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    }
    else {
        const noInputParameterError: systemError = ErrorHelper.parseError(ErrorCodes.InputParameterNotSupplied, ErrorMessages.InputParameterNotSupplied)
        return ResponseHelper.handleError(res, noInputParameterError);
    }

    if (id > 0) {
        retailStoreService.getStoreById(id)
            .then((result: store) => {
                return res.status(200).json({
                    result
                });
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
    }
    else {
        // TODO: Error handling
    }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    retailService.getProducts()
        .then((result: product[]) => {
            return res.status(200).json({
                message: result
            });
        })

        .catch ((error: systemError) => {
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.QueryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
        })
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    const sId: string = req.params.id;

    if (isNaN(Number(req.params.id))) {
        // TODO: Error handling
    }

    if (sId !== null && sId !== undefined) {
        id = parseInt(sId);
    }
    else {
        // TODO: Error handling
    }

    if (id > 0) {
        retailService.getProduct(id)
            .then((result: product) => {
                return res.status(200).json({
                    result
                });
            })
            .catch((error: systemError) => {
                switch (error.code) {
                    case ErrorCodes.ConnectionError:
                        return res.status(408).json({
                            errorMessage: error.message
                        });
                    case ErrorCodes.QueryError:
                        return res.status(406).json({
                            errorMessage: error.message
                        });
                    default:
                        return res.status(400).json({
                            errorMessage: error.message
                        });
                }
            });
    }
    else {
        // TODO: Error handling
    }
};

export default { getStores, getStoreById, updateStoreById, getProducts, getProduct };