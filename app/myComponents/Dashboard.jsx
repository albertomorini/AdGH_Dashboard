
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useContext } from "react";
import { Button } from "react-native";
import GlobalStyle from "../globalStyles/global";
import { mycontext } from "../index";
const Dashboard = () => {
    const ctx = useContext(mycontext)
    return (
        <ThemedView >
            <ThemedView style={[GlobalStyle.navbar,GlobalStyle.inlineContainer]}>
                <ThemedText style={{marginBottom:"10px"}}>
                    Welcome back {ctx?.Username?.Username}!
                </ThemedText>

                <Button
                    title="logout"
                    color="red"

                    style={{
                        flex:3,
                        height: "10px"
                    }} />

            </ThemedView>

        </ThemedView>
    )
}

export default Dashboard