//Zod
import { z } from 'zod';

export const EnvSchema = z.object({
    VITE_BACKEND_URL: z.string().nonempty(),
    VITE_STORE_NAME: z.string().nonempty(),
    VITE_KEY_CRYPTO: z.string().nonempty(),
}).passthrough();