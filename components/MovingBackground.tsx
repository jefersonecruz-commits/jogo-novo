import { Image, StyleSheet, View } from "react-native";

export default function MovingBackground() {
  return (
    <View style={styles.screen}>
      <View style={styles.container}>
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
      </View>
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