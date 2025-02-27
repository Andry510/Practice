//Zustand
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

//Config
import { EnvValue } from "../config";

//Interfaces
import { IUseStore } from "../interfaces/store";
import { decryptData, encryptData } from "../utils";


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
            isStoreReady: false,
            isLogged: false,
            profile: 'hola',

            setIsStoreReady: (isStoreReady: boolean) => set({ isStoreReady }),
            setIsLogged: (isLogged: boolean) => set({ isLogged }),
        }
    ),
    {
        name: EnvValue.VITE_STORE_NAME,
        storage: createJSONStorage(() => CryptoStorage),
        partialize: (state) => ({
            isLogged: state.isLogged,
            profile: state.profile,
        }),
        onRehydrateStorage: () => (state, error) => {
            if (error) return;

            if (state) state.setIsStoreReady(true);
        }
    }
))