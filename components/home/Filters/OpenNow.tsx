import React, {useState} from 'react';
import {Pressable, Text, View} from "react-native";
import {useDispatch} from "react-redux";
import {setOpenNow} from "../../../redux/slices/filters";
import {globalStyles} from "../../../style";

function OpenNow() {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const handlePress = () => {
        setActive(!active)
        active ? dispatch(setOpenNow(false)) : dispatch(setOpenNow(true))
    }
    return (
        <View style={[{alignSelf:'flex-start'}, active ? globalStyles.shadow : null]}>
            <Pressable
                onPress={()=> {handlePress()}}
            >
                <Text style={{padding:8, borderRadius:8, overflow:'hidden', backgroundColor:'white', borderWidth:3, borderColor:active ? 'black' : 'white'}} >Oui</Text>
            </Pressable>
        </View>
    );
}

export default OpenNow;
