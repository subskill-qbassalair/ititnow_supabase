import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from "@tanstack/react-query";
import getNearbyRestaurants from "../../../api/nearbyRestaurants";
import {useNavigation} from "@react-navigation/native";
import {globalStyles} from "../../../style";
import ModalFilter from "./ModalFilter";
import {useSelector} from "react-redux";

type ResultNavigationProp = {
    Result: {
        restaurants: any[]
    }
}

function FilterContainer() {
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState('')
    const [isEnabled, setIsEnabled] = useState(false)
    const topAnim = useRef(new Animated.Value(1000)).current
    const navigation = useNavigation<ResultNavigationProp>()
    const [status, setStatus] = useState<string | null>(null)
    const distance = useSelector(state => state.filters.distance)
    const price = useSelector(state => state.filters.priceLevel)
    const cuisineType = useSelector(state => state.filters.cuisineType)
    const latitude = useSelector(state => state.filters.latitude)
    const longitude = useSelector(state => state.filters.longitude)



    const {data} = useQuery({
        queryKey: ['restaurants', {distance, price, cuisineType, latitude, longitude}],
        queryFn: getNearbyRestaurants,
        enabled: isEnabled,
    })

    useEffect(() => {
        if(data && data.length > 0){
            setIsLoading(false)
            navigation.navigate('Result', {
                restaurants: data
            })
            setIsEnabled(false)
        } else {
            setIsEnabled(false)
        }

    }, [data]);

    const handleModal = (modalType: string) => {
        if(modal === ''){
            setModal(modalType)
            Animated.timing(topAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else if (modal === modalType) {
            Animated.timing(topAnim, {
                toValue: 1000,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setTimeout(() => {
                setModal('')
            }, 300)

        } else {
            setModal(modalType)
            Animated.timing(topAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }

    const handleFetch = () => {
        setIsEnabled(true)
        setIsLoading(true)
    }

    const navigateEventsScreen = () => {
        navigation.navigate('EventsList')
    }

    return (
        <>
            <Animated.View style={[ modal === 'moreFilters' ? styles.modalMoreFilters : styles.modal , globalStyles.shadow, { transform: [{translateY: topAnim}] }]}>
                <ModalFilter  modal={modal}  />
            </Animated.View>
            <View style={[styles.containerMain, globalStyles.shadow]} >
                <View style={styles.containerMainTop}>

                    <TouchableOpacity
                        style={[styles.btnMoreFilter, styles.btn, globalStyles.shadow ]}
                        onPress={ () => navigateEventsScreen() }
                    >
                        <Text style={{fontSize:14}}>Évènements</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btnMoreFilter, styles.btn, globalStyles.shadow ]}
                        onPress={ () => handleModal('moreFilters') }
                    >
                        <Text style={{fontSize:14}}>Plus de filtres</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerMiddle} >
                    <TouchableOpacity
                        style={[styles.btnFilter, styles.btn, globalStyles.shadow]}
                        onPress={ () => handleModal('budget') }
                    >
                        <Text style={{fontSize:16}}>Mon budget</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.btnFilter, styles.btn, globalStyles.shadow]}
                        onPress={ () => handleModal('distance') }
                    >
                        <Text style={{fontSize:16}}>Distance</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBigCta} >
                    { <TouchableOpacity
                        style={[styles.btn, styles.bigCta, globalStyles.shadow]}
                        onPress={() => handleFetch()}
                    >
                        <Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >{isLoading ? '...' : 'Trouve moi un restau'}</Text>
                        {/*<Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >Trouve moi un restau</Text>*/}
                    </TouchableOpacity> }
                </View>
            </View>
        </>
    );
}

export default FilterContainer;

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
    containerMainTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    btn:{
        backgroundColor: 'white',
        borderRadius: 10,
    },
    btnMoreFilter: {
        padding: 10,
    },
    containerMiddle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 25,
    },
    btnFilter: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '45%',
        alignItems: 'center',
    },
    containerBigCta: {
        marginTop: 50,
        width: '100%',
    },
    bigCta: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    modal: {
        position: 'absolute',
        borderRadius: 20,
        top: '30%',
        left: 0,
        width: '90%',
        marginHorizontal: '5%',
        height: 'auto',
        backgroundColor: '#51796F',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    modalMoreFilters: {
        position: 'absolute',
        top: '15%',
        left: 0,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#51796F',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 20,
        paddingVertical: "20%",
    }

})
