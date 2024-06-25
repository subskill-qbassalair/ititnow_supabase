import React, {useState} from 'react';
import {TextInput, View, Text, Image, Pressable} from "react-native";
import {StyleSheet} from "react-native";

// Pictos
import { Entypo } from '@expo/vector-icons';

function Input({placeHolder, type, iconLeft, iconRight, onChangeText, value}: {placeHolder: string, type: string, iconLeft: any, iconRight: any, onChangeText: (value: string) => void, value: string}){
    const [opacity, setOpacity] = useState(0);
    const [paddingTop, setPaddingTop] = useState(0);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const setIcon = (icon: string) => {
        switch (icon) {
            case 'email':
                return <Entypo name="email" size={20} color="black" />
            case 'password':
                return <Entypo name="lock" size={20} color="black" />
            case 'eye':
                return <Entypo name="eye" size={20} color="black" />
            case 'eye-off':
                return <Entypo name="eye-with-line" size={20} color="black" />
            case 'reset':
                return <Entypo name="cross" size={20} color="black" />
            default:
                return <Entypo name="email" size={20} color="black" />
        }
    }



    const listenInput = (value : string) => {
        onChangeText(value)
        if (value.length > 0) {
            setOpacity(1);
            setPaddingTop(16);
        } else {
            setOpacity(0);
            setPaddingTop(0);
        }
    }

    const handleIconFeature = (icon: string) => {
        if (icon === 'reset') {
            console.log('clicked')
            onChangeText('')
            setOpacity(0)
        }  else {
            setSecureTextEntry(!secureTextEntry)
        }

    }

    return (
        <View style={styles.inputContainer}>

            <Text style={[styles.inputLabel, {opacity: opacity } ]}>{placeHolder}</Text>
            <View style={ { display:'flex', alignItems:'center', borderRightColor: '#d5d5d5', borderRightWidth: 1, paddingRight:20 } } >
                {setIcon(iconLeft)}
            </View>
            <TextInput
                style={[styles.input, {paddingTop: paddingTop}]}
                onChangeText={listenInput}
                value={value}
                placeholder={placeHolder}
                placeholderTextColor="grey"
                secureTextEntry={type === "password" && secureTextEntry}
            />
            <Pressable onPress={ ()=> {handleIconFeature(iconRight[0])} } >
                <View style={ {display:'flex', alignItems:'center', paddingRight:20, opacity:opacity } } >
                    { secureTextEntry ? setIcon(iconRight[0]) : setIcon(iconRight[1] )}
                </View>
            </Pressable>
        </View>
    );

}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderRadius: 15,
        height: 58,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    inputLabel: {
        fontSize: 10,
        color: '#9A999E',
        marginBottom: 5,
        position: 'absolute',
        top: 9,
        left: '21%',
    },
    input: {
        fontSize: 18,
        fontFamily: 'PoppinsRegular',
        width: '73%',
        marginLeft: 'auto',
        color: '#000',
    }
})
