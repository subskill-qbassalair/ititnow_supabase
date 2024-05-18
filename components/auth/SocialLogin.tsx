import React from 'react';
import {Image, Text, View} from "react-native";
import {StyleSheet} from "react-native";

// Picos
import Google from '../../assets/icons/google.png'
import Facebook from '../../assets/icons/facebook.png'

function SocialLogin({text}) {
    return (
        <>
            <View style={styles.container} >
                <View style={styles.line}/>
                <View >
                    <Text style={styles.text} >Ou {text} vous avec</Text>
                </View>
                <View style={styles.line}/>
            </View>
            <View style={styles.containerPictos}>

                <View style={ [styles.cta, {marginRight:16}] }  >
                    <Image source={Google} />
                    <Text style={ {marginLeft:10}} >Google</Text>
                </View>
                <View  style={ styles.cta  }  >
                    <Image source={Facebook} />
                    <Text style={ {marginLeft:10} } >Facebook</Text>
                </View>
            </View>
        </>
    );
}

export default SocialLogin;

const styles = StyleSheet.create({
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#d5d5d5',

    },
    text: {
        textAlign: 'center',
        fontSize: 12,
        paddingHorizontal: 27,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    containerPictos: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    cta: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 30,
        height: 40,
        width: 'auto',
        alignSelf: 'center',
        borderColor:'#d5d5d5',
        borderWidth:1,
        paddingLeft: 10,
        paddingRight: 10,
    }
})
