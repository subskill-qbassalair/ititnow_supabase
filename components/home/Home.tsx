import React from 'react';
import {View,Text} from "react-native";
import { Session } from '@supabase/supabase-js'



function Home({ session }: { session: Session }) {
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}

export default Home;
