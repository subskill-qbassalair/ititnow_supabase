import React from 'react';
import {View, Text, StyleSheet, Pressable} from "react-native";
import globalStyle from "../../../globalStyle";
import { eventCardDate } from "../../../utils";
import {globalStyles} from "../../../style";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../navigation/RootNavigation";
import Animated from 'react-native-reanimated';


const image = {uri: "https://reactjs.org/logo-og.png"};

export type Event = {
    name: string;
    location: string;
    id: string;
    title: string;
    startDate: string;
    description: string;
    endDate: string;
    imageUri: string;
};

type Props = {
    data: Event
}

function EventCard({data}: Props) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Pressable
            key={data.id}
            onPress={() =>  navigation.navigate('SingleEvent', {
                event: data
            }) }>
            <View style={[styles.container,  globalStyles.shadow]} >
                <Animated.Image
                    sharedTransitionTag={data.id}
                    source={image}
                    resizeMode="cover"
                    style={styles.image}
                />
                    <View style={styles.overlay}></View>
                    <View style={styles.cardInner}>
                        <Text style={[styles.text, styles.title]} >{data.title}</Text>
                        <View style={{display: 'flex', flexDirection:'row'}}>
                            <View style={styles.bubble}><Text style={[styles.text, styles.location]} >{data.location}</Text></View>
                            <View style={styles.bubble}><Text style={[styles.text, styles.date, globalStyle.primaryBackground]} >{eventCardDate(data.startDate)}</Text></View>
                        </View>
                    </View>
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
        position: 'relative',

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    image: {
        borderRadius: 8,
        width: 200,
        height: 200,
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
