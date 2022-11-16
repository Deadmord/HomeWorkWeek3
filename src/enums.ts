export enum Status {
    Active = 1,
    NotActive = 2
}

export enum Role {
    Administrator = 3,
    Manager = 4,
    RegularUser = 5
}

export enum AppError {
    General = "General",
    ConnectionError = "ConnectionError",
    QueryError = "QueryError",
    NoData = "NoData",
    NonNumericInput = "NonNumeric",
    InputParameterNotSupplied = "NoParameter",
    DeletionConflict = "DeletionConflict"
}

export enum ColumnType {
    Integer = 1,
    Varchar,
    Boolean,
    Date
}

export enum TableNames {
    User = "[user]",
    Store = "[store]",
    Status = "[status]",
    Role = "[role]",
    Relations = "[relations_store_employee_supervisor]",
    Product = "[product]",
    ProductLocation = "[location_products_in_stories]",
    Location = "[location]",
    Position = "[employee_position]"
}

export enum ColumnUpdateType {
    None = 1,
    Always,
    CurrentDate,
    CurrentUser
}