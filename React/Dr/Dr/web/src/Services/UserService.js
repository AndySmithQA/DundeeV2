import jwtDecode from "jwt-decode";
import {fetchStatus} from "./HTTP";

const TOKEN = "token";

export const ROLE = {PATIENT: "ROLE_PATIENT", DOCTOR: "ROLE_DOCTOR", ADMIN: "ROLE_ADMIN"};

export async function login(username, password, url) {
    const response = await fetch((`${process.env.REACT_APP_API_HOST}${url}`), {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(`${username}:${password}`)
        },
    }).catch(error => {
        if (error.toString().includes("NetworkError")) {
            throw fetchStatus.NETWORK_ERROR;
        } else {
            console.error(`[ERROR] Login failed. URL:${process.env.REACT_APP_API_HOST}${url} Status: ${error.toString()}`);
            throw fetchStatus.SYSTEM_ERROR;
        }
    });

    if (response.ok) {
        sessionStorage.setItem(TOKEN, await response.text());
    } else if (response.status === 401 || response.status === 403) {
        throw fetchStatus.INVALID_CREDENTIALS;
    } else {
        console.error(`[ERROR] Login failed. URL:${process.env.REACT_APP_API_HOST}${url} Status: ${response.status} ${response.errored.message}`);
        throw fetchStatus.SYSTEM_ERROR;
    }
}

export function logout() {
    sessionStorage.clear();
}

export function isLoggedIn(role) {
    try {
        const token = sessionStorage.getItem(TOKEN);
        if (token) {
            const userInfo = jwtDecode(token);
            return userInfo.scope === role;
        } else {
            return false;
        }
    } catch (e) {
        console.log("[INFO] Token verification failed because of", e);
        return false;
    }
}

export function getUserInfo() {
    return jwtDecode(getToken());
}

export function getToken() {
    return sessionStorage.getItem(TOKEN);
}
