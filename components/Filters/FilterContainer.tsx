import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function FilterContainer() {
    function handleModal(budget: string) {

    }

    return (

            <View style={styles.containerMain} >
                <View style={styles.containerMainTop}>
                    <TouchableOpacity
                        style={[styles.btnMoreFilter, styles.btn]}
                        onPress={ () => handleModal('moreFilters') }
                    >
                        <Text style={{fontSize:14}}>Plus de filtre</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerMiddle} >
                    <TouchableOpacity
                        style={[styles.btnFilter, styles.btn]}
                        onPress={ () => handleModal('budget') }
                    >
                        <Text style={{fontSize:16}}>Mon budget</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={[styles.btnFilter, styles.btn]}
                        onPress={ () => handleModal('distance') }
                    >
                        <Text style={{fontSize:16}}>Distance</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBigCta} >
                    { <TouchableOpacity
                        style={[styles.btn, styles.bigCta]}
                        // onPress={() => handleFetch()}
                    >
                        {/*<Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >{isLoading ? '...' : 'Trouve moi un restau'}</Text>*/}
                        <Text style={{fontSize: 26, fontFamily: 'PoppinsBold'}} >Trouve moi un restau</Text>
                    </TouchableOpacity> }
                </View>
        </View>
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
        justifyContent: 'flex-end',
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
