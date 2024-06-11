// @ts-ignore
import { MAPBOX_ACCESS_TOKEN } from '@env';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import Mapbox, { Camera, MapView, MarkerView } from '@rnmapbox/maps';
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLatitude, setLongitude } from "../../redux/slices/filters";
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);
const imagePins = require('../../assets/pinblack.png');

type Coordinate = [number, number];

interface Restaurant {
    id: string;
    name: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

const CustomMap: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null);
    const mapRef = React.useRef<Mapbox.MapView>(null);
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurants.restaurants);
    const cameraRef = React.useRef<Mapbox.Camera>(null);
    const [followUser, setFollowUser] = useState(true)

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setStatus('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            dispatch(setLatitude(location.coords.latitude));
            dispatch(setLongitude(location.coords.longitude));
        })();
    }, [dispatch]);

    useEffect(() => {
        if (restaurants.length > 0) {
            setFollowUser(false);
        } else {
            setFollowUser(true);
        }
    }, [restaurants]);

    useEffect(() => {
        if (!followUser && restaurants.length > 0) {
            const coordinates: Coordinate[] = restaurants.map((item: Restaurant) => [item.geometry.location.lng, item.geometry.location.lat]);
            const bounds = calculateBounds(coordinates);
            cameraRef.current?.fitBounds(bounds.sw, bounds.ne, 30, 1300);
        }
    }, [followUser, restaurants]);


    const calculateBounds = (coordinates: Coordinate[]) => {
        let minX: number | undefined, minY: number | undefined, maxX: number | undefined, maxY: number | undefined;

        coordinates.forEach(coord => {
            if (minX === undefined || coord[0] < minX) {
                minX = coord[0];
            }
            if (minY === undefined || coord[1] < minY) {
                minY = coord[1];
            }
            if (maxX === undefined || coord[0] > maxX) {
                maxX = coord[0];
            }
            if (maxY === undefined || coord[1] > maxY) {
                maxY = coord[1];
            }
        });

        return {
            sw: [minX, minY] as Coordinate,
            ne: [maxX, maxY] as Coordinate,
        };
    };

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    styleURL="mapbox://styles/alimotor/clw6h3i3z01as01pfasmzeech"
                    projection={"mercator"}
                    logoEnabled={false}
                    compassEnabled={false}
                    scaleBarEnabled={false}
                    ref={mapRef}
                >
                    <Camera
                        followZoomLevel={14}
                        followUserLocation={followUser}
                        ref={cameraRef}
                        animationDuration={2000}
                        animationMode={'flyTo'}
                    />
                    <Mapbox.UserLocation visible={true} animated={true} />
                    {/* Markers */}
                    {restaurants.map((item: Restaurant) => (
                        <MarkerView
                            key={item.name}
                            id={item.id}
                            coordinate={[item.geometry.location.lng, item.geometry.location.lat]}
                            allowOverlap
                        >
                            <Pressable
                                style={{
                                    width: 24,
                                    height: 24,
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                }}
                                onPress={() => console.log('pressing the marker view')}
                            >
                                <Image
                                    style={{
                                        width: 33,
                                        height: 33,
                                        marginVertical: 8,
                                    }}
                                    resizeMode="contain"
                                    source={imagePins}
                                />
                            </Pressable>
                        </MarkerView>
                    ))}
                </MapView>
            </View>
        </View>
    );
};

export default CustomMap;

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
        width: "100%",
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
        width: 35,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
