import MovingBackground from "@/components/MovingBackground";
import Pipe from "@/components/Pipe";
import { DURATION } from "@/constants/animation";
import { CAP_HEIGHT, GAP_SIZE } from "@/constants/pipe";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface obstacle {
  id: string;
  gapY: number;
}

export default function Play() {
  const { height } = Dimensions.get("window")
  const [obstacles, setObstacles] = useState([] as obstacle[]);
  const jumpSound = useAudioPlayer(require("@/assets/audios/pulo.mp3"));
  const pointSound = useAudioPlayer(require("@/assets/audios/point.mp3"))

  function handleJump() {
    try {
      jumpSound.seekTo(0);
      jumpSound.play();
    } catch (error) { }
  }

  function spawObstacle() {
    setObstacles((oldValue) => [...oldValue, { 
      id: Date.now().toString(), 
      gapY: randomGapY() 
    }, ]);
  }

  function removeObstacle(id: string) {
    setObstacles((oldValue) => oldValue.filter((item) => item.id !== id));
    pointSound.seekTo(0);
    pointSound.play()
  }

  function randomGapY() {
    const min = CAP_HEIGHT + GAP_SIZE / 2;
    const max = height - CAP_HEIGHT - GAP_SIZE;

    return Math.random() * (max - min) + min;
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
          {obstacles.map((obstacle) =>
            <Pipe
              key={obstacle.id}
              gapY={obstacle.gapY}
              onEnd={() =>
                removeObstacle(obstacle.id)}
            />
            )}
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
    width: 53,
    height: 36,
    position: "absolute",
    top: "50%",
    left: 100,
  },
});