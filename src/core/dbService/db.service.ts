import * as _ from "underscore";
import { columnDefinition, tableDefinition } from "../../db-entities";
import { status, store, user } from "../../entities";
import { ColumnType, TableNames, ColumnUpdateType  } from "../../enums";
import { DbTable } from "./db-table.service";

interface localTable<T> {
    table: tableDefinition;
    instance: DbTable<T>;
}

interface IDbService {
    getFromTableById(tableName: TableNames, id: number): Promise<any>;
    updateTableById<T>(tableName: TableNames, id: number, original: T, userId: number): Promise<void>;
}

class DbService implements IDbService {

    private _tables: _.Dictionary<any> = {};

    constructor() {
        this._tables[TableNames.User] = this.addTableToContext<user>(TableNames.User, [{
                dbName: "id",
                name: "id",
                type: ColumnType.Integer,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "first_name",
                name: "firstName",
                type: ColumnType.Varchar,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            }, {
                dbName: "last_name",
                name: "lastName",
                type: ColumnType.Varchar,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            }, {
                dbName: "create_date",
                name: "createDate",
                type: ColumnType.Date,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "update_date",
                name: "updateDate",
                type: ColumnType.Date,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.CurrentDate
            }, {
                dbName: "create_user_id",
                name: "createUser",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "update_user_id",
                name: "updateUser",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.CurrentUser
            }, {
                dbName: "status_id",
                name: "statusId",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.None
            }]);

            this._tables[TableNames.Store] = this.addTableToContext<store>(TableNames.Store, [{
                dbName: "id",
                name: "id",
                type: ColumnType.Integer,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "title",
                name: "store_title",
                type: ColumnType.Varchar,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            }, {
                dbName: "address",
                name: "store_address",
                type: ColumnType.Varchar,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            }, {
                dbName: "manager_id",
                name: "managerId",
                type: ColumnType.Integer,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            }, {
                dbName: "create_date",
                name: "createDate",
                type: ColumnType.Date,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "update_date",
                name: "updateDate",
                type: ColumnType.Date,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.CurrentDate
            }, {
                dbName: "create_user_id",
                name: "createUser",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "update_user_id",
                name: "updateUser",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.CurrentUser
            }, {
                dbName: "status_id",
                name: "statusId",
                type: ColumnType.Integer,
                isForOutput: false,
                isQueriable: false,
                updateType: ColumnUpdateType.None
            }]);

            this._tables[TableNames.Status] = this.addTableToContext<status>(TableNames.Status, [{
                dbName: "id",
                name: "id",
                type: ColumnType.Integer,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.None
            }, {
                dbName: "title",
                name: "status_title",
                type: ColumnType.Varchar,
                isForOutput: true,
                isQueriable: true,
                updateType: ColumnUpdateType.Always
            }]);
    }

    public get tables(): _.Dictionary<tableDefinition> {
        return this._tables;
    }

    public async getFromTableById(tableName: TableNames, id: number): Promise<any> {
        const dbTableObject: localTable<any> = this._tables[tableName] as localTable<any>;

        return await dbTableObject.instance.getById(id);
    }

    public async updateTableById<T>(tableName: TableNames, id: number, original: T, userId: number): Promise<void> {
        const dbTableObject: localTable<any> = this._tables[tableName] as localTable<any>;

        await dbTableObject.instance.updateById(id, original, userId);
    }

    private addTableToContext<T>(tableName: TableNames, fields: columnDefinition[]): localTable<T> {
        let tableDefinition: tableDefinition = {
            name: tableName,
            fields: fields
        };

        let tableInstance: DbTable<T> = new DbTable(tableDefinition);

        let table: localTable<T> = {
            table: tableDefinition,
            instance: tableInstance
        };

        return table;
    }
}

export default new DbService();