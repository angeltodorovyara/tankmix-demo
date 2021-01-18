export interface User {
    email: string;
    password: string;
    isAdmin: number;
};

export interface Product {
    name: string;
    description: string;
    imageURL: string | null;
};

export interface MixResult {
    user_email: string;
    f_product: string;
    s_product: string;
    datetime: string;
};

export interface InputValues {
    error: string;
    value: string;
};