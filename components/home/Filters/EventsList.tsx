import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import Back from "../../layout/header/Back";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from "@tanstack/react-query";
import { getEvents, getNextEvent } from "../../../api/getEvents";
import EventCard from "./EventCard";
import BigEventCard from "./BigEventCard";

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
    const query = useQuery({
        queryKey: ['events'],
        queryFn: getEvents
    });

    const nextEvent = useQuery({
        queryKey: ['nextEvent'],
        queryFn: getNextEvent
    });

    return (
        <ScrollView style={styles.container}>
            <Back navigation={navigation} />

            {/* Hero */}
            {nextEvent.isLoading ? (
                <Text>Loading...</Text>
            ) : nextEvent.isError ? (
                <Text>Error loading next event</Text>
            ) : (
                <BigEventCard data={nextEvent.data} />
            )}

            {/* Soon events */}
            <View style={styles.wrapperLine}>
                <Text style={styles.title}>Les prochains évènements</Text>
                <FlatList
                    horizontal
                    data={query.data}
                    renderItem={({ item }) =>
                        <EventCard data={item} />
                    }
                />
            </View>

            {/* Next week events */}
            <View style={styles.wrapperLine}>
                <Text style={styles.title}>Pour plus tards...</Text>
                <FlatList
                    horizontal
                    data={query.data}
                    renderItem={({ item }) =>
                        <EventCard data={item} />
                    }
                />
            </View>
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
