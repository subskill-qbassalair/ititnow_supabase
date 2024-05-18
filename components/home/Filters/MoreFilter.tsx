import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {useDispatch} from "react-redux";
import {setCuisineType} from "../../../redux/slices/filters";


function MoreFilter({value, active}) {
    const [isActive, setIsActive] = useState(active)
    const dispatch = useDispatch()

    const toggleActive = () => {
        setIsActive(!isActive)
        dispatch(setCuisineType(value))
    }

    return (
        <TouchableOpacity
            style={[
                styles.budgetFilter,
                isActive && styles.active
            ]}
            onPress={()=>{toggleActive()}}
        >
            <Text
                style={[
                    styles.budgetFilterText,
                    isActive && styles.activeText
                ]}
            >
                {value}
            </Text>
        </TouchableOpacity>
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
