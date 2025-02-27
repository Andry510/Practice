//Schema
import { EnvSchema } from "../schema";

//Messages
import { ConfigMessages } from "../messages/config";

const { data, error } = EnvSchema.safeParse(import.meta.env);

if (error) throw new Error(ConfigMessages.Environment);


export const EnvValue = data;