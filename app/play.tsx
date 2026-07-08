import Bird from "@/components/Bird";
import MovingBackground from "@/components/MovingBackground";
import Pipe from "@/components/Pipe";
import { DURATION, JUMP } from "@/constants/animation";
import { BIRD } from "@/constants/bird";
import { GROUND_HEIGHT } from "@/constants/ground";
import { CAP_HEIGHT, GAP_SIZE } from "@/constants/pipe";
import { useGame } from "@/hooks/game";
import { useAudioPlayer } from "expo-audio";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Obstacle {
  id: string;
  gapY: number;
}

const { height } = Dimensions.get("window");

export default function Play() {
  const { velocity, score, setScore } = useGame();
  const [obstacles, setObstacles] = useState([] as Obstacle[]);
  const [started, setStarted] = useState(false);

  const jumpSound = useAudioPlayer(require("@/assets/audios/pulo.mp3"));
  const pointSound = useAudioPlayer(require("@/assets/audios/point.mp3"));

  function handleJump() {
    if (!started) setStarted(true);

    velocity.value = JUMP;
    try {
      jumpSound.seekTo(0);
      jumpSound.play();
    } catch (error) {}
  }

  function spawnObstacle() {
    setObstacles((oldValue) => [
      ...oldValue,
      { id: Date.now().toString(), gapY: randomGapY() },
    ]);
  }

  function removeObstacle(id: string) {
    setScore((oldValue) => ++oldValue);
    setObstacles((oldValue) => oldValue.filter((item) => item.id !== id));
    try {
      pointSound.seekTo(0);
      pointSound.play();
    } catch (error) {}
  }

  function randomGapY() {
    const min = CAP_HEIGHT + GAP_SIZE / 2;
    const max = height - CAP_HEIGHT - GROUND_HEIGHT - GAP_SIZE / 2;

    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => spawnObstacle(), DURATION / 3);

      return () => clearInterval(interval);
    }
  }, [started]);

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      <Pressable onPress={handleJump} style={styles.background}>
        <SafeAreaView style={styles.screen}>
          {started ? (
            <Bird />
          ) : (
            <Image
              source={require("@/assets/images/batman.png")}
              style={styles.bird}
            />
          )}

          {obstacles.map((obstacle) => (
            <Pipe
              key={obstacle.id}
              gapY={obstacle.gapY}
              onEnd={() => removeObstacle(obstacle.id)}
            />
          ))}

          <View style={styles.score}>
            <Text style={styles.scoreText}>{score}</Text>
            <Image
              source={require("@/assets/images/coin.gif")}
              style={styles.scoreImage}
            />
          </View>
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
    overflow: "hidden",
  },
  score: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  scoreImage: {
    height: 20,
    width: 20,
  },
  scoreText: {
    fontSize: 20,
    fontFamily: "LilitaOne",
    textShadowColor: "black",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
    color: "white",
  },
  bird: {
    width: BIRD.height * BIRD.aspectRatio,
    height: BIRD.height,
    position: "absolute",
    left: BIRD.x,
    top: height / 2,
  },
});