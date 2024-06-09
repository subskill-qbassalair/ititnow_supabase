import React from 'react';
import {Text, View, StyleSheet, ScrollView, ImageBackground, Pressable} from "react-native";
import Back from "../layout/header/Back";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import {convertDate} from "../../utils";

const image = {uri: "https://reactjs.org/logo-og.png"};


function SingleEvent({route, navigation}) {
    const data = route.params.event

    return (
        <ScrollView >
            <Back navigation={navigation}/>
            <ImageBackground source={image} resizeMode="cover" style={styles.image} >
                <Text style={styles.title}>{data.title}</Text>
            </ImageBackground>

            <View style={{backgroundColor: 'white', paddingHorizontal:15, borderRadius: 8, width:'92%', marginHorizontal: 'auto', marginTop: 15 }} >
                <View style={styles.containerPicto}>
                    <Pressable style={styles.itemPictio} >
                        <Ionicons name="call" size={20} color="#51796F" />
                        <Text style={{fontWeight: 'bold'}}>Appeler</Text>
                    </Pressable>
                    <Pressable style={styles.itemPictio} >
                        <Entypo name="location" size={20} color="#51796F" />
                        <Text style={{fontWeight: 'bold'}}>Itinéraire</Text>
                    </Pressable>
                    <Pressable style={styles.itemPictio} >
                        <MaterialCommunityIcons name="web" size={20} color="#51796F" />
                        <Text style={{fontWeight: 'bold'}}>Site web</Text>
                    </Pressable>
                    <Pressable style={styles.itemPictio} >
                        <FontAwesome6 name="instagram" size={20} color="#51796F" />
                        <Text style={{fontWeight: 'bold'}}>Instagram</Text>
                    </Pressable>
                </View>
            </View>

            <View style={{backgroundColor: 'white', paddingHorizontal:15, borderRadius: 8, width:'92%', marginHorizontal: 'auto', marginTop: 30 }} >
                <Text style={{fontWeight: 'bold', fontSize: 28,textAlign: 'center', paddingVertical:30}}>Le {convertDate(data.startDate)}</Text>
                <Text>{data.description}</Text>
            </View>


        </ScrollView>
    );
}

export default SingleEvent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        minWidth: 280,
        paddingVertical: 10,
        borderRadius: 8,
        overflow: 'hidden',
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
        top : '50%',
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    image: {
        width: '100%',
        height: 350,
        position: 'relative',
        top: 0,
    },
    itemPictio: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    containerPicto: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    }
})


