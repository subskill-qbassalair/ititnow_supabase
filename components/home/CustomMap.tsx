// @ts-ignore
import { MAPBOX_ACCESS_TOKEN } from '@env';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import * as Location from "expo-location";
import {useNavigation} from "@react-navigation/native";
import {DEFAULT_CENTER_COORDINATE} from "../../utils";
import pins from "../../assets/pin.png"
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const CustomMap = () => {
    const navigation = useNavigation()
    const [status, setStatus] = useState<string | null>(null)
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const mapref = React.useRef(null)

    useEffect(() => {
        (async () => {
            let { status } = await  Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
        })();
    }, []);


    let view = <View style={styles.page}>
        <View style={styles.container}>
            <Mapbox.MapView
                style={styles.map}
                styleURL="mapbox://styles/alimotor/clw6h3i3z01as01pfasmzeech"
                projection={"mercator"}
                logoEnabled={false}
                compassEnabled={false}
                scaleBarEnabled={false}
                ref={mapref}
            >
                <Mapbox.Camera followZoomLevel={14} followUserLocation/>
                <Mapbox.UserLocation visible={true} animated={true}/>
                <Mapbox.Images images={{ pins }} />
                {/*Markers*/}
                <Mapbox.MarkerView id={'marker-1'} coordinate={DEFAULT_CENTER_COORDINATE}/>

            </Mapbox.MapView>
        </View>
    </View>;

    return view;
}


export default CustomMap;

// @ts-ignore
const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    container: {
        height: "100%",
        width: "100%"
    },
    map: {
        flex: 1,
        backgroundColor: 'tomato',
        height: '100%',
    },
    touchableContainer: { borderColor: 'black', borderWidth: 1.0, width: 60 },
    touchable: {
        backgroundColor: 'blue',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    touchableText: {
        color: 'white',
        fontWeight: 'bold',
    },
    matchParent: { flex: 1 },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: 'blue',
        transform: [{ scale: 0.6 }],
    },



});
