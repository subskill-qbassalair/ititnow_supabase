import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from "react-native";
import {globalStyles} from "../../../style";
import globalStyle from "../../../globalStyle";
import {eventCardDate} from "../../../utils";

const image = {uri: "https://reactjs.org/logo-og.png"};


function BigEventCard({data}: any) {
    console.log(data)
    return (
      <View>
          <View style={[styles.container,  globalStyles.shadow]} >
              {data ? (
                  <ImageBackground source={image} resizeMode="cover" style={styles.image} >
                      <View style={styles.overlay}></View>
                      <View style={styles.cardInner}>
                          {/*<Text style={[styles.text, styles.title]} >{data.title}</Text>*/}
                          <View style={{display: 'flex', flexDirection:'row'}}>
                              <View style={styles.bubble}><Text style={[styles.text, styles.location]} >{data.location}</Text></View>
                              <View style={styles.bubble}><Text style={[styles.text, styles.date, globalStyle.primaryBackground]} >{eventCardDate(data.startDate)}</Text></View>
                          </View>
                      </View>
                  </ImageBackground>
              ) : (
                  <Text>Loading</Text>) }
          </View>
      </View>
    );
}

export default BigEventCard;

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        marginRight: 10,
        marginTop: 20,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: "black",

    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        borderRadius: 8,
    },
    cardInner: {
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'PoppinsBold',
        padding: 3,
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
    },
    bubble: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 20,
        padding: 5,
        marginRight: 5,
    },
    location: {
        fontSize: 8,
    },
    date: {
        fontSize: 8,
    }
})
