import React, { useState } from 'react'
import {Alert, StyleSheet, View, AppState, SafeAreaView, ScrollView, Text} from 'react-native'
import { supabase } from '../../lib/supabase'
import Login from "./Login";
import Register from "./Register";
import Toggle from "./Toggle";
import {globalStyles} from "../../style";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [isEnabled, setIsEnabled] = useState<boolean>(true);



    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <SafeAreaView>
            <View style={{top: 120, height:"23%", position:'relative', marginBottom: 33, marginHorizontal:20}} >
                <Text style={[globalStyles.title, styles.title]} >Créer votre compte ou connecter vous</Text>
                <Text style={[globalStyles.smallText, styles.subTitle]}>Connecter vous afin de profiter au mieux des fonctionnalités de Ititnow</Text>
            </View>
            <View style={styles.container} >
                <ScrollView >
                    <Toggle isEnabled={isEnabled} setIsEnabled={setIsEnabled}  />
                    {isEnabled ? <Login/> : <Register/>}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: "100%",
        width: "100%",
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        paddingHorizontal: 20,
    },
    title: {
        color: 'white',
        fontFamily: 'PoppinsBold',
    },
    subTitle: {
        color: '#d5d5d5',
        fontFamily: 'PoppinsRegular',
    },
})
