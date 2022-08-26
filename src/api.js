import axios from "axios";

export default async function api(route, params) {
    try {
        const res = await axios.post(`http://localhost:3000/api/v1/${route}`, params);
        return res;
    } catch (error) {
        return error;
    }
}