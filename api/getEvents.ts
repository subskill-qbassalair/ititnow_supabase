import axios from "axios";
export async function getEvents() {
    console.log('here')
    const response = await axios.get(`${process.env.API_URL}/events`)
    console.log(response.data)
    if(!response.data) {
        console.log('no data')
    }
    return response.data;
}

export async function getNextEvent() {
    const response = await axios.get(`${process.env.API_URL}/events/nextEvent`)
    return response.data;
}
