import { DURATION } from "@/constants/animation";
import { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function MovingBackground() {
  const { width } = Dimensions.get("window");
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {
        duration: DURATION,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [translateX]);

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          style={styles.image}
          source={require("@/assets/images/ground.png")}
          resizeMode="stretch"
        />
        <Image
          style={styles.image}
          source={require("@/assets/images/ground.png")}
          resizeMode="stretch"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },
  container: {
    width: "100%",
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 20,
  },
});