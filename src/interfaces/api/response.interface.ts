//Interfaces
import { IProduct } from "../products";
import { IProfile } from "../profile";

export interface IAuthenticationResponse {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginResponse extends
    IProfile,
    IAuthenticationResponse { }

export interface IProductsResponse {
    products: IProduct[]
}

export interface IUpdateProductResponse extends
    Omit<IProduct, 'images'> { }