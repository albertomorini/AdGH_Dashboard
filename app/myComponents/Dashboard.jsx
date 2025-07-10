
import { ThemedView } from "@/components/ThemedView";
import { useContext } from "react";
import { Button } from "react-native";
import { mycontext } from "../index";
const Dashboard = () => {
    const ctx = useContext(mycontext)
    return (
        <ThemedView>
            <ThemedView>
                Welcome back {ctx?.Username?.Username}

                <Button
                    title="logout"
                    color="red"
                    style={{
                        float: "right",
                        width: "10px"
                    }} />

            </ThemedView>

        </ThemedView>
    )
}

export default Dashboard