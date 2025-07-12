import '@expo/metro-runtime';
import * as React from 'react';
import { View } from 'react-native';

import { createContext, useRef, useState } from "react";

import Login from "./myPages/Login"

export const mycontext = createContext();

export default function Screen() {
  const [Username, setUsername] = React.useState(null)
  const [Auth, setAuth] = useState(null)
  const [AdgBaseURI, setAdgBaseURI] = React.useState(null);

  const refLogin = useRef();


  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'
    >

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

    </View>
  );
}
