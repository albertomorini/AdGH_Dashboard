import { ThemedView } from "@/components/ThemedView";
import { createContext, useRef, useState } from "react";

import Dashboard from "./myComponents/Dashboard";
import Login from "./myComponents/Login";

export const mycontext = createContext();

const index = () => {

    const [Username, setUsername] = useState(null)
    const [Auth, setAuth] = useState(null)
    const [AdgBaseURI, setAdgBaseURI] = useState(null);

    const refLogin = useRef();


    return (
        <ThemedView style={{ width: "100%", height: "100%" }}>
            <mycontext.Provider value={{
                "Username": { Username, setUsername },
                "Psw": { Auth, setAuth },
                "AdgBaseURI": { AdgBaseURI, setAdgBaseURI },
                // "showMessage": (msg, esito) => showMessage(msg, esito),
            }}>
                {
                    (Username == null) ?
                        <Login ref={refLogin} setConfig={(obj) => {
                            setUsername(obj.Username)
                            setAuth(obj.Auth)
                            setAdgBaseURI(obj.ADGURL)
                        }} />
                        :
                        <Dashboard />
                }
            </mycontext.Provider>
        </ThemedView>

    )
}

export default index;