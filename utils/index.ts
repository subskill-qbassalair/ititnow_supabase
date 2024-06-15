import { Platform } from 'react-native';

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const DEFAULT_CENTER_COORDINATE = [-77.036086, 38.910233];
export const SF_OFFICE_COORDINATE = [-122.408452, 37.783308];


export  const convertDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', {month: '2-digit', day: '2-digit', year: 'numeric'})
}

export const eventCardDate = (date: string) => {
    const d = new Date(date)
    if(d === new Date()) {
        return 'Aujourd\'hui'
    } else if ( d > new Date()) {
        return 'Dans ' + (d.getDate() - new Date().getDate()) + ' jours'
    } else {
        return 'Terminé'
    }
}

export const closeAllFilters = () => {

}
