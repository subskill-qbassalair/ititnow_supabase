import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import { Session } from '@supabase/supabase-js'
import CustomMap from "./CustomMap";



function Home({ session }: { session: Session }) {
    return (
        <View style={styles.container} >
            <Text>Home</Text>
            <CustomMap/>
            <Text>{session.user?.email}</Text>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})
