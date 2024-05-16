import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity} from "react-native";
import * as Clipboard from 'expo-clipboard';
import Back from "../layout/header/Back";

function Result({route, navigation}) {
    const {restaurants} = route.params;
    const [copiedText, setCopiedText] = React.useState('')
    const copyToClipboard = async (adress) => {
        await Clipboard.setStringAsync(adress);
    };

    return (
        <ScrollView style={styles.container}>
        <Back navigation={navigation} />
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 20}} >Résultats</Text>
            <View style={styles.containerItems}>
                {
                    restaurants.map(restaurant => (

                        <View key={restaurant.place_id} style={styles.item} >
                            <Text style={styles.restauName} >{restaurant.name}</Text>
                            <View style={styles.itemInner} >
                                <Image
                                    style={styles.image}
                                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=AIzaSyA3I7cXhLM51hRryr_l_70JMJqKuviH4do`}}
                                />
                                <Text style={styles.restauInfos} >Note sur google : {restaurant.rating} / 5</Text>
                                <Text style={styles.restauInfos} >{restaurant.vicinity}</Text>
                                <TouchableOpacity onPress={() => copyToClipboard(restaurant.vicinity)}>
                                    <Text style={[styles.restauInfos, {color: 'blue'}]} >Copier l'adresse</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    );
}

export default Result;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51796F',
    },
    containerItems: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    item: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    itemInner: {
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 10,
        borderRadius: 10,
    },
    restauName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
        textAlign: 'center'
    },
    restauInfos: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 10
    }
})
