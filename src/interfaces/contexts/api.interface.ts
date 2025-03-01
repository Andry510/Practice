import { IProduct } from "../products";

export interface IApiContext {
    products: IProduct[];
    handleLogin: (data: { username: string, password: string }) => Promise<void>;
    handleGetProduct: (id: number) => Promise<IProduct | undefined>;
    handleGetProducts: () => Promise<void>;
    handleCreateProduct: (data: { title: string; description: string }) => Promise<void>;
    handleUpdateProduct: (data: Omit<IProduct, 'images'>) => Promise<void>;
}