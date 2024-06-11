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

    // const lat = 37.7749
    // const long = -122.4194

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
            params: {
                location: `${latitude},${longitude}`,
                radius: distance,
                type: 'restaurant',
                keyword: "chicken",
                key: GOOGLE_PLACES_API_KEY,
                opennow: false,
                price_level: price,
            }
        })

        const allRestaurants = response.data.results;
        const filteredRestaurants = allRestaurants.filter((restaurant: Restaurant) =>
            restaurant.rating >= 4 );

        const shuffleArray = (array: []) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledRestaurants = shuffleArray(filteredRestaurants);
        const selectedRestaurants = shuffledRestaurants.slice(0, 5);

        return selectedRestaurants;
    } catch (e) {
        console.log(e)
    }
}

export default getNearbyRestaurants;
