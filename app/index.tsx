import { ThemedView } from "@/components/ThemedView";
import { createContext, useState } from "react";
import { View } from "react-native";

import Dashboard from "./myComponents/Dashboard";
import Login from "./myComponents/Login";

export const mycontext = createContext();

const index = () => {

    const [Username, setUsername] = useState(null)
    const [Psw, setPsw] = useState(null)
    const [AdgBaseURI, setAdgBaseURI] = useState(null);


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