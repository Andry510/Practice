//Axios
import axios, { AxiosResponse } from 'axios';

//Store
import { useStore } from '../store';

//Config
import { EnvValue } from '../config';
import { apiRouters } from './routes';
import { IAuthenticationResponse } from '../interfaces/api';

export const api = axios.create(
    {
        baseURL: EnvValue.VITE_BACKEND_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

api.interceptors.request.use(
    (request) => {

        const token: string | undefined = useStore.getState().accessToken;

        if (token)
            request.headers['Authorization'] = `Bearer ${token}`

        return request;
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const errorResponse = error.config

        const { refreshToken, setCredentials, clearData } = useStore.getState();

        if (error.response.status === 401 && !errorResponse._retry) {


            errorResponse._retry = true;

            try {

                const response: AxiosResponse<IAuthenticationResponse> = await api.post(
                    apiRouters.refreshToken,
                    {
                        refreshToken,
                    }
                )

                setCredentials(response.data);

                errorResponse.headers = errorResponse.headers || {};
                errorResponse.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                return api(errorResponse);
            } catch (error) {
                clearData();
                console.log(error);

            }
        }

        return Promise.reject(error);
    }
)