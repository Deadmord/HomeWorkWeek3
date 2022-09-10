import { Connection, SqlClient, Error } from "msnodesqlv8";
import { product, store } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helper";
import { QueryHelper } from "../helpers/query.helper";

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
    getStore(id: number): Promise<store>;
    getUpdateStore(parametrTitle: string, parametrValue: string, id: number): Promise<string>;
}
interface IRetailService {
    getProducts(): Promise<product[]>;
    getProduct(id: number): Promise<product>;
}

export class RetailStoreService implements IRetailStoreService {
    public getStores(): Promise<store[]> {
        return new Promise<store[]>((resolve , reject) => {
            const result: store[] = [];
            const sql: SqlClient = require("msnodesqlv8");
    
            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.Store;
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                //If server doesnt work
                if(connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localStore[] | undefined) => {  
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: store[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(store => {
                                    result.push(
                                        this.parseLocalStore(store)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    public getStore(id: number): Promise<store> {
        let result: store;
        return new Promise<store>((resolve, reject) => {

            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.StoreById;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localStore[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalStore(queryResult[0])
                            }
                            else if (queryResult !== undefined && queryResult.length === 0) {
                                //TO DO: Not Found 
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    public getUpdateStore(parametrTitle: string, parametrValue: string, id: number): Promise<string> {
        let result: string;
        return new Promise<string>((resolve, reject) => {

            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = QueryHelper.updateData('store', parametrTitle, parametrValue, id);

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(`${query}`, (queryError: Error | undefined, queryResult: string[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
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
            const sql: SqlClient = require("msnodesqlv8");
    
            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.Product;
    
            sql.open(connectionString,  (connectionError: Error, connection: Connection) => {
                //If server doesnt work
                if(connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localProduct[] | undefined) => {  
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            const result: product[] = [];
                            if (queryResult !== undefined) {
                                queryResult.forEach(product => {
                                    result.push(
                                        this.parseLocalProduct(product)
                                    )
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    public getProduct(id: number): Promise<product> {
        let result: product;
        return new Promise<product>((resolve, reject) => {

            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.ProductById;

            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, General.DbconnectionError));
                }
                else {
                    connection.query(`${query} ${id}`, (queryError: Error | undefined, queryResult: localProduct[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.queryError, General.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalProduct(queryResult[0])
                            }
                            else if (queryResult !== undefined && queryResult.length === 0) {
                                //TO DO: Not Found 
                            }
                            resolve(result);
                        }
                    })
                }
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