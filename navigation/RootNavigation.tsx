import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";
import {Session} from "@supabase/supabase-js";
import {supabase} from "../lib/supabase";
import Home from "../components/home/Home";
import Menu from "../components/layout/header/Menu";
import Layout from "../components/auth/Layout";
import EventsList from "../components/home/Filters/EventsList";
import SingleEvent from "../components/events/SingleEvent";

export type RootStackParamList = {
    Home: undefined;
    Menu: undefined;
    Result: undefined;
    EventsList: undefined;
    SingleEvent: { event: any };
}

function RootNavigation() {
    const Stack = createNativeStackNavigator<RootStackParamList>()
    const navigation = useNavigation()
    const [initialRoute, setInitialRoute] = useState('Auth')

    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])





    return (
        <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
                contentStyle:{
                    backgroundColor:'#51796F',
                }}
            }
        >
            {session && session.user ? (
                <>
                    <Stack.Screen
                        name="Home" component={Home}
                        options={{headerShown: false, animation: 'slide_from_right'}}
                    />
                    <Stack.Screen
                        name="Menu" component={Menu}
                        options={{headerShown: false, animation: 'slide_from_bottom'}}
                    />
                    <Stack.Screen
                        name="EventsList" component={EventsList}
                        options={{headerShown: false, animation: 'slide_from_bottom'}}
                    />
                    <Stack.Screen
                        name="SingleEvent" component={SingleEvent}
                        options={{headerShown: false, animation: 'slide_from_right'}}

                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="AuthLayout" component={Layout}
                        options={{headerShown: false, animation: 'slide_from_right'}}
                    />
                </>
            )}



        </Stack.Navigator>
    );
}

export default RootNavigation;
