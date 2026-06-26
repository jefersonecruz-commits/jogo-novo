import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { StyleProp, Text, TextStyle } from "react-native";

interface Props extends Omit<LinearGradientProps, "style"> {
  children: string;
  style?: StyleProp<TextStyle>;
}
export default function GradientText({ children, style, ...props }: Props) {
  return (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <LinearGradient {...props}>
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  )
}
