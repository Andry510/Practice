//Crypto
import { AES, enc } from "crypto-ts";

//Config
import { EnvValue } from "../config";

export const encryptData = (data: string): string => {
    return AES.encrypt(data, EnvValue.VITE_KEY_CRYPTO).toString();
}

export const decryptData = (data: string): string => {
    const bytes = AES.decrypt(data, EnvValue.VITE_KEY_CRYPTO);
    return bytes.toString(enc.Utf8);
}

