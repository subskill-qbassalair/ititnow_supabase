import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { AntDesign } from '@expo/vector-icons';


function Back({navigation}) {
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.container}>
            <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default Back;

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        width: 50,
        height: 50,
        marginTop: 75,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
