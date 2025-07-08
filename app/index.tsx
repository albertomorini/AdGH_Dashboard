import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { createContext, useEffect, useState } from "react";
import { View } from "react-native";

import Login from "./myComponents/Login"
import Dashboard from "./myComponents/Dashboard"

export const mycontext = createContext();

const index = () => {

    const [Username, setUsername] = useState(null)
    const [Psw, setPsw] = useState(null)
    const [AdgBaseURI, setAdgBaseURI] = useState(null);

    useEffect(() => {
        console.log("JEYU");

    }, [Username])

    return (
        <View>
            <ThemedView>
                <mycontext.Provider value={{
                    "Username": { Username, setUsername },
                    "Psw": { Psw, setPsw },
                    "AdgBaseURI": { AdgBaseURI, setAdgBaseURI },
                    // "showMessage": (msg, esito) => showMessage(msg, esito),
                }}>
                    {
                        (Username == null) ?
                            <Login />
                            :
                            <Dashboard />
                    }
                </mycontext.Provider>
            </ThemedView>

        </View>
    )
}

export default index;