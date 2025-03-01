//Hooks
import { useEffect } from "react";
import { useApi } from "../contexts";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

//UI
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { ProductCardComponent } from "../components/cards";

export const HomeScreen = () => {

    //Navigates
    const navigate = useNavigate();

    //Value Api
    const products = useApi((state) => state.products);

    //Functions Api    
    const handleGetProducts = useApi((state) => state.handleGetProducts);

    //React Query
    const { mutate, isPending } = useMutation({
        mutationFn: async () => await handleGetProducts(),
    })

    //Effects
    useEffect(() => {
        if (products.length === 0)
            mutate();
    }, [products, mutate])

    //IsLoading
    if (isPending)
        return (
            <div className="flex justify-center items-center h-screen w-full bg-gray-900 text-white">
                <span className="text-xl">Cargando...</span>
            </div>
        )

    return (
        <div className="h-full w-full bg-gray-900 p-4">
            <div className="flex justify-between items-center mb-8 flex-wrap">
                <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">
                    Productos
                </h1>
                <Button
                    variant="contained"
                    onClick={() => console.log('hello word')}
                    startIcon={<FaPlus className="h-4 w-4" />}
                    className="w-full sm:w-auto"
                >
                    Nuevo Producto
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    products.map((product) => (
                        <ProductCardComponent
                            key={product.id}
                            product={product}
                            handleOnClick={() => navigate(`products/${product.id}`)}
                        />
                    ))
                }
            </div>
        </div>

    );
};
