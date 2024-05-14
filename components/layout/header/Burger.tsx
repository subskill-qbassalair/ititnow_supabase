import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";


function Burger() {
    const navigation = useNavigation()


    return (
        <TouchableOpacity
            onPress={()=> { navigation.navigate('Menu') }}
            style={styles.container}
        >
            <View style={[styles.burger, { marginBottom: 3 }]} />
            <View style={styles.burger} />
            <View style={[styles.burger, { marginTop: 3, width: 20 }]} />
        </TouchableOpacity>
    );
}

export default Burger;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 44,
        width: 44,
        borderRadius: 50,
        top: 65,
        left: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
    burger: {
        backgroundColor: 'black',
        height: 4,
        width: 25,
        borderRadius: 2,
        left: 9,
    }
})
