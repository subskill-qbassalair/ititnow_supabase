import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import { Session } from '@supabase/supabase-js'
import CustomMap from "./CustomMap";
import FilterContainer from "./Filters/FilterContainer";
import Burger from "../layout/header/Burger";
import CustomMap2 from "./Filters/CustomMap2";


function Home({ session }: { session: Session }) {
    return (
        <View style={styles.container} >
            <Burger/>
            <CustomMap/>
            <FilterContainer/>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})
