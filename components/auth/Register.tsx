import React, {useState} from 'react';
import {Alert, Modal, Text, View} from "react-native";
import Input from "./Input";
import Cta from "./Cta";
import SocialLogin from "./SocialLogin";
import {StyleSheet} from "react-native";
import {supabase} from "../../lib/supabase";


function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);


    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        // if (error) Alert.alert(error.message)
        if (!session) setModalVisible(true)
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
                value={password}
                onChangeText={setPassword}
            />
            <Cta text={'Inscription'} onPress={signUpWithEmail} />
            <SocialLogin text={ "s'inscrire" } />

            {/*Poppin confirm code*/}
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.titleModal} >{showConfirmationMessage ? 'Félicitation, votre compte à bien été validé.' : 'Vérifier votre compte'}</Text>
                            {showConfirmationMessage ? <Cta text={'Fermer'} onPress={ ()=> {setModalVisible(false)} } />  : <>
                                <Text style={styles.bodyModal} >Merci de cliquer sur le lien de confirmation reçu par mail à l'adresse suivante :</Text>
                                <Text style={styles.emailModal} >{email}</Text>
                                <Cta text={'Confirmer'} onPress={() => {setModalVisible(false)}} />
                            </> }
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default Register;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 30,
        padding: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleModal: {
        fontSize: 18,
        marginBottom: 18,
    },
    bodyModal: {
        fontSize: 14,
        marginBottom: 8,
        color: '#9A999E',
    },
    emailModal: {
        fontSize: 14,
        marginBottom: 18,
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textAlign: 'center',
    }
})
