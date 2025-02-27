import { useStore } from "../store"

export const HomeScreen = () => {
    const isLogged = useStore((state) => state.profile);
    return (
        <div>
            {
                isLogged
            }
        </div>
    )
}