//UI
import Lottie from "lottie-react"

//Lottie
import storeLottie from '../assets/lotties/store.json';

interface Props {
    onFinish: () => void;
}

export const SlashScreen = ({ onFinish }: Props) => {

    return (
        <div>
            <Lottie
                autoPlay
                loop={false}
                animationData={storeLottie}
                onComplete={onFinish}
            />
        </div>
    )
}