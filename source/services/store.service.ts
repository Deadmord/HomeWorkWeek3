import { Connection, SqlClient, Error } from "msnodesqlv8";
import { product } from "../entities";
import { ErrorCodes, General, DB_CONNECTION_STRING, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helper";

interface localProduct {
    id: number;
    title: string;
    categories: string;
}

interface ISchoolService {
    getBoardTypes(): Promise<product[]>;
    getBoardType(id: number): Promise<product>;
}

export class SchoolService implements ISchoolService {
    public getBoardTypes(): Promise<product[]> {
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

    public getBoardType(id: number): Promise<product> {
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