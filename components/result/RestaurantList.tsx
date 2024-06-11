import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import CardRestaurant from "./CardRestaurant";

function RestaurantList({restaurant}:any) {
    return (
        <View style={styles.container}  >
        <FlatList
            removeClippedSubviews
            decelerationRate={0}
            snapToInterval={275}
            horizontal
            data={restaurant}
            renderItem={({item}) =>
                <CardRestaurant data={item} />  }/>
        </View>
    );
}

export default RestaurantList;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    }
})
