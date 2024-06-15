import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useQuery} from "@tanstack/react-query";
import getNearbyRestaurants from "../../../api/nearbyRestaurants";
import {useNavigation} from "@react-navigation/native";
import {globalStyles} from "../../../style";
import ModalFilter from "./ModalFilter";
import {useDispatch, useSelector} from "react-redux";
import RestaurantList from "../../restaurants/RestaurantList";
import {AntDesign} from "@expo/vector-icons";
import {setRestaurants} from "../../../redux/slices/restaurants";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../navigation/RootNavigation";
import {setType} from "../../../redux/slices/filters";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



type RootState = {
    filters: {
        distance: number;
        priceLevel: number;
        cuisineType: string;
        latitude: number;
        longitude: number;
        openNow: boolean;
        type: string;
    },
};

function FilterContainer() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState('')
    const [isEnabled, setIsEnabled] = useState(false)
    const [hideMenu, setHideMenu] = useState(false)
    const topAnim = useRef(new Animated.Value(1000)).current
    const menuAnim = useRef(new Animated.Value(0)).current
    const restauListAnim = useRef(new Animated.Value(1000)).current
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const distance = useSelector((state: RootState) => state.filters.distance)
    const price = useSelector((state: RootState) => state.filters.priceLevel)
    const cuisineType = useSelector((state: RootState) => state.filters.cuisineType)
    const latitude = useSelector((state: RootState) => state.filters.latitude)
    const longitude = useSelector((state: RootState) => state.filters.longitude)
    const openNow = useSelector((state: RootState) => state.filters.openNow)
    const type = useSelector((state: RootState) => state.filters.type)
    const [activeButton, setActiveButton] = useState('restaurant');

    const {data} = useQuery({
        queryKey: ['restaurants', {distance, price, cuisineType, latitude, longitude, openNow, type}],
        queryFn: getNearbyRestaurants,
        enabled: isEnabled,
    })


    useEffect(() => {
        if(data && data.length > 0){
            setIsLoading(false)
            setHideMenu(true)
            dispatch(setRestaurants(data))
            setIsEnabled(false)
        } else {
            setIsEnabled(false)
        }

    }, [data]);

    const handleModal = (modalType: string) => {
        if(modal === ''){
            setModal(modalType)
            modalType === 'hideAll' ? hideModal() : showModal()
        }
        else if (modal === modalType) {
            hideModal()
            setTimeout(() => {
                setModal('')
            }, 300)
        }
        else {
            hideModal()
            setModal(modalType)
            modalType === 'hideAll' ? hideModal() :  setTimeout(() => {showModal()}, 150)
        }
    }

    const showModal = () => {
        Animated.timing(topAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }
    const hideModal = () => {
        Animated.timing(topAnim, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }

    const handleFetch = () => {
        setIsEnabled(true)
        setIsLoading(true)
    }

    const handlePress = (type: string) => {
        setActiveButton(type);
        dispatch(setType(type));
    };

    const handleRestaurantList = () => {
        setHideMenu(false)
        dispatch(setRestaurants([]))
    }

    const handleAnimations = () => {
        if(hideMenu){
            handleModal('hideAll')
            Animated.timing(restauListAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Animated.timing(menuAnim, {
                toValue: 1000,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setModal('')
            Animated.timing(restauListAnim, {
                toValue: 1000,
                duration: 300,
                useNativeDriver: true,
            }).start();

            Animated.timing(menuAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }

    useEffect(() => {
        handleAnimations()
    }, [hideMenu]);

    const navigateEventsScreen = () => {
        handleModal('hideAll')
        navigation.navigate('EventsList')
    }

    return (
        <>
            <Animated.View
                style={[ modal === 'moreFilters' ? styles.modalMoreFilters : styles.modal , globalStyles.shadow, { transform: [{translateY: topAnim}] }]}>
                <ModalFilter  modal={modal}  />
            </Animated.View>
            {/*Filtres (menu)*/}
            <Animated.View
                style={[styles.containerMain, globalStyles.shadow,{transform: [{translateY: menuAnim}]} ]} >
                <View style={styles.containerMainTop}>
                    <TouchableOpacity
                        style={[styles.btnMoreFilter, styles.btn, globalStyles.shadow ]}
                        onPress={ () => navigateEventsScreen() }
                    >
                        <Text style={{fontSize:14}}>Évènements</Text>
                    </TouchableOpacity>

                    <View style={{display:'flex', flexDirection: 'row', gap:5}}>
                        <TouchableOpacity
                            style={[styles.btnMoreFilter, styles.btn, activeButton === 'bar' ? globalStyles.shadow : null  ]}
                            onPress={ () => handlePress('bar') }
                        >
                            <Text style={{fontSize:14}}><FontAwesome5 name="cocktail" size={20} color={activeButton === 'bar' ? 'black' : '#51796F' } /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnMoreFilter, styles.btn, activeButton === 'restaurant' ? globalStyles.shadow : null ]}
                            onPress={ () => handlePress('restaurant')}
                        >
                            <Text style={{fontSize:14}}><Ionicons name="restaurant" size={20} color={activeButton === 'restaurant' ? 'black' : '#51796F' } /></Text>
                        </TouchableOpacity>
                    </View>



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
                        <Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >{isLoading ? '...' : 'Rechercher'}</Text>
                    </TouchableOpacity> }
                </View>
            </Animated.View>
            {/*Cartes restau*/}
            <Animated.View
                style={[styles.containerRestaurant,{transform: [{translateY: restauListAnim}]}]} >
                <Pressable
                    onPress={() =>handleRestaurantList()}
                    style={{
                        padding: 10,
                        width: '100%',
                    }}
                >
                    <View style={styles.backArrow} ><AntDesign name="arrowleft" size={24} color="black" /></View>
                </Pressable>
                <RestaurantList restaurant={data} />
            </Animated.View>
        </>
    )
}

export default FilterContainer;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerRestaurant: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        zIndex: 1000,
        height: '37%',
        borderRadius: 8,
    },
    backArrow: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top : -30,
        left: 0,
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
        borderRadius: 20,
        width: '100%',
        height: 400,
        backgroundColor: '#51796F',
        alignItems: 'center',
        zIndex: 1,
        padding: 20,

    },
})
