//Hooks
import { toast } from "sonner";
import { create } from "zustand";
import { AxiosResponse } from "axios";

//Store 
import { useStore } from "../store";

//Api
import { api } from "../api";

//Routers
import { apiRouters } from "../api/routes";

//Messages
import { ErrorMessage, SuccessMessage } from "../messages";

//Interfaces
import { IApiContext } from "../interfaces/contexts";
import { IProduct } from "../interfaces/products";
import {
    ILoginResponse,
    IProductsResponse,
    IUpdateProductResponse,
    ICreateProductResponse,
} from "../interfaces/api";

export const useApi = create<IApiContext>(
    (set, get) => (
        {
            products: [],

            //Functions
            handleLogin: async (data) => {
                try {
                    const loginData = {
                        ...data,
                        expiresInMins: 1,
                        credential: 'include',
                    };

                    const setLogin = useStore.getState().setLogin;

                    const response: AxiosResponse<ILoginResponse> = await api.post(apiRouters.authentication, loginData);

                    const { accessToken, refreshToken, ...profile } = response.data;

                    setLogin({
                        accessToken,
                        refreshToken,
                        profile,
                    })


                    toast.success(SuccessMessage.login.replace('$username', profile.firstName));

                } catch (error) {
                    toast.error(ErrorMessage.login)
                }
            },
            handleGetProduct: async (id) => {
                try {
                    const products = get().products;
                    return products.find((products) => products.id === id);
                } catch (error) {
                    toast.error(ErrorMessage.notFoundProduct)
                }
            },

            handleGetProducts: async () => {
                try {
                    const response: AxiosResponse<IProductsResponse> = await api.get(apiRouters.products);
                    set({ products: response.data.products })
                } catch (error) {
                    toast.error(ErrorMessage.products)
                }
            },

            handleCreateProduct: async (data) => {
                try {
                    const response: AxiosResponse<ICreateProductResponse> = await api.post(
                        apiRouters.create,
                        data,
                    )

                    const product: IProduct = {
                        ...response.data,
                        images: []
                    }

                    set({ products: [...get().products, product] });

                    toast.success(SuccessMessage.create);
                } catch (error) {
                    toast.error(ErrorMessage.create)
                }
            },
            handleUpdateProduct: async (data) => {
                try {
                    const response: AxiosResponse<IUpdateProductResponse> = await api.put(
                        apiRouters.update.replace('$productId', data.id.toString()),
                        {
                            title: data.title,
                            description: data.description,
                        },
                    )

                    const updatedProducts = get().products.map(
                        (product) => {
                            if (product.id === response.data.id)
                                return { ...product, ...response.data }

                            return product
                        }
                    )

                    set({ products: updatedProducts })

                    toast.success(SuccessMessage.updateProduct);
                } catch (error) {
                    toast.error(ErrorMessage.updateProduct)
                }
            },
        }
    )
)