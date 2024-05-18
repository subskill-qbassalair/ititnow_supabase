import React from 'react';
import {Pressable, Text, View} from "react-native";
import {StyleSheet} from "react-native";


function Cta({text, onPress}) {
    return (
        <Pressable onPress={onPress} >
            <View style={styles.cta} >
                <Text style={{color: 'white'}} >{text}</Text>
            </View>
        </Pressable>
    );
}

export default Cta;

const styles = StyleSheet.create({
    cta: {
        backgroundColor: '#6FB2AE',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22,
        height: 60,
        width: '80%',
        alignSelf: 'center',
    }

})
