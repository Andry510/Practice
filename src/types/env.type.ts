//Zod
import { z } from 'zod'; 

//Schema
import { EnvSchema } from '../schema';

export type TEnv = z.infer<typeof EnvSchema>;