import { useContext, useState } from "react";

import { mycontext } from "../index";

import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import {
    Card,
    CardContent, CardDescription, CardFooter,
    CardHeader,
    CardTitle
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { View } from "@rn-primitives/slot";


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

    return (
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'
        >
            <Card className='w-full  max-w-lg p-6 rounded-2xl'>
                <CardHeader className='items-center'>

                    <View className='p-3' />
                    <CardTitle className='pb-1 text-left'>Welcome back!</CardTitle>
                    <CardDescription>
                       Control your AdGuard Home instance
                    </CardDescription>
                </CardHeader>
                <CardContent className='gap-4 native:gap-2'>

                    <View className="gap-2">

                        <Input
                            placeholder='Username'
                            // value={value}
                            // onChangeText={onChangeText}
                            aria-labelledby='inputLabel'
                            aria-errormessage='inputError'
                        />
                    </View>
                    <Input
                        className="gap-2"
                        placeholder='Password'
                        textContentType="password"
                        // value={value}
                        // onChangeText={onChangeText}
                        aria-labelledby='current'
                        aria-errormessage='inputError'
                        secureTextEntry
                    />


                </CardContent>
            
                <CardFooter className='flex-col gap-3 pb-0'>
                    <Button
                        variant='outline'
                        className='shadow shadow-foreground/5'
                        onPress={() => { doLogin() }}
                    >
                        <Text>Login</Text>
                    </Button>
                </CardFooter>
            </Card>
        </View>
    )
}

export default Login;