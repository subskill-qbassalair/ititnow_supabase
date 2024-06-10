import React from 'react';
import {View, Text, ImageBackground, StyleSheet, Pressable} from "react-native";
import {globalStyles} from "../../../style";
import globalStyle from "../../../globalStyle";
import {eventCardDate} from "../../../utils";
import Animated from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "../../../navigation/RootNavigation";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

function BigEventCard({data}: any) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Pressable
            key={data.id}
            onPress={() =>  navigation.navigate('SingleEvent', {
                event: data
            }) }
        >
            <Animated.View
                sharedTransitionTag={data.id}
                style={[styles.container,  globalStyles.shadow]} >
                {data ? (
                    <>
                        <Animated.Image source={{uri:data.image}} resizeMode="cover" style={styles.image} />
                        <View style={styles.overlay}></View>
                        <View style={styles.cardInner}>
                            <Text style={[styles.text, styles.title]} >{data.title}</Text>
                            <View style={{display: 'flex', flexDirection:'row'}}>
                                <View style={styles.bubble}><Text style={[styles.text, styles.location]} >{data.location}</Text></View>
                                <View style={styles.bubble}><Text style={[styles.text, styles.date, globalStyle.primaryBackground]} >{eventCardDate(data.startDate)}</Text></View>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text>Loading</Text>) }
            </Animated.View>
        </Pressable>
    );
}

export default BigEventCard;

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: "100%",
        marginRight: 10,
        marginTop: 170,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        position: 'absolute',

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
        fontSize: 24,
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
