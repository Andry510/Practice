//Hooks
import { useApi } from "../contexts";
import { useNavigate } from "react-router";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

//UI
import { IoArrowBackOutline } from "react-icons/io5";
import { Button, Card, CardActions, CardContent, CardHeader, Input, TextareaAutosize } from "@mui/material";

export const CreateProductScreen = () => {
    //Navigate
    const navigate = useNavigate()

    //States
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    //Functions Api
    const handleCreateProduct = useApi((state) => state.handleCreateProduct);

    //React Query
    const { mutate, isPending } = useMutation(
        {
            mutationFn: async () => {
                await handleCreateProduct(
                    {
                        title,
                        description,
                    }
                )
            }
        }
    )

    //Functions
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await mutate();
    }

    return (
        <div className="h-screen w-full bg-gray-900 flex justify-center items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
                <Button
                    disabled={isPending}
                    onClick={() => navigate(-1)}
                    startIcon={<IoArrowBackOutline />}
                    className="mb-6 flex items-center gap-2"
                >
                    Regresar
                </Button>

                <Card className="w-full">
                    <CardHeader
                        title={'Agrega un producto'}
                    />
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">

                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-gray-700">Title</label>
                                <Input
                                    required
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter product title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-gray-700">Description</label>
                                <TextareaAutosize
                                    required
                                    maxRows={3}
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
                                disabled={isPending}
                                onClick={() => navigate(-1)}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="flex items-center gap-2"
                            >
                                Agregar Producto
                            </Button>
                        </CardActions>
                    </form>
                </Card>
            </div>
        </div>
    )
}
