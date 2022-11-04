export class SqlParameters {
    public static Id: string = "id";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=X5RetailGroup;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
export const NON_EXISTENT_ID: number = -1;
export const TOKEN_SECRET: string = "d509c3f7-7538-4c8f-9153-3d7c4c1760ed"; //Online GUID generator
export class Queries {
    public static Store: string = "SELECT * FROM store WHERE status_id = ?";
    public static StoreById: string = "SELECT * FROM store WHERE id = ? AND status_id = ?";
    public static StoreByTitle: string = "SELECT * FROM store WHERE title LIKE ?";
    public static UpdateStoreById: string = "UPDATE store SET title = ?, address = ?, manager_id = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    
    public static AddStore: string = "INSERT store (title, address, manager_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteStoreById: string = "UPDATE store SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
    
    public static GetUserByLogin: string = "SELECT id, password, role_id FROM [user] WHERE login = ?";

    public static UpdateUserById: string = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    public static AddUser: string = "INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteUserById: string = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";

    //poduct
    public static Product: string = "SELECT * FROM product WHERE status_id = ?";
    public static ProductById: string = "SELECT * FROM product WHERE id = ? AND status_id = ?";

    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";
}
export class StoredProcedures {
    public static AddStore: string = "sp_create_board_type"; //TODO: Исправить тут SP!!!!
    public static AddStoreOutput: string = "sp_create_board_type_output"; //TODO: Исправить тут SP!!!!
    
    public static GetUserById: string = "sp_get_employee_by_ID";                //привести SP в соответствие с user interface
    public static GetUserByStoreId: string = "sp_get_employees_by_store_ID";    //привести SP в соответствие с user interface
    public static UpdateUserAndRelationByUserIdStoreIDSupID: string = "sp_update_employee_and_relation_by_userID_storeID_supID";
}