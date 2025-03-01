//Hooks

import { FormEvent, useState } from "react"
import { useMutation } from "@tanstack/react-query";
import { useApi } from "../contexts";

export const SignInScreen = () => {

    //States
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //Api
    const handleLogin = useApi((state) => state.handleLogin);

    //Functions 
    const handleForm = async (e: FormEvent) => {
        e.preventDefault();
        await handleLogin({ username, password })
    }

    //React Query
    const { mutate, isPending, } = useMutation({
        mutationFn: handleForm,
    })

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gray-900">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-96 lg:w-1/3 xl:w-1/4">

                {/* Titulo */}
                <h2 className="text-center text-3xl mb-6 font-semibold">Iniciar sesión</h2>

                {/* Cuerpo */}
                <form onSubmit={mutate}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            required
                            id="username"
                            type={'text'}
                            value={username}
                            placeholder="Ingrese su nombre de usuario."
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            required
                            id="password"
                            type="password"
                            value={password}
                            placeholder="Ingrese su contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        {
                            isPending
                                ?
                                'Cargando...'
                                :
                                'Iniciar sesión'
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}