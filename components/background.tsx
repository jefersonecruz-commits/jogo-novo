import { useAudioPlayer } from "expo-audio";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

interface Props {
  source: string;
  loop?: boolean;
}

export default function BackgroundSound({ source, loop = true }: Props) {
  const audio = useAudioPlayer(source);

  useFocusEffect(
    useCallback(() => {
      try {
        audio.seekTo(0);
        audio.loop = loop;
        audio.play();
      } catch (error) {}

      return () => {
        try {
          audio.pause();
        } catch (error) {}
      };
    }, []),
  );

  return <></>;
}