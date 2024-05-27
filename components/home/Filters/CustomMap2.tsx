import React, {useEffect, useRef, useState} from 'react';
import * as Location from "expo-location";
import {StyleSheet, Text, View} from "react-native";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from "react-native-maps"
import {useDispatch} from "react-redux";
// import stylesSnazzyMap from "./customMapStyle";
// import MyCustomMarkerView from "./MyCustomMarkerView";


function CustomMap() {
    const mapRef = useRef<any>()
    const [status, setStatus] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            let { status } = await  Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});

            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);
        })();
    }, []);


    // Qijoq4OfqOAzuNVL
    return (
        mapRegion === null ? <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Loading...</Text></View> :
            (
                <MapView
                    style={StyleSheet.absoluteFill}
                    // customMapStyle={stylesSnazzyMap}
                    // provider={PROVIDER_GOOGLE}
                    initialRegion={mapRegion}
                    showsUserLocation
                    showsMyLocationButton
                    followsUserLocation
                    maxZoomLevel={17}
                    minZoomLevel={15}
                    ref={mapRef}
                >
                    {/*<Marker*/}
                    {/*    description="test marker"*/}
                    {/*    coordinate={{latitude: 37.785834, longitude: -122.406427}}*/}
                    {/*>*/}
                    {/*    <MyCustomMarkerView />*/}
                    {/*    <Callout>*/}
                    {/*        <View style={{ width: 150, padding: 10, backgroundColor: "green" }} >*/}
                    {/*            <Text style={{ fontSize: 24 }} >Test callout</Text>*/}
                    {/*        </View>*/}
                    {/*    </Callout>*/}
                    {/*</Marker>*/}

                </MapView>
            )
    );
}

export default CustomMap;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerMain: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#51796F',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1000,
        height: '35%',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    markerImage: {
        width: 154,
        height: 154,
    },
})

