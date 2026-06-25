import MovingBackground from "@/components/MovingBackground";
import {
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <ImageBackground
            source={require("@/assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <SafeAreaView style={styles.screen}>
                <Image
                    source={require("@/assets/images/bird.gif")}
                    style={styles.bird}
                />
            </SafeAreaView>
            <MovingBackground />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
    },
    screen: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    bird: {
        width: 70,
        height: 48,
        position: "absolute",
        top: "50%",
        left: 100,
    },
});