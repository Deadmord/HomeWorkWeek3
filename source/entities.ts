export interface store {
    id: number;
    store_title: string;
    store_address: string;
    manager_id: number;
}
export interface product {
    id: number;
    product_title: string;
    product_categories: string;
}

export interface systemError {
    code: number;
    message: string;
}