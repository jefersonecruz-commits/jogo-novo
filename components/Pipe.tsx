import { DURATION } from "@/constants/animation";
import { CAP_HEIGHT, GAP_SIZE, PIPE_WIDHT } from "@/constants/pipe";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


interface props {
    gapY: number;
    onEnd: () => void;
}

export default function Pipe({ gapY, onEnd }: props) {
    const { height,width } = Dimensions.get("window");
    const topHeight = gapY - GAP_SIZE / 2;
    const bottomY = gapY + GAP_SIZE / 2;
    const bottoHeight = height - bottomY;

    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -translateX.value }]
    }));

    useEffect(() => {
        translateX.value = withTiming(
            width,
            {
                duration: DURATION,
                easing: Easing.linear
            },
            () => runOnJS(onEnd)(),
        )
    }, [translateX]);

    return <>
        <Animated.View style={[styles.pipe, { left: width, top: 0, height: topHeight }, animatedStyle]} />;
        <Animated.View style={[styles.cap, { left: width-5, top: topHeight - CAP_HEIGHT, }, animatedStyle]} />

        <Animated.View style={[styles.pipe, { left: width, top: bottomY, height: bottoHeight }, animatedStyle]} />;
        <Animated.View style={[styles.cap, { left: width-5, top: bottomY }, animatedStyle]} />
    </>
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDHT,
        backgroundColor: "#2ecc71",
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: "#1b5e20",
    },
    cap: {
        position: "absolute",
        width: PIPE_WIDHT + 10,
        height: CAP_HEIGHT,
        backgroundColor: "#2ecc71",
        borderWidth: 4,
        borderColor: "#1b5e20",
    }
});