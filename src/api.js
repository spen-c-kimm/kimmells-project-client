import axios from "axios";

export default async function api(route, params, requiresAuth = false) {
    try {

        if (requiresAuth) {
            const token = localStorage.getItem("token");
            const validation = await axios.post(`http://localhost:3000/api/v1/validateSession`, { token });
            const validated = validation?.success;

            if (!validated) {
                return { validated };
            };
        };

        const res = await axios.post(`http://localhost:3000/api/v1/${route}`, params);
        return res;
    } catch (error) {
        return error;
    }
}