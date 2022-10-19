import { Connection, SqlClient, Error } from "msnodesqlv8";
import { product, store, systemError } from "../entities";
import { ErrorCodes, ErrorMessages, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helper";
import { QueryHelper } from "../helpers/query.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { connect } from "mssql";

interface localStore {
    id: number;
    title: string;
    address: string;
    manager_id: number;
}

interface localProduct {
    id: number;
    title: string;
    categories: string;
}

interface IRetailStoreService {
    getStores(): Promise<store[]>;
    getStoreById(id: number): Promise<store>;
    updateStoreById( store: store): Promise<void>;
}
interface IRetailService {
    getProducts(): Promise<product[]>;
    getProduct(id: number): Promise<product>;
}

export class RetailStoreService implements IRetailStoreService {
    public getStores(): Promise<store[]> {
        return new Promise<store[]>((resolve , reject) => {
            const result: store[] = [];

            SqlHelper.executeQueryArrayResult<localStore>(Queries.Store)          
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
            SqlHelper.executeQuerySingleResult<localStore>(Queries.StoreById, id)
                .then((queryResult: localStore) => {
                    resolve(this.parseLocalStore(queryResult))
                })
                .catch((error: systemError) => {
                    reject(error)
                });
        });
    }

    public updateStoreById(store: store): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(Queries.UpdateStoreById, store.store_title, store.store_address, store.manager_id, store.id)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public getUpdateStore(parametrTitle: string, parametrValue: string, id: number): Promise<string> {
        let result: string;
        return new Promise<string>((resolve, reject) => {

            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = QueryHelper.updateData('store', parametrTitle, parametrValue, id);

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, ErrorMessages.DbconnectionError));
                }
                else {
                    connection.query(`${query}`, (queryError: Error | undefined, queryResult: string[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError));
                        }
                        else {
                            
                            if (queryResult !== undefined) {
                                result = queryResult[0];
                            }
                            resolve('Update successful!');
                        }
                    })
                }
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

export class RetailService implements IRetailService {
    public getProducts(): Promise<product[]> {
        return new Promise<product[]>((resolve , reject) => {
            const result: product[] = [];

            SqlHelper.executeQueryArrayResult<localProduct>(Queries.Product)
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
            SqlHelper.executeQuerySingleResult<localProduct>(Queries.ProductById, id)
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