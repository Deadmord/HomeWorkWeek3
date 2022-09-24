import { Request, Response, NextFunction } from 'express';
import { ErrorCodes, ErrorMessages } from '../constants';
import { systemError, store, product } from '../entities';
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
            switch (error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                case ErrorCodes.queryError:
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

const getStore = async (req: Request, res: Response, next: NextFunction) => {
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
        retailStoreService.getStore(id)
            .then((result: store) => {
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
                    case ErrorCodes.queryError:
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

const getUpdateStore = async (req: Request, res: Response, next: NextFunction) => {
    let id: number = -1;
    let title: string = '';
    let value: string = '';
    
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

    if ( typeof req.query.title === 'string' ) {
        title = req.query.title;
    }
    else {
        console.log('title heroviy!\n');
    }

    if ( typeof req.query.value === 'string' ) {
        value = req.query.value;
    }
    else {
        console.log('VALUE, blya, vvodi!!!\n');
    }
    
    console.log(id,title,value);

    if (id > 0 && title != '' && value != '') {
        retailStoreService.getUpdateStore(title, value, id)
            .then((result: string) => {
                return res.status(200).json({
                    result
                });
            })
            .catch((error: systemError) => {
                console.log('tut oshibka')
                switch (error.code) {
                    case ErrorCodes.ConnectionError:
                        return res.status(408).json({
                            errorMessage: error.message
                        });
                    case ErrorCodes.queryError:
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
        return res.status(421).json({
            errorMessage: ErrorMessages.HttpQueryError
        });
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
                case ErrorCodes.queryError:
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
                    case ErrorCodes.queryError:
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

export default { getStores, getStore, getUpdateStore, getProducts, getProduct };