import { DURATION } from "@/constants/animation";
import { BIRD } from "@/constants/bird";
import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDHT } from "@/constants/pipe";
import { useGame } from "@/hooks/game";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface Props {
    gapY: number;
    onEnd: () => void;
}

export default function Pipe({ gapY, onEnd }: Props) {
    const { birdY, gameOver } = useGame();
    const { height, width } = Dimensions.get("window");
    const topHeight = gapY - GAP_SIZE / 2;
    const bottomY = gapY + GAP_SIZE / 2;
    const bottomHeight = height - bottomY;

    const translateX = useSharedValue(0);
    const disabled = useSharedValue(false);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -translateX.value }],
    }));

    useEffect(() => {
        translateX.value = withTiming(
            width,
            {
                duration: DURATION,
                easing: Easing.linear,
            },
            () => {
                if (translateX.value === width) {
                    runOnJS(onEnd)();
                }
            },
        );
    }, [translateX]);

    useAnimatedReaction(
        () => ({ birdY: birdY.value, translateX: translateX.value }),
        ({ birdY, translateX }) => {
            "worklet";

            if (disabled.value) return;

            const hitX =
                BIRD.x + BIRD.height * BIRD.aspectRatio - BIRD.hitbox.right >
                width - translateX &&
                BIRD.x + BIRD.hitbox.left < width - translateX + PIPE_WIDHT;

            const hitTop = birdY + BIRD.hitbox.top < gapY - GAP_SIZE / 2;
            const hitBottom =
                birdY + BIRD.height - BIRD.hitbox.bottom > gapY + GAP_SIZE / 2;

            if (hitX && (hitTop || hitBottom)) {
                disabled.value = true;
                runOnJS(gameOver)();
            }
        },
    );

    return (
        <>
            <Animated.View
                style={[
                    styles.pipe,
                    { left: width, top: 0, height: topHeight },
                    animatedStyle,
                ]}
            >
                <Image
                    source={require("@/assets/images/crip.png")}
                    style={[styles.image, { transform: [{ rotate: "180deg" }] }]}
                    resizeMode="stretch"
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.cap,
                    { left: width - 5, top: topHeight - CAP_HEIGHT },
                    animatedStyle,
                ]}
            >
                <Image
                    source={require("@/assets/images/cap.png")}
                    style={[styles.image, { transform: [{ rotate: "180deg" }] }]}
                    resizeMode="stretch"
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.pipe,
                    { left: width, top: bottomY, height: bottomHeight },
                    animatedStyle,
                ]}
            >
                <Image
                    source={require("@/assets/images/crip.png")}
                    style={styles.image}
                    resizeMode="stretch"
                />
            </Animated.View>

            <Animated.View
                style={[styles.cap, { left: width - 5, top: bottomY }, animatedStyle]}
            >
                <Image
                    source={require("@/assets/images/cap.png")}
                    style={styles.image}
                    resizeMode="stretch"
                />
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDHT,
    },
    cap: {
        position: "absolute",
        width: PIPE_WIDHT + 10,
        height: CAP_HEIGHT,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});