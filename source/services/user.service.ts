import * as _ from "underscore";
import { Queries, StoredProcedures } from "../constants";
import { entityWithId, systemError, user } from "../entities";
import { Role, Status } from "../enums";
import { DateHelper } from "../helpers/date.helper";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";

interface localUser {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    password: string;
    status: string;
    position: string;
    role: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    supervisor: string;
}
interface IUserService {
    updateById(user: user, userId: number): Promise<user>;
    add(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;

    spGetById(id: number, userId: number): Promise<user>;
    spGetByStoreId(id: number): Promise<user[]>;
}

export class UserService implements IUserService {

    constructor(
        private errorService: ErrorService
    ) { }

    public updateById(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
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
            SqlHelper.createNew(this.errorService, Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
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
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
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
            SqlHelper.executeStoredProcedureSingleResult<localUser>(this.errorService, StoredProcedures.GetUserById, id, Status.Active)
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
            SqlHelper.executeStoredProcedureArrayResult<localUser>(this.errorService, StoredProcedures.GetUserByStoreId, id, Status.Active)
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

    private parseLocalUser(local: localUser): user {
        return {
            id: local.id,
            firstName: local.firstname,
            lastName: local.lastname,
            login: local.login,
            password: local.password,
            position: local.position,
            role: local.role,
            create_date: local.create_date,
            update_date: local.update_date,
            supervisor: local.supervisor
        };
    }
}