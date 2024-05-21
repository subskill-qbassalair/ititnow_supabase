// @ts-ignore
import { MAPBOX_ACCESS_TOKEN } from '@env';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import * as Location from "expo-location";
import {useDispatch} from "react-redux";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
import {setLatitude, setLongitude} from "../../redux/slices/gpsPosition";


const AnnotationContent = ({ title }: { title: string }) => (
    <View style={styles.touchableContainer}>
        <Text>{title}</Text>
        <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchableText}>Btn</Text>
        </TouchableOpacity>
    </View>
);

const CustomMap = () => {

    const [status, setStatus] = useState<string | null>(null)
    const mapref = React.useRef(null)
    const dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            let { status } = await  Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({})
            dispatch(setLatitude(location.coords.latitude))
            dispatch(setLongitude(location.coords.longitude))
            console.log(location.coords.latitude, location.coords.longitude)
        })();
    }, [dispatch]);


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
                <Mapbox.Camera followZoomLevel={12} followUserLocation/>
                <Mapbox.UserLocation visible={true} animated={true}/>
                {/*Markers*/}

                <Mapbox.PointAnnotation
                    coordinate={[37.785854 , -122.406417]}
                    id='pointAnnotation'
                    key='pointAnnotation'>
                    <AnnotationContent title={'this is a point annotation'} />
                </Mapbox.PointAnnotation>



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
    marker: {
        backgroundColor: 'white',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
    },
    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 15,
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'orange',
        transform: [{ scale: 0.6 }],
    },

});
