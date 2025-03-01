//Zustand
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

//Config
import { EnvValue } from "../config";

//Utils
import { decryptData, encryptData } from "../utils";

//Json
import { profileDefault } from "../json";

//Interfaces
import { IUseStore } from "../interfaces/store";

const CryptoStorage: StateStorage = {
    getItem: (key: string): string | null => {
        try {
            const data = localStorage.getItem(key);
            if (!data) return null;

            return decryptData(data);

        } catch (error) {
            console.log(error);
            return null;
        }
    },
    setItem: (key: string, value: string): void => {
        try {
            const encryptValue = encryptData(value);
            localStorage.setItem(key, encryptValue);
        } catch (error) {
            console.log(error);
        }
    },
    removeItem: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }
}

export const useStore = create<IUseStore>()(persist(
    (set) => (
        {
            //Config            
            isLogged: false,
            isAppReady: false,
            isStoreReady: false,

            //Variants            
            accessToken: undefined,
            refreshToken: undefined,
            profile: profileDefault,


            setIsStoreReady: (isStoreReady: boolean) => set({ isStoreReady }),
            setIsAppReady: (isAppReady: boolean) => set({ isAppReady }),
            setIsLogged: (isLogged: boolean) => set({ isLogged }),
            setLogin: (data) => set(
                {
                    isLogged: true,
                    profile: data.profile,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }
            ),

            setCredentials: (data) => set(
                {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }
            ),

            //Deletes
            clearData: () => set(
                {
                    isLogged: false,
                    accessToken: undefined,
                    refreshToken: undefined,
                    profile: profileDefault,
                }
            ),
        }
    ),
    {
        name: EnvValue.VITE_STORE_NAME,
        storage: createJSONStorage(() => CryptoStorage),
        partialize: (state) => ({
            profile: state.profile,
            isLogged: state.isLogged,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
        }),
        onRehydrateStorage: () => (state, error) => {
            if (error) return;

            if (state) state.setIsStoreReady(true);
        }
    }
))