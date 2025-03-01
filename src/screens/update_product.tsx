//Hooks
import { useApi } from "../contexts";
import { FormEvent, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";

//UI
import { Button, Card, CardActions, CardContent, CardHeader, Input, TextareaAutosize } from "@mui/material";

//Interfaces
import { IProduct } from "../interfaces/products";


export const UpdateProductScreen = () => {
    //Params
    const { productId } = useParams();

    //State 
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    //Navigate
    const navigate = useNavigate();

    //Functions Api
    const handleGetProduct = useApi((state) => state.handleGetProduct);
    const handleUpdateProduct = useApi((state) => state.handleUpdateProduct);

    //React Query
    const reactQuery = useQuery(
        {
            queryKey: ["product", productId],
            queryFn: async (): Promise<IProduct | undefined> => {
                try {
                    if (!productId || typeof productId === 'undefined')
                        throw new Error();

                    const response = await handleGetProduct(parseInt(productId));

                    if (!response)
                        throw new Error();

                    return response;
                } catch (_error) {
                    navigate('/');
                    return;
                }
            },
        }
    )

    const reactMutation = useMutation({
        mutationFn: async () => await handleUpdateProduct(
            {
                id,
                title,
                description
            }
        )
    })


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await reactMutation.mutate();        
        navigate(-1);
    }


    useEffect(() => {
        if (reactQuery.data) {
            setId(reactQuery.data.id);
            setTitle(reactQuery.data.title);
            setDescription(reactQuery.data.description);
        }
    }, [reactQuery.data])

    if (reactQuery.isPending)
        return (
            <div className="flex justify-center items-center h-screen w-full bg-gray-900 text-white">
                <span className="text-xl">Cargando...</span>
            </div>
        )

    return (
        <div className="h-screen w-full bg-gray-900 flex justify-center items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <Button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2"
                >
                    Back to Products
                </Button>

                <Card className="w-full">
                    <CardHeader
                        title={'Actualización del Producto'}
                        subheader={''}
                    />
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="id" className="block text-gray-700">Product ID</label>
                                <Input id="id" value={id} disabled className="bg-muted" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-gray-700">Title</label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="Enter product title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-gray-700">Description</label>
                                <TextareaAutosize
                                    maxRows={5}
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter product description"
                                    className="w-full p-2 border border-gray-300 rounded-md resize-none"
                                />
                            </div>
                        </CardContent>

                        <CardActions className="flex justify-between">
                            <Button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" className="flex items-center gap-2">
                                Actualizar producto
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </div>
        </div>
    )
}