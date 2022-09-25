import { Connection, SqlClient, Error } from "msnodesqlv8";
import { DB_CONNECTION_STRING, ErrorCodes, ErrorMessages } from "../constants";
import { systemError } from "../entities";
import { ErrorHelper } from "./error.helper";

export class SqlHelper {
    static sql: SqlClient = require("msnodesqlv8");

    public static openConnection(): Promise<Connection> {
        return new Promise<Connection>((resolve, reject) => {
            SqlHelper.sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, ErrorMessages.DbconnectionError));
                }
                else {
                    resolve(connection);
                }
            });
        });
    }

    public static executeQueryArrayResult<T>(connection: Connection, query: string): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {  
                if (queryError) {
                    reject(ErrorHelper.parseError(ErrorCodes.queryError, ErrorMessages.SqlQueryError));
                }
                else {
                    if (queryResult !== undefined) {
                        resolve(queryResult);
                    }
                    else {
                        resolve([]);
                    }
                }
            })
        });
    }

    public static executeQuerySingleResult<T>(connection: Connection, query: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            connection.query(query, (queryError: Error | undefined, queryResult: T[] | undefined) => {  
                if (queryError) {
                    reject(ErrorHelper.parseError(ErrorCodes.queryError, ErrorMessages.SqlQueryError));
                }
                else {
                    const notFoundError: systemError = ErrorHelper.parseError(ErrorCodes.NoData, ErrorMessages.SqlQueryError);
                    if (queryResult !== undefined) {
                        switch (queryResult.length) {
                            case 0:
                                reject(notFoundError)
                                break;
                            case 1:
                                resolve(queryResult[0]);
                                break;
                            default:
                                resolve(queryResult[0]);
                                break;
                        }
                    }
                    else {
                        reject(notFoundError);
                    }
                } 
            })
        });
    }

}