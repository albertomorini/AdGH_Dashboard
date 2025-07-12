
import { ThemedView } from "@/components/ThemedView";
import "../globalStyles/global.css";

import { ThemedText } from "@/components/ThemedText";
import { vars } from 'nativewind';
import { useContext } from "react";
import { Button } from "react-native";
import { mycontext } from "../index";
const userTheme = vars({
    '--color-values': '0 255 0',
    '--color-rgb': 'rbg(0 0 255)'
});



const Dashboard = () => {
    const ctx = useContext(mycontext)
    return (
        <ThemedView  >
            <ThemedView className="flex-1 items-center justify-center bg-white">
                <ThemedText style={{marginBottom:"10px"}}>
                    Welcome back {ctx?.Username?.Username}!
                </ThemedText>

                <Button
                    values={"flex-end"}
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