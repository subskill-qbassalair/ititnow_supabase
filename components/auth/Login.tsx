import React, {useState, } from 'react';
import {Text, View, StyleSheet, Alert} from "react-native";
import Input from "./Input";
import Cta from "./Cta";
import SocialLogin from "./SocialLogin";
import Checkbox from "expo-checkbox";
import {supabase} from "../../lib/supabase";
import {globalStyles} from "../../style";

import { Entypo } from '@expo/vector-icons';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [iconLeft, setIconLeft] = useState(null)




    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    return (
        <View>
            <Input
                placeHolder={'Email'}
                type={'email'}
                iconLeft={21} iconRight={25}
                onChangeText={setEmail}
                value={email}
            />
            <Input
                placeHolder={'Mot de passe'}
                type={'password'}
                iconLeft={22} iconRight={[23, 24]}
                onChangeText={setPassword}
                value={password}
            />
            <View style={styles.container}>
                <View style={styles.containerCheckbox}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#6FB2AE' : undefined}
                    />
                    <Text style={globalStyles.paragraph}>Se souvenir de moi</Text>
                </View>
                <View>
                    <Text style={{ color:'#6FB2AE' }} >Mot de passe oublie ?</Text>
                </View>
            </View>
            <Cta text={'Connexion'} onPress={signInWithEmail} />
            <SocialLogin text={ 'connecter' } />
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerCheckbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
        borderColor: '#6FB2AE',
    },
})
