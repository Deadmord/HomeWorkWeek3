import * as _ from "underscore";
import { entityWithId, product, store, systemError } from "../../entities";
import { Status } from "../../enums";
import { Queries, StoredProcedures } from "../../constants";
import { DateHelper } from "../../framework/date.helper";
import { SqlHelper } from "../../core/sql.helper";

interface localStore {
    id: number;
    title: string;
    address: string;
    manager_id: number;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

interface localProduct {
    id: number;
    title: string;
    categories: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: number;
}

interface IRetailStoreService {
    getStores(): Promise<store[]>;
    getStoreById(id: number): Promise<store>;
    getStoreByTitle(title: string): Promise<store[]>;
    updateStoreById( store: store, userId: number): Promise<store>;
    addStore(store: store, userId: number): Promise<store>;
    addStoreByStoredProcedure(store: store, userId: number): Promise<store>;
    addStoreByStoredProcedureOutput(store: store, userId: number): Promise<store>;
    deleteStoreById(id: number, userId: number): Promise<void>;
}
interface IRetailProductService {
    getProducts(): Promise<product[]>;
    getProduct(id: number): Promise<product>;
}

class RetailStoreService implements IRetailStoreService {

    constructor() { }

    public getStores(): Promise<store[]> {
        return new Promise<store[]>((resolve , reject) => {
            const result: store[] = [];

            SqlHelper.executeQueryArrayResult<localStore>(Queries.Store, Status.Active)          
                .then((queryResult: localStore[]) => {
                    queryResult.forEach((store: localStore) => {
                        result.push(this.parseLocalStore(store));
                    });
                
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getStoreById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localStore>(Queries.StoreById, id, Status.Active)
                .then((queryResult: localStore) => {
                    resolve(this.parseLocalStore(queryResult))
                })
                .catch((error: systemError) => {
                    reject(error)
                });
        });
    }

    public updateStoreById(store: store, userId: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(Queries.UpdateStoreById, false, store.store_title, store.store_address, store.manager_id,  DateHelper.dateToString(updateDate), userId, store.id, Status.Active)
                .then(() => {
                    resolve(store);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public addStore(store: store, userId: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(Queries.AddStore, store, store.store_title, store.store_address, store.manager_id, createDate, createDate, userId, userId, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as store);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public addStoreByStoredProcedure(store: store, userId: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeStoredProcedure(StoredProcedures.AddStore, store, store.store_title, store.store_address, store.manager_id, userId)
                .then(() => {
                    resolve(store);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public addStoreByStoredProcedureOutput(store: store, userId: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeStoredProcedureWithOutput(StoredProcedures.AddStore, store, store.store_title, store.store_address, store.manager_id, userId)
                .then(() => {
                    resolve(store);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public deleteStoreById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(Queries.DeleteStoreById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getStoreByTitle(title: string): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            SqlHelper.executeQueryArrayResult<localStore>(Queries.StoreByTitle, `%${title}%`)
                .then((queryResult: localStore[]) => {
                    resolve(_.map(queryResult, (result: localStore) => this.parseLocalStore(result)));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalStore(local: localStore): store {
        return {
            id: local.id,
            store_title: local.title,
            store_address: local.address,
            manager_id: local.manager_id
        };
    }
}

class RetailProductService implements IRetailProductService {

    constructor() { };

    public getProducts(): Promise<product[]> {
        return new Promise<product[]>((resolve , reject) => {
            const result: product[] = [];

            SqlHelper.executeQueryArrayResult<localProduct>(Queries.Product, Status.Active)
                .then((queryResult: localProduct[]) => {
                    queryResult.forEach((product: localProduct ) => {
                        result.push(
                            this.parseLocalProduct(product)
                        )
                    });
                    resolve(result);
                })
                .catch((error: systemError) => {
                    reject(error);
                });

        });
    }

    public getProduct(id: number): Promise<product> {
        return new Promise<product>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localProduct>(Queries.ProductById, id, Status.Active)
                .then((queryResult: localProduct) => {
                    resolve(this.parseLocalProduct(queryResult))
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalProduct(local: localProduct): product {
        return {
            id: local.id,
            product_title: local.title,
            product_categories: local.categories
        };
    }
}

export const RetailStoreServiceInst: IRetailStoreService = new RetailStoreService();
export const RetailProductServiceInst: IRetailProductService = new RetailProductService();


        // sql.open(connectionString, (err: Error, connection: Connection) => {
            // if (error) {
            //     console.error(error);
            // }
            // else {
            //     connection.execute(query, (err: any, rows) => {
            //         console.log(rows);
            //     });
            // }
        // });

        // const config: config = {
        //     driver: 'msnodesqlv8',
        //     server: 'localhost',
        //     database: 'masa_school',
        //     options: {
        //         trustedConnection: true,
        //         useUTC: true
        //     }
        // };

        // sql.connect(config).then((pool: ConnectionPool) => {
        //     // Query
        //     return pool.request()
        //         .query(query)
        // }).then((result: any) => {
        //     console.log(result)
        // }).catch((err: any) => {
        //     console.error(err);
        // });