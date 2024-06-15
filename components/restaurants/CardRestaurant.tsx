import React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';

function CardRestaurant(data: any) {
    return (
        <View style={styles.container}>
            {data.data.opening_hours ? (
                <Text style={[styles.bubble, data.data.opening_hours.open_now ? null : styles.closed ]} >{data.data.opening_hours.open_now ? 'Ouvert' : 'Fermé'}</Text>
            ) : null}
            {data.data.photos ? (
                <Image
                    style={styles.image}
                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.data.photos[0].photo_reference}&key=AIzaSyA3I7cXhLM51hRryr_l_70JMJqKuviH4do`}}
                />
            ) : (
                <Image
                    style={styles.image}
                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.data.icon}&key=AIzaSyA3I7cXhLM51hRryr_l_70JMJqKuviH4do`}}
                />
            )
            }
            <View style={styles.text}>
                <Text style={styles.title}>{data.data.name}</Text>
                <View>
                    <Text style={styles.restauInfos} >Note : {data.data.rating} / 5 ( {data.data.user_ratings_total} avis) </Text>
                    <Text style={[styles.restauLocation, {marginTop:5}]} >{data.data.vicinity}</Text>
                </View>
                <Pressable>
                    <Text style={styles.cta}> Ouvrir dans mon GPS </Text>
                </Pressable>
            </View>
        </View>
    );
}

export default CardRestaurant;

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        width: 275,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 150,
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
    },
    text: {
        padding: 8,
        flex:1,
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    restauInfos: {
        fontSize: 14,
        color: 'grey',
    },
    restauLocation: {
        fontSize: 14,
        color: 'grey',
    },
    bubble: {
        position: 'absolute',
        top : 5,
        left: 5,
        zIndex: 1000,
        color: 'white',
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 8,
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    closed: {
        backgroundColor: 'red',
    },
    cta:{
        backgroundColor: 'black',
        color: 'white',
        padding: 11,
        borderRadius: 8,
        overflow: 'hidden',
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
    }

})
