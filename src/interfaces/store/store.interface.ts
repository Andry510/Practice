import { IProfile } from "../profile";

export interface IUseStore {
    isAppReady: boolean;
    isStoreReady: boolean;
    isLogged: boolean;
    profile: IProfile;
    accessToken: string | undefined;
    refreshToken: string | undefined;

    //Functions
    setIsStoreReady: (isStoreReady: boolean) => void;
    setIsAppReady: (isAppReady: boolean) => void;
    setIsLogged: (isLogged: boolean) => void;
    setLogin: (data:
        {
            accessToken: string,
            refreshToken: string,
            profile: IProfile
        }) => void;

    setCredentials: (data:
        {
            accessToken: string,
            refreshToken: string,
        }) => void;

    //Delete
    clearData: () => void;
}