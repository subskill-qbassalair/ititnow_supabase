import React from 'react';
import {ScrollView, StyleSheet, Text} from "react-native";
import Back from "../../layout/header/Back";
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

    return (
        <ScrollView style={styles.container}>
            <Back navigation={navigation} />
            <Text style={{textAlign: 'center',color:'white', fontSize: 40, fontWeight: 'bold', marginTop: 20}} >Les évènements</Text>
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
