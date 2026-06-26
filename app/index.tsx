import GradientText from "@/components/GradientText";
import MovingBackground from "@/components/MovingBackground";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
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
        <GradientText
        colors={["#FF8A00","#FFD600"]}
        style={styles.title}
        start={[0, 0]}
        end={[1, 1]}
        >
          flip bird
        </GradientText>

        <Link href="/play" asChild>
          <TouchableOpacity style={styles.button}>
            <LinearGradient
              colors={["#FF8A00", "#FFD600"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Jogar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Link>

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
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 30,
    fontFamily: "LuckiestGuy",
    textShadowColor: "#rgba(0, ,0 , 0, 0.5",
    textShadowOffset: {
      width: 3,
      height: 3,
    },
    textShadowRadius: 0,
    paddingRight: 3,

  },
  button: {
    borderRadius: 100,
    position: "absolute",
    top: "50%",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textShadowColor: "black",
    fontFamily: "LilitaOne",
  },
  bird: {
    width: 70,
    height: 48,
    position: "absolute",
    top: "35%",
    left: "35%",
    transform: [{ rotate: "-20deg" }],
  },
});