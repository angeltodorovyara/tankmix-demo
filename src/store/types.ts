import { MixResult, Product, User } from "../interfaces";

export interface RootState {
    auth: UserState;
    products: ProductsState;
    result: ResultState;
    geolocation: Geolocation;
};

export interface UserState {
    data: User | null;
    results: MixResult[];
    isDone: boolean;
    error: string | null;
};

export interface ProductsState {
    data: Product[] | null;
    isAddingDone: boolean;
    error: string | null;
};

export interface ResultState {
    data: Product[];
    loading: boolean;
    done: boolean;
    error: string | null;
};

export interface Geolocation {
    location: string | null;
    weather: string | null;
}