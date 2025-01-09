// import and export token from local storage

import { Token } from "@/api-client/models/Token";
import { DefaultConfig, Configuration } from "@/api-client/runtime";

export const getToken = (): Token | null => {
    try {
        const tokenStr = localStorage.getItem("token");
        if (!tokenStr) return null;
        return JSON.parse(tokenStr) as Token;
    } catch (error) {
        console.error("Error parsing token from localStorage:", error);
        return null;
    }
};

export const setToken = (token: Token): void => {
    try {
        localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
        console.error("Error saving token to localStorage:", error);
        throw error;
    }
};

export const clearToken = (): void => {
    try {
        localStorage.removeItem("token");
    } catch (error) {
        console.error("Error clearing token from localStorage:", error);
        throw error;
    }
};

export const getConfig = (): Configuration => {
    const token = getToken();
    if (token) {
        return new Configuration({ accessToken: "Bearer " + token.accessToken });
    }
    return DefaultConfig;
};
