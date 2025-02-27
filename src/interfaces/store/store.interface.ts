export interface IUseStore {
    isStoreReady: boolean;
    isLogged: boolean;
    profile: string;

    setIsStoreReady: (isStoreReady: boolean) => void;
    setIsLogged: (isLogged: boolean) => void;
}