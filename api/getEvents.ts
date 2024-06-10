import axios from "axios";
export async function getEvents() {
    const response = await axios.get(`${process.env.API_URL}/events`)
    return response.data;
}

export async function getNextEvent() {
    const response = await axios.get(`${process.env.API_URL}/events/nextEvent`)
    return response.data;
}
