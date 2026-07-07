import { useAudioPlayer } from "expo-audio";
import { router } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface GameContextProps {
    birdY: SharedValue<number>;
    velocity: SharedValue<number>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    reset: () => void;
    gameOver: () => void;
}

const GameContext = createContext({} as GameContextProps);
export function GameProvider({ children }: { children: ReactNode }) {
    const { height } = Dimensions.get("window");
    const birdY = useSharedValue(height / 2);
    const velocity = useSharedValue(0);
    const [score, setScore] = useState(0);
    const hitAudio = useAudioPlayer(require("@/assets/audios/h.mp3"))



    function  reset() {
        setScore(0);
        birdY.value = height / 2;
        velocity.value = 0;
    }
    function gameOver() { 
        router.replace("/game-over");
        try {
            hitAudio.seekTo(0);
            hitAudio.play();
        }catch (error) {}
    }
    return (
        <GameContext.Provider value={{ birdY, velocity, score, setScore, reset, gameOver }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext);

export default GameContext;