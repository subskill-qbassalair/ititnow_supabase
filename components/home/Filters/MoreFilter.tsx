import React, {useMemo, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {useDispatch} from "react-redux";
import {setCuisineType} from "../../../redux/slices/filters";
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {log} from "expo/build/devtools/logger";


function MoreFilter() {
    const dispatch = useDispatch()

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {id: '1', label: 'Américain', value: 'american'},
        {id: '2', label: 'Anglais', value: 'british'},
        {id: '3', label: 'Asiatique', value: 'asian'},
        {id: '5', label: 'Belge', value: 'belgian'},
        {id: '6', label: 'Brésilien', value: 'brazilian'},
        {id: '7', label: 'Chinois', value: 'chinese'},
        {id: '8', label: 'Français', value: 'french'},
        {id: '9', label: 'Grec', value: 'greek'},
        {id: '10', label: 'Indien', value: 'indian'},
        {id: '11', label: 'Italien', value: 'italian'},
        {id: '12', label: 'Japonais', value: 'japanese'},
        {id: '13', label: 'Marocain', value: 'moroccan'},
        {id: '14', label: 'Mexicain', value: 'mexican'},
        {id: '15', label: 'Thaï', value: 'thai'},
        {id: '16', label: 'Vietnamien', value: 'vietnamese'},


    ]), []);

    // const toggleActive = () => {
    //     active ? dispatch(setCuisineType('')) : dispatch(setCuisineType(value));
    // };
    const setCuisine = (id: string) => {
        setSelectedId(id);
        const value = radioButtons.find((radio) => radio.id === id)?.value
        dispatch(setCuisineType(value??''));
    }

    const [selectedId, setSelectedId] = useState<string | undefined>();


    return (
        <>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={setCuisine}
                selectedId={selectedId}
            />
        </>


    );
}

export default MoreFilter;

const styles = StyleSheet.create({
    budgetFilter: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        width: 'auto',
        borderWidth: 4,
        borderColor: 'transparent',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    active: {
        borderColor: '#405F57',
    },
    activeText: {
        color: 'black',
    },
    budgetFilterText: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'center',
    },
});
