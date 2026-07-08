import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { Text, TextStyle } from "react-native";

interface Props extends Omit<LinearGradientProps, "style"> {
  children: string;
  style?: TextStyle;
}

export default function GradientText({ children, style, ...props }: Props) {
  return (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <LinearGradient
        {...props}
        style={style?.paddingRight ? { paddingRight: style.paddingRight } : {}}
      >
        <Text style={[style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}