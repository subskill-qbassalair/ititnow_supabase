import axios from "axios";
export async function getEvents() {
    const response = await axios.get('http://localhost:8000/events')
    return response.data;
}
