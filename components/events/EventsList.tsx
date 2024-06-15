import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import Back from "../layout/header/Back";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from "@tanstack/react-query";
import { getEvents, getNextEvent } from "../../api/getEvents";
import EventCard from "./EventCard";
import BigEventCard from "./BigEventCard";
import Animated, {FadeInDown} from 'react-native-reanimated';
import Loader from "../Loader";



type RootStackParamList = {
    EventsList: undefined;
};

type EventCard = {
    id: string;
    title: string;
    date: string;
    location: string;
    image: string;
}

type EventsListScreenRouteProp = RouteProp<RootStackParamList, 'EventsList'>;

type EventsListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EventsList'
>;

type Props = {
    route: EventsListScreenRouteProp;
    navigation: EventsListScreenNavigationProp;
};

function EventsList({ route, navigation }: Props) {

    const nextEvent = useQuery({
        queryKey: ['nextEvent'],
        queryFn: getNextEvent,
    });


    const query = useQuery({
        queryKey: ['events'],
        queryFn: getEvents,
    });

    return (
        <ScrollView style={styles.container}>
            <Back navigation={navigation} />

            {/* Hero */}
            {nextEvent.isLoading ? (
                <Loader />
            ) : nextEvent.isError ? (
                <Text>Error loading events list</Text>
            ) : (
                <>
                {/*<BigEventCard data={nextEvent.data} />*/}
                {/*    /!* Soon events *!/*/}
                {/*    <Animated.View*/}
                {/*        entering={FadeInDown.delay(300)}*/}
                {/*        style={styles.wrapperLine}>*/}
                {/*        <Text style={styles.title}>Les prochains évènements</Text>*/}
                {/*        <FlatList*/}
                {/*            horizontal*/}
                {/*            data={query.data}*/}
                {/*            initialNumToRender={7}*/}
                {/*            renderItem={({ item }) =>*/}
                {/*                <EventCard data={item} />*/}
                {/*            }*/}
                {/*        />*/}
                {/*    </Animated.View>*/}

                    {/* Next week events */}
                    {/*<Animated.View*/}
                    {/*    entering={FadeInDown.delay(500)}*/}
                    {/*    style={styles.wrapperLine}>*/}
                    {/*    <Text style={styles.title}>Pour plus tards...</Text>*/}
                    {/*    <FlatList*/}
                    {/*        horizontal*/}
                    {/*        data={query.data}*/}
                    {/*        renderItem={({ item }) =>*/}
                    {/*            <EventCard data={item} />*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*</Animated.View>*/}
                </>
            )}
        </ScrollView>
    );
}

export default EventsList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#51796F',
        paddingHorizontal: 15,
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontFamily: 'PoppinsBold',
    },
    wrapperLine: {
        marginTop: 30,
    }
});
