import React, {useState} from 'react';
import {Button, Pressable, Text, View} from "react-native";
import {StyleSheet} from "react-native";


function Toggle({ isEnabled, setIsEnabled }) {

    const toggleSwitch = () => setIsEnabled((previousState: any) => !previousState);


    return (

        <View style={styles.container} >
            <Pressable
                onPress={toggleSwitch}
                style={[styles.toggle, {opacity: isEnabled ? 1 : .45, shadowColor: '#000',shadowOffset: {width: 2, height: 2}, shadowOpacity: isEnabled ? 0.1 : 0, shadowRadius: 1 }  ]} >
                <Text style={styles.btn}>Connexion</Text>
            </Pressable>
            <Pressable
                onPress={toggleSwitch}
                style={[styles.toggle, {opacity: isEnabled ? .45 : 1, shadowColor: '#000',shadowOffset: {width: 2, height: 2}, shadowOpacity: isEnabled ? 0 : 0.1, shadowRadius: 1}]} >
                <Text style={[styles.btn, {opacity: .45}]}>Inscription</Text>
            </Pressable>
        </View>
    );
}

export default Toggle;

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: '#ECEDEF',
            borderRadius: 10,
            height: 58,
            flexDirection: 'row',
            alignItems: "center",
            marginVertical: 22,
        },
        btn: {
            fontSize: 18,
            color: 'black',
            textAlign: 'center',
        },
        toggle: {
            borderRadius: 10,
            marginLeft: 4,
            width: "48.3%",
            height: 50,
            backgroundColor: "white",
            justifyContent: 'center'
        }
    }
)
