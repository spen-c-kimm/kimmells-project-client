import axios from "axios";

export default async function api(route, params, requiresAuth = false, method = "post") {
    try {

        if (requiresAuth) {
            const token = localStorage.getItem("token");
            const validation = await axios.post(`http://52.86.154.61:20003/api/v1/validateSession`, { token });
            const srvData = validation?.data;

            if (!srvData.success) {
                return { authenticated: false };
            };
        };

        const res = await axios[method](`http://52.86.154.61:20003/api/v1/${route}`, params);

        if (res) {
            res.authenticated = true
        }

        return res;
    } catch (error) {
        return error;
    }
}