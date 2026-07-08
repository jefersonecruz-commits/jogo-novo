import { GRAVITY } from "@/constants/animation";
import { BIRD } from "@/constants/bird";
import { GROUND_HEIGHT } from "@/constants/ground";
import { useGame } from "@/hooks/game";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useFrameCallback,
    useSharedValue,
} from "react-native-reanimated";

export default function Bird() {
    const { height } = Dimensions.get("window");
    const { birdY, velocity, gameOver } = useGame();
    const disabled = useSharedValue(false);

    const frame = useFrameCallback((frameInfo) => {
        "worklet";

        if (disabled.value) return;

        const t = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;

        velocity.value += GRAVITY * t;
        birdY.value += velocity.value * t;

        if (
            birdY.value >
            height - BIRD.height + BIRD.hitbox.bottom - GROUND_HEIGHT
        ) {
            disabled.value = true;
            runOnJS(gameOver)();
        }

        if (birdY.value < 0) {
            birdY.value = 0;
            velocity.value = 0;
        }
    });

    useEffect(() => {
        frame.setActive(true);

        return () => frame.setActive(false);
    }, [frame]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: birdY.value },
            {
                rotate: `${(velocity.value / 1000) * 90}deg`,
            },
        ],
    }));

    return (
        <Animated.Image
            source={require("@/assets/images/batman.png")}
            style={[styles.bird, animatedStyle]}
        />
    );
}

const styles = StyleSheet.create({
    bird: {
        width: BIRD.height * BIRD.aspectRatio,
        height: BIRD.height,
        position: "absolute",
        top: 0,
        left: BIRD.x,
    },
});