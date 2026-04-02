import React, { useState } from 'react'
import { View } from 'react-native'
import Login from '../../components/AuthForms/Login';
import Registration from '../../components/AuthForms/Registration';



export function AuthForms(){
    const [type, setType] = useState<"login" | "reg">("login");
    
    const handleSwitch = (newType: "login" | "reg") => {
        setType(newType)
    }

    return(
        <View>
            {type==="login" && <Login setter={handleSwitch}/>}
            {type==="reg" && <Registration setter={handleSwitch}/>}
        </View>
    )

}

export default AuthForms