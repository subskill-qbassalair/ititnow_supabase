import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Pressable} from "react-native";
import globalStyle from "../../../globalStyle";
import { eventCardDate } from "../../../utils";
import {globalStyles} from "../../../style";
import {useNavigation} from "@react-navigation/native";

const image = {uri: "https://reactjs.org/logo-og.png"};

function EventCard({data}: any) {
    const navigation = useNavigation();
    return (
        <Pressable
            key={data.id}
            onPress={() =>  navigation.navigate('SingleEvent', {
                event: data
            }) }>
            <View style={[styles.container,  globalStyles.shadow]} >
                <ImageBackground source={image} resizeMode="cover" style={styles.image} >
                    <View style={styles.overlay}></View>
                    <View style={styles.cardInner}>
                        <Text style={[styles.text, styles.title]} >{data.title}</Text>
                        <View style={{display: 'flex', flexDirection:'row'}}>
                            <View style={styles.bubble}><Text style={[styles.text, styles.location]} >{data.location}</Text></View>
                            <View style={styles.bubble}><Text style={[styles.text, styles.date, globalStyle.primaryBackground]} >{eventCardDate(data.startDate)}</Text></View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </Pressable>
    );
}

export default EventCard;

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        marginRight: 10,
        marginTop: 20,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: "black",

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 8,
    },
    cardInner: {
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        padding: 3,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    location: {
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    date: {
        borderRadius: 8,
    },
    bubble: {
        alignSelf: 'flex-start',
        padding: 3,
        borderRadius: 12,
        overflow: 'hidden'
    }
})
