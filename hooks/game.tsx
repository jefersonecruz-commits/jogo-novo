import { createContext, ReactNode, useContext } from "react";
import { Dimensions } from "react-native";
import { SharedValue, useSharedValue } from "react-native-reanimated";

interface GameContextProps {
    birdY: SharedValue<number>;
    velocity: SharedValue<number>;
}

const GameContext = createContext({} as GameContextProps);
export function GameProvider({ children }: { children: ReactNode }) {
    const { height } = Dimensions.get("window");
    const birdY = useSharedValue(height / 2);
    const velocity = useSharedValue(0);

    return (
        <GameContext.Provider value={{birdY, velocity }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGame = () => useContext(GameContext);

export default GameContext;