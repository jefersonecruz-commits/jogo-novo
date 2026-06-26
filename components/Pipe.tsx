import { GAP_SIZE, PIPE_WIDHT } from "@/constants/pipe";
import { Dimensions, StyleSheet, View } from "react-native";

interface props {
    gapY: number;
}

export default function Pipe({gapY}: props) {
    const {height} = Dimensions.get("window");
    const topHeight = gapY - GAP_SIZE / 2 ;
    const bottomY = gapY + GAP_SIZE / 2;
    const bottoHeight = height - bottomY;

    return <>
        <View style={[styles.pipe, {left: 100, top: 0, height: topHeight }]} />;
        <View style={[styles.pipe, {left: 100, top: bottomY, height: bottoHeight }]} />;
    </>
}

const styles = StyleSheet.create({
    pipe: {
        position: "absolute",
        width: PIPE_WIDHT,
        backgroundColor: "#2ecc71",
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: "#1b5e20",
    }
});