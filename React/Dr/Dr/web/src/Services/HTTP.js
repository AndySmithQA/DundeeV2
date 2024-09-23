import {getToken} from "./UserService";

export const httpMethod = {POST: "POST", GET: "GET", PATCH: "PATCH", PUT: "PUT", DELETE: "DELETE"};
export const fetchStatus = {
    LOADING: "LOADING",
    SAVING: "SAVING",
    WAITING: "WAITING",
    NETWORK_ERROR: "NETWORK",
    INVALID_CREDENTIALS: "INVALID CREDENTIALS",
    SYSTEM_ERROR: "SYSTEM ERROR",
    SUCCESS: "SUCCESS",
    NOT_FOUND: "NOT FOUND",
    CONFLICT: "CONFLICT"
};

export const api = async (method, url, data, alternativeToken) => {
    const fetchOptions = {
        method: method,
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=UTF-8"
        }
    };

    if (getToken()) {
        fetchOptions.headers.Authorization = `Bearer ${getToken()}`;
    } else if (alternativeToken) {
        fetchOptions.headers.Authorization = `Bearer ${alternativeToken}`;
    }

    if (method !== httpMethod.GET && data) {
        fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(`${process.env.REACT_APP_API_HOST}${url}`, fetchOptions
    ).catch(error => {
        console.error("[ERROR] ", error);
        if (error.toString().includes("NetworkError")) {
            throw fetchStatus.NETWORK_ERROR;
        } else {
            throw fetchStatus.SYSTEM_ERROR;
        }
    });

    if (response.ok) {
        try {
            const contentType = response.headers.get("content-type");
            return contentType?.indexOf("application/json") !== -1
                ? await response.json()
                : await response.text();
        } catch (e) {
            console.warn("[WARN] Error while parsing content.  Likely because of empty body.", e);
        }
    } else {
        console.error(`[ERROR] ${response.status} : ${response.errored?.message}`);
        switch (response.status) {
            case 401 :
            case 403 :
                throw fetchStatus.INVALID_CREDENTIALS;
            case 404:
                throw fetchStatus.NOT_FOUND;
            case 409:
                throw fetchStatus.CONFLICT;
            default:
                throw fetchStatus.SYSTEM_ERROR;
        }
    }
};