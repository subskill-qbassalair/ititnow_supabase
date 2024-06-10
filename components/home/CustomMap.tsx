// @ts-ignore
import { MAPBOX_ACCESS_TOKEN } from '@env';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import Mapbox, {Camera, MapView, MarkerView} from '@rnmapbox/maps';
import * as Location from "expo-location";
import {useNavigation} from "@react-navigation/native";
import {DEFAULT_CENTER_COORDINATE, SF_OFFICE_COORDINATE} from "../../utils";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
import imagePins from '../../assets/pin.png';
import {useDispatch,} from "react-redux";
import {setLatitude, setLongitude} from "../../redux/slices/filters";

const CustomMap = () => {
    const navigation = useNavigation()
    const [status, setStatus] = useState<string | null>(null)
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const mapref = React.useRef(null)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            let { status } = await  Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            dispatch(setLatitude(location.coords.latitude))
            dispatch(setLongitude(location.coords.longitude))
        })();
    }, []);


    let view = <View style={styles.page}>
        <View style={styles.container}>
            <MapView
                style={styles.map}
                styleURL="mapbox://styles/alimotor/clw6h3i3z01as01pfasmzeech"
                projection={"mercator"}
                logoEnabled={false}
                compassEnabled={false}
                scaleBarEnabled={false}
                ref={mapref}
            >
                <Camera
                    followZoomLevel={14}
                    followUserLocation
                />
                <Mapbox.UserLocation visible={true} animated={true}/>
                {/*Markers*/}
                <MarkerView
                    key={'marker-blue'}
                    id={'marker-blue'}
                    coordinate={SF_OFFICE_COORDINATE}
                    allowOverlap
                >
                    {/*<Mapbox.Images source={imagePins} style={styles.markerBlue}/>*/}
                    <View style={[styles.marker, styles.markerBlue]} />

                </MarkerView>

            </MapView>
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
    markerBlue: {
        backgroundColor: 'blue',
        width: 45,
        height: 45,
    },
    marker: {
        width: 35,
        height: 35,
        borderRadius: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
