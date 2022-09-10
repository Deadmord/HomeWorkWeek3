export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static queryError: number = 101;
}

export class General {
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
    public static HttpQueryError: string = "Misdirected Request";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=X5RetailGroup;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export class Queries {
    public static Store: string = "SELECT * FROM store";
    public static StoreById: string = "SELECT * FROM store WHERE id = ";
    public static Product: string = "SELECT * FROM product";
    public static ProductById: string = "SELECT * FROM product WHERE id = ";
}