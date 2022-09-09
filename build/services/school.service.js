"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
class SchoolService {
    getBoardTypes() {
        const sql = require("msnodesqlv8");
        const connectionString = "server=.;Database=masa_school;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
        const query = "SELECT * FROM white_board_type";
        sql.open(connectionString, (connectionError, connection) => {
            connection.query(query, (queryError, result) => {
                console.log(result);
            });
        });
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
        return "getBoardTypes";
    }
}
exports.SchoolService = SchoolService;
