import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from "react-native";
import globalStyle from "../../../globalStyle";
import { eventCardDate } from "../../../utils";
import {globalStyles} from "../../../style";

const image = {uri: "https://reactjs.org/logo-og.png"};

function EventCard({data}: any) {
    console.log(data.item.title)
    return (
        <View style={[styles.container,  globalStyles.shadow]} >
            <ImageBackground source={image} resizeMode="cover" style={styles.image} >
                <View style={styles.overlay}></View>
                <View style={styles.cardInner}>
                    <Text style={[styles.text, styles.title]} >{data.item.title}</Text>
                    <View style={{display: 'flex', flexDirection:'row'}}>
                    <View style={styles.bubble}><Text style={[styles.text, styles.location]} >{data.item.location}</Text></View>
                    <View style={styles.bubble}><Text style={[styles.text, styles.date, globalStyle.primaryBackground]} >{eventCardDate(data.item.startDate)}</Text></View>
                    </View>
                </View>
            </ImageBackground>
        </View>
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
        fontFamily: 'PoppinsBold',
        padding: 3,
    },
    title: {
        fontSize: 14,
        fontFamily: 'PoppinsBold',

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
