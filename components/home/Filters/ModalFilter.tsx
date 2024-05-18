import React, { useState } from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDistance, setPriceLevel} from "../../../redux/slices/filters";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MoreFilter from "./MoreFilter";


const MoreFilterComponent = ({ filters }) => {
    const [focusedFilter, setFocusedFilter] = useState(null);

    const handleFocus = (value) => {
        setFocusedFilter(value);
    };

    return (
        <>
            <Text style={styles.titleModal} >Plus de filtres</Text>
            <ScrollView>
                <View style={styles.filterContainer}>
                    {filters.map(filter => (
                        <MoreFilter
                            key={filter.id}
                            value={filter.value}
                            isFocused={focusedFilter === filter.apiId}
                            setIsFocused={() => handleFocus(filter.apiId)}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

const Slider = ({title, min, max, action, desc}) => {
    const [sliderChanging, setSliderChanging] = useState(false);
    const [sliderValue, setSliderValue] = useState([min]);
    const dispatch = useDispatch();
    let initialValuezz = null;
    if(title === "Budget"){
        initialValuezz = useSelector(state => state.filters.priceLevel)
    } else {
        initialValuezz = useSelector(state => state.filters.distance)
    }

    const sliderValuesChangeStart = () => setSliderChanging(true);
    const sliderValuesChange = values => setSliderValue(values);
    const sliderValuesChangeFinish = () =>{
        setSliderChanging(false)
        dispatch(action(sliderValue[0]))
    };

    return (<>
            <Text style={styles.titleModal} >{title}</Text>
            <View style={styles.container} >
                <MultiSlider
                    values={[initialValuezz]}
                    sliderLength={250}
                    min={min}
                    max={max}
                    onValuesChangeStart={sliderValuesChangeStart}
                    onValuesChange={sliderValuesChange}
                    onValuesChangeFinish={sliderValuesChangeFinish}
                    snapped
                    selectedStyle={{ backgroundColor: 'white' }}
                    unselectedStyle={{ backgroundColor: 'silver' }}
                    markerStyle={{ backgroundColor: '#51796F' }}
                />
                <View style={styles.wrapperDesc}>
                    <Text style={{color:"white"}} >{desc[0]}</Text>
                    <Text style={{color:"white"}} >{desc[1]}</Text>
                </View>
            </View>
        </>
    );
}
const MoreFilters = () => (
    <MoreFilterComponent
        filters={[
            { id: 'A', value: 'Américain', apiId: 'american' },
            { id: 'B', value: 'Anglais', apiId: 'british' },
            { id: 'C', value: 'Asiatique', apiId: 'asian' },
            { id: 'D', value: 'Italien', apiId: 'italian' },
            { id: 'E', value: 'Mexicain', apiId: 'mexican' },
            { id: 'F', value: 'Français', apiId: 'french' },
            { id: 'G', value: 'Indien', apiId: 'indian' },
            { id: 'H', value: 'Japonais', apiId: 'japanese' },
            { id: 'I', value: 'Thaï', apiId: 'thai' },
            { id: 'J', value: 'Vietnamien', apiId: 'vietnamese' },
        ]}
    />
);

const ModalFilter = ({ modal }) => (
    <>
        {modal === 'budget' && <Slider title={"Budget"} min={1} max={4} action={setPriceLevel} desc={['Modéré', "Cher"]} />}
        {modal === 'distance' && <Slider title={"Distance"} min={750} max={2200} action={setDistance} desc={['Proche', 'Loin']} />}
        {modal === 'moreFilters' && <MoreFilters />}
    </>
);

export default ModalFilter;

const styles = StyleSheet.create({
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        flexWrap: 'wrap',
    },

    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: "#405F57",
        padding: 30,
        borderRadius: 10,
        marginTop: 20,

    },
    wrapperDesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    titleModal: {
        fontSize: 28,
        paddingVertical: 15,
        color: 'white',
        fontWeight: 'bold',
    },
});