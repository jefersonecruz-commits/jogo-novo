import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(){
return(
    <SafeAreaView  style={styles.screen}>
    <Text style={styles.title}>FlipBird</Text>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        alignItems: "center",

    },
   title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "wihte",
    marginTop: 100,

   }
});

