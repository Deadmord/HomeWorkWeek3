import * as _ from "underscore";
import { Queries, StoredProcedures } from "../../constants";
import { entityWithId, systemError, user, userRelation } from "../../entities";
import { Role, Status, TableNames } from "../../enums";
import { DateHelper } from "../../framework/date.helper";
import { SqlHelper } from "../../core/sql.helper";
import DbService from "../../core/dbService/db.service";

interface localUser {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    role: string;
    user_create_date: Date;
    user_update_date: Date;
    user_create_user_id: number;
    user_update_user_id: number;
    user_status: string;
    store: string;
    supervisor: string;
    position: string;
    relation_create_date: Date;
    relation_update_date: Date;
    relation_create_user_id: number;
    relation_update_user_id: number;
    relation_status: string;

}
interface IUserService {
    getById(userId: number): Promise<user>;
    updateById(user: user, userId: number): Promise<user>;
    add(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;

    spGetById(id: number, userId: number): Promise<user>;
    spGetByStoreId(id: number): Promise<user[]>;
}

class UserService implements IUserService {
    private _serviceTable: TableNames = TableNames.User;
    constructor() { }

    //================== Generic way =================== 

    public async getById(userId: number): Promise<user> {
        try {
            return await DbService.getFromTableById(this._serviceTable, userId);
        }
        catch (error: any) {
            throw (error as systemError);
        }
        
    }

    public async updateById(user: user, userId: number): Promise<user> {
        try {
            await DbService.updateTableById(this._serviceTable, user.id, user, userId);
            return user;
        }
        catch (error: any) {
            throw (error as systemError);
        }
    }






    //================== Regular way =================== for use delite "_Reg_"
    public updateById_Reg_(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
                .then(() => {
                    resolve(user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public add(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public deleteById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public spGetById(id: number, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            SqlHelper.executeStoredProcedureSingleResult<localUser>(StoredProcedures.GetUserById, id, Status.Active)
                .then((spResult: localUser) => {
                    resolve(this.parseLocalUser(spResult))
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public spGetByStoreId(id: number): Promise<user[]> {
        return new Promise<user[]>((resolve, reject) => {
            const result: user[] = [];
            SqlHelper.executeStoredProcedureArrayResult<localUser>(StoredProcedures.GetUserByStoreId, id, Status.Active)
                .then((spResult: localUser[]) => {
                    spResult.forEach((user: localUser) => {
                        result.push(this.parseLocalUser(user));
                    });
                    resolve(result)
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public spUpdateById(user: userRelation, userId: number): Promise<userRelation> {
        return new Promise<userRelation>((resolve, reject) => {
            //const updateDate: Date = new Date();
            SqlHelper.executeStoredProcedureSingleResult<localUser>(StoredProcedures.UpdateUserAndRelationByUserIdStoreIDSupID, 
                user.id, 
                user.storeId ? user.storeId : null,
                user.supervisorId ? user.supervisorId : null, 
                Status.Active,
                userId,
                user.firstName ? user.firstName : null,
                user.lastName ? user.lastName : null,
                user.role ? user.role : null,
                user.status ? user.status : null,
                user.newStoreId ? user.newStoreId : null,
                user.newSupervisorId ? user.newSupervisorId : null,
                user.position ? user.position : null,
                user.relation_status ? user.relation_status : null

                )                                       //TODO: Add all parameters from SP
                .then((spResult: localUser) => {
                    resolve(this.parseLocalUser(spResult))
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalUser(local: localUser): userRelation {
        return {
            id: local.id,
            firstName: local.firstname,
            lastName: local.lastname,
            login: local.login,
            password: local.password,
            role: local.role,
            create_date: local.user_create_date,
            update_date: local.user_update_date,
            create_user_id: local.user_create_user_id,
            update_user_id: local.user_update_user_id,
            status: local.user_status,
            store: local.store,
            supervisor: local.supervisor,
            position: local.position,
            relation_create_date: local.relation_create_date,
            relation_update_date: local.relation_update_date,
            relation_create_user_id: local.relation_create_user_id,
            relation_update_user_id: local.relation_update_user_id,
            relation_status: local.relation_status
        };
    }
}

export default new UserService();