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


const Login = (props) => {
    const [ShowPassword, setShowPassword] = useState(false);
    //
    const [Username, setUsername] = useState(null);
    const [Password, setPassword] = useState(null);
    const [AdgBaseURI, setAdgBaseURI] = useState(null);
    const [RememberMe, setRememberMe] = useState(false)
    ////
    const ctx = useContext(mycontext)


    async function doLogin(usernameP = Username, passwordP = Password, adgURIP = AdgBaseURI, remember = RememberMe) {

        if (usernameP?.length > 0 && passwordP?.length > 0 && adgURIP?.length > 0) {

            let outcome = await doRequest({
                "Authorization": 'Basic ' + btoa(usernameP + ":" + passwordP),
                "AdgBaseURI": adgURIP,
                "Remember": remember,
                "METHOD": "GET",
                "PATH": "/control/querylog"
            })
            if (outcome.status == 200) {
                props?.setConfig({
                    Username: usernameP,
                    Auth: "Basic " + btoa(usernameP + ":" + passwordP),
                    ADGURL: AdgBaseURI
                })
                if (RememberMe) {
                    let config = JSON.stringify({
                        "Username": usernameP,
                        "Password": passwordP,
                        "AdgBaseURI": adgURIP,
                        "Remember": remember
                    })
                    await AsyncStorage.setItem('config', config);
                }

            }
        }

    }

    async function checkStorage() {
        const conf = await AsyncStorage.getItem('config');
        if (conf != null) {
            let x = JSON.parse(conf)
            doLogin(x.Username, x.Password, x.AdgBaseURI, x.Remember)
        }
    }

    useEffect(() => {
        checkStorage()
    }, [])

    return (

        <ThemedView style={{ width: "50%", height: 300, margin: "auto", marginTop: "10px", }}>
            <h2 style={{ textAlign: "center" }}>AdGuard Home ~ Remote </h2>
            <br />
            <br />
            <br />
            <View>
                <ThemedText style={GlobalStyle.textLabel}>Username </ThemedText>
                <ThemedView style={GlobalStyle.inlineContainer}>
                    <TextInput placeholder="Username"
                        style={GlobalStyle.textInput}
                        onChangeText={(txt) => {
                            setUsername(txt);
                        }} />
                </ThemedView>
            </View>

            <View >
                <ThemedText style={GlobalStyle.textLabel}>Password</ThemedText>
                <ThemedView style={GlobalStyle.inlineContainer}>
                    <TextInput placeholder="Password" secureTextEntry={!ShowPassword} textContentType="password" onChangeText={(txt) => { setPassword(txt) }}
                        style={GlobalStyle.textInput}
                    />
                    <MaterialCommunityIcons
                        style={GlobalStyle.peepPassword}
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
                <ThemedText style={GlobalStyle.textLabel}>AdGuard URL</ThemedText>
                <ThemedView style={GlobalStyle.inlineContainer}>

                    <TextInput placeholder="http://name:port" onChangeText={(txt) => {
                        setAdgBaseURI(txt)
                    }}
                        style={GlobalStyle.textInput}
                    />

                    {/* <TextInput placeholder="Port" textContentType="number"
                        style={{ width: "30%" }}
                        onChangeText={(txt) => {
                            setAdgPORT(txt)
                        }} /> */}
                </ThemedView>

            </ThemedView>
            <br />
            <br />
            <br />

            <ThemedView style={GlobalStyle.inlineContainer}>
                <ThemedText style={GlobalStyle.textLabel}>
                    Remember me
                </ThemedText>
                <CheckBox
                    style={GlobalStyle.checkbox}
                    value={RememberMe}
                    onValueChange={() => {
                        setRememberMe(!RememberMe)
                        console.log(!RememberMe)

                    }}
                />

            </ThemedView>

            <Button onPressOut={() => {
                doLogin(Username,
                    Password,
                    AdgBaseURI,
                    RememberMe)
            }}> Login</Button>
        </ThemedView >
    )
}

export default Login;
