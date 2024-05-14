import axios from 'axios';
// @ts-ignore
import { GOOGLE_PLACES_API_KEY } from "@env";

interface QueryKey {
    distance: number;
    price: number;
    cuisineType: string;
    latitude: number;
    longitude: number;
}

interface Restaurant {
    rating: number;
}


const getNearbyRestaurants = async ({queryKey}: {QueryKey: QueryKey}) => {
    const [key, { distance, price, cuisineType, latitude, longitude }] = queryKey;
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${latitude},${longitude}`,
                radius: distance,
                type: 'restaurant',
                keyword: cuisineType,
                key: GOOGLE_PLACES_API_KEY,
                opennow: false,
                price_level: price,
            }
        })

        const allRestaurants = response.data.results;
        const filteredRestaurants = allRestaurants.filter((restaurant: Restaurant) =>
            restaurant.rating >= 4 );

        // console.log("filteredRestaurants: ", filteredRestaurants)

        return filteredRestaurants;
    } catch (e) {
        console.log(e)
    }
}

export default getNearbyRestaurants;
