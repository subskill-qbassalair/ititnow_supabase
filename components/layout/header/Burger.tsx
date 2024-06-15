import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { globalStyles } from "../../../style";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../navigation/RootNavigation";


function Burger() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    return (
        <TouchableOpacity
            onPress={()=> { navigation.navigate('Menu') }}
            style={[styles.container, globalStyles.shadow]}
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
    },
})
