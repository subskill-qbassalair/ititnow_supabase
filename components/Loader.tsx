import React from 'react';
import {Image, StyleSheet, View} from "react-native";


function Loader() {
    return (
        <View style={[styles.container, StyleSheet.absoluteFill]} >
            <Image
                source={require('../assets/pin.png')}
                style={{width: 100, height: 100}}/>
        </View>
    );
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        zIndex: 1000,
    }
})

