import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { CheckBox, TextInput, View } from "react-native";


import { useContext } from "react";
import { mycontext } from "../index";

// import gss from "../globalStyles/global.css";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { default as GlobalStyle } from "../globalStyles/global.jsx";

import { doRequest } from "../../utility";


const Login = () => {
    const [ShowPassword, setShowPassword] = useState(false);
    //
    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);
    const [AdgBaseURI, setAdgBaseURI] = useState(null);
    const [AdgPORT, setAdgPORT] = useState(null);
    const [RememberMe, setRememberMe] = useState(false)
    ////
    const ctx = useContext(mycontext)


    async function doLogin(usernameP = Username, passwordP = Password, adgURIP = AdgBaseURI, adgPORTP = AdgPORT, remember = RememberMe) {

        // if (usernameP?.length > 0 && passwordP?.length > 0 && adgURIP?.length > 0) {
        console.log("eeeehh");
        
        doRequest(adgURIP, adgPORTP,"control/dns_info","GET",{
            "Authorization":'Basic '+btoa(usernameP+":"+passwordP)
        },null)

        console.log(RememberMe);
        // ctx.Username?.setUsername(Username);
        // ctx.Password?.setPsw(Password);
        // ctx.AdgBaseURI?.setAdgBaseURI(AdgBaseURI);

        //then
        if (RememberMe) {
            let config = JSON.stringify({
                "Username": usernameP,
                "Password": passwordP,
                "AdgBaseURI": adgURIP,
                "AdgPort": adgPORTP,
                "Remember": remember
            })
            await AsyncStorage.setItem('config', config);
        }

        // }
    }

    async function checkStorage() {
        const conf = await AsyncStorage.getItem('config');
        console.log(conf);

        if (conf != null) {
            //dologin 
            
            JSON.parse(conf)

        }

    }

    useEffect(() => {
        checkStorage()
    }, [])

    return (
        <ThemedView style={{ width: 250, height: 300, margin: "auto" }}>

            <View>
                <ThemedText> <h2> Username</h2> </ThemedText>
                <TextInput placeholder="Username" onChangeText={(txt) => {
                    setUsername(txt);
                }} />
            </View>

            <View >
                <ThemedText> <h2> Password</h2> </ThemedText>
                <ThemedView style={GlobalStyle.inlineContainer}>
                    <TextInput placeholder="Password" secureTextEntry={!ShowPassword} textContentType="password" onChangeText={(txt) => { setPassword(txt) }} />
                    <MaterialCommunityIcons
                        name={ShowPassword ? 'eye-off' : 'eye'}
                        size={24} color="#aaa" onPress={() => {
                            setShowPassword(!ShowPassword)
                        }}
                    />
                </ThemedView>
            </View>
            <br />
            <br />
            <br />
            <ThemedView >
                <ThemedText><b>AdGuard URL</b></ThemedText>
                <ThemedView style={GlobalStyle.inlineContainer}>

                    <TextInput placeholder="IP or machine name" onChangeText={(txt) => {
                        setAdgBaseURI(txt)
                    }} />

                    <TextInput placeholder="Port" textContentType="number"
                        style={{ width: "30%" }}
                        onChangeText={(txt) => {
                            setAdgPORT(txt)
                        }} />
                </ThemedView>

            </ThemedView>
            <br />
            <br />
            <br />

            <ThemedView style={GlobalStyle.inlineContainer}>
                <CheckBox
                    style={GlobalStyle.checkbox}
                    value={RememberMe}
                    onValueChange={() => {
                        setRememberMe(!RememberMe)
                        console.log(!RememberMe)

                    }}
                />
                <ThemedText style={GlobalStyle.label}>
                    Remember me
                </ThemedText>
            </ThemedView>

            <Button onPressOut={() => {

                doLogin(Username,
                    Password,
                    AdgBaseURI,
                    AdgPORT,
                    RememberMe)
            }}> Login</Button>
        </ThemedView >
    )
}

export default Login;
