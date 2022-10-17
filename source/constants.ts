export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;
}

export class ErrorMessages {
    public static DbconnectionError: string = "DB server connection error";
    public static SqlQueryError: string = "Incorrect query";
    public static HttpQueryError: string = "Misdirected Request";
    public static NoDataFound: string = "Not found";
    public static NonNumericInput: string = "Invalid input. Not a number"
    public static InputParameterNotSupplied: string = "Input parameter not supplied";
}

export class SqlParameters {
    public static Id: string = "id";
}

export const DB_CONNECTION_STRING: string = "server=.;Database=X5RetailGroup;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

export class Queries {
    public static Store: string = "SELECT * FROM store";
    public static StoreById: string = "SELECT * FROM store WHERE id = ?";
    public static Product: string = "SELECT * FROM product";
    public static ProductById: string = "SELECT * FROM product WHERE id = ?";
}