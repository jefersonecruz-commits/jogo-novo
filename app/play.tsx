import MovingBackground from "@/components/MovingBackground";
import Pipe from "@/components/Pipe";
import { DURATION } from "@/constants/animation";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Play() {
  const [obstacles, setObstacles] = useState([] as string[]);
  const jumpSound = useAudioPlayer(require("@/assets/audios/pulo.mp3"));
  const pointSound = useAudioPlayer(require("@/assets/audios/point.mp3"))
  
  function handleJump() {
    jumpSound.seekTo(0);
    jumpSound.play();
  }

  function spawObstacle() {
    setObstacles((oldValue) => [...oldValue, Date.now().toString()]);
  }

  function removeObstacle(id: string) {
    setObstacles((oldValue) => oldValue.filter((item) => item !== id))
  }
  useEffect(() => {
    const interval = setInterval(() => spawObstacle(), DURATION / 4);

    return () => clearInterval(interval);
  }, [])

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <Pressable onPress={handleJump} style={styles.background}>
        <SafeAreaView style={styles.screen}>
          <Image
            source={require("@/assets/images/bird.png")}
            style={styles.bird}
          />
          {obstacles.map((obstacle) => <Pipe
            key={obstacle}
            gapY={195}
            onEnd={() =>
            removeObstacle(obstacle)
            }
          />)}
        </SafeAreaView>
      </Pressable>

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