import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "@react-navigation/elements";

import { mycontext } from "../index";
import { useContext } from "react";

const Login = () => {
    const [ShowPassword, setShowPassword] = useState(false);
    //
    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);
    const [AdgBaseURI, setAdgBaseURI] = useState(null);
    ////
    const ctx = useContext(mycontext)

    return (
        <>
            <ThemedView style={{ width: 250, height: 300, margin: "auto" }}>
                <ThemedText> <h2> Username</h2> </ThemedText>
                <TextInput placeholder="Username" onChangeText={(txt) => {
                    setUsername(txt);
                }} />
                <View>
                    <ThemedText> <h2> Password</h2> </ThemedText>
                    <TextInput placeholder="Password" secureTextEntry={!ShowPassword} textContentType="password" onChange={(txt) => { setPassword(txt) }} />
                    <MaterialCommunityIcons
                        name={ShowPassword ? 'eye-off' : 'eye'}
                        size={24} color="#aaa" onPress={() => {
                            setShowPassword(!ShowPassword)
                        }}
                    />
                </View>
                <View>
                    <ThemedText><b>AdGuard URL</b></ThemedText>
                    <TextInput placeholder="IP:PORT" onChange={(txt)=>{
                        setAdgBaseURI(txt)
                    } } />
                </View>
                <Button onPressOut={() => {
                    // TODO: do login first ~ fetching the adguard conf
                    ctx.Username?.setUsername(Username);
                    ctx.Password?.setPsw(Password);
                    ctx.AdgBaseURI?.setAdgBaseURI(AdgBaseURI);
                    console.log("OK");
                    

                }}> Login</Button>
            </ThemedView>
        </>
    )
}

export default Login;