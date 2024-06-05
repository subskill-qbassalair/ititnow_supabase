import React from 'react';
import {ScrollView, StyleSheet, Text} from "react-native";
import Back from "../../layout/header/Back";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery, useQueryClient} from "@tanstack/react-query";
import {getEvents} from "../../../api/getEvents";



type RootStackParamList = {
    EventsList: undefined;
};

type EventsListScreenRouteProp = RouteProp<RootStackParamList, 'EventsList'>;

type EventsListScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EventsList'
>;

type Props = {
    route: EventsListScreenRouteProp;
    navigation: EventsListScreenNavigationProp;
};

function EventsList({route, navigation}: Props) {

    const queryClient = useQueryClient()
    const query = useQuery({
        queryKey: ['events'],
        queryFn: getEvents
    })

    return (
        <ScrollView style={styles.container}>
            <Back navigation={navigation} />
            <Text style={{textAlign: 'center',color:'white', fontSize: 40, fontWeight: 'bold', marginTop: 20}} >Les évènements</Text>


            {query.data?.map((event: any) => (
                <Text key={event.id} style={{color: 'white', fontSize: 20, margin: 10}}>{event.title}</Text>
            ))}

        </ScrollView>
    );
}

export default EventsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51796F',
    },
})
