import React, { useState } from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { setDistance, setPriceLevel} from "../../../redux/slices/filters";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MoreFilter from "./MoreFilter";
import OpenNow from "./OpenNow";


type sliderProps = {
    title: string;
    min: number;
    max: number;
    action: any;
    desc: string[];
}
type RootState = {
    filters: {
        distance: number;
        priceLevel: number;
    }
}


const MoreFiltersComponent = () => {

    return (

        <ScrollView>
            <Text style={styles.titleModal} >Ouvert maintenant ?</Text>
            <OpenNow />

            <Text style={styles.titleModal} >Plus de filtres</Text>
            <View style={styles.filterContainer}>
                <MoreFilter />
            </View>
        </ScrollView>
    );
};

const Slider = ({title, min, max, action, desc}:sliderProps) => {
    const [sliderChanging, setSliderChanging] = useState(false);
    const [sliderValue, setSliderValue] = useState([min]);
    const dispatch = useDispatch();
    let initialValue = null;
    if(title === "Budget"){
        initialValue = useSelector((state: RootState ) => state.filters.priceLevel)
    } else {
        initialValue = useSelector((state: RootState) => state.filters.distance)
    }

    const sliderValuesChangeStart = () => setSliderChanging(true);
    const sliderValuesChange = (values: number[]) => setSliderValue(values);
    const sliderValuesChangeFinish = () =>{
        setSliderChanging(false)
        dispatch(action(sliderValue[0]))
    };

    return (<>
            <Text style={styles.titleModal} >{title}</Text>
            <View style={styles.container} >
                <MultiSlider
                    values={[initialValue]}
                    sliderLength={250}
                    min={min}
                    max={max}
                    onValuesChangeStart={sliderValuesChangeStart}
                    onValuesChange={sliderValuesChange}
                    onValuesChangeFinish={sliderValuesChangeFinish}
                    snapped
                    selectedStyle={{ backgroundColor: 'black' }}
                    unselectedStyle={{ backgroundColor: 'silver' }}
                    markerStyle={{ backgroundColor: '#51796F' }}
                />
                <View style={styles.wrapperDesc}>
                    <Text style={{color:"black"}} >{desc[0]}</Text>
                    <Text style={{color:"black"}} >{desc[1]}</Text>
                </View>
            </View>
        </>
    );
}

const ModalFilter = ({ modal }: { modal: string }) => (
    <>
        {modal === 'budget' && <Slider title={"Budget"} min={1} max={4} action={setPriceLevel} desc={['Modéré', "Cher"]} />}
        {modal === 'distance' && <Slider title={"Distance"} min={750} max={2200} action={setDistance} desc={['Proche', 'Loin']} />}
        {modal === 'moreFilters' && <MoreFiltersComponent  />}
    </>
);

export default ModalFilter;

const styles = StyleSheet.create({
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
    },

    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: "#FFFFFF",
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
