import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';


function Burger() {
    const navigation = useNavigation()


    return (
        <TouchableOpacity
            onPress={()=> { navigation.navigate('Menu') }}
            style={styles.container}
        >
            <Feather name="menu" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default Burger;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 50,
        width: 50,
        borderRadius: 50,
        top: 65,
        left: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9000,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.40,
        shadowRadius: 3.84,

        elevation: 7,
    },
})
