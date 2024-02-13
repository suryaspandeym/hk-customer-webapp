import { getUnixTime, format, isValid } from "date-fns";

import { Routes } from "./enums";
import { removeItems } from "./local-storage";
import { TOKEN_KEY, TOKEN_THRESHOLD_KEY } from "./constants";

export const getAccessToken = (): string => localStorage.getItem(TOKEN_KEY) ?? "";

export const isLoggedIn = (): boolean => {
    const threshold = Number(localStorage.getItem(TOKEN_THRESHOLD_KEY));

    if (!threshold) {
        return false;
    }

    const now = getUnixTime(new Date());

    if (now >= threshold) {
        removeItems();

        window.location.href = Routes.LOGIN;

        return false;
    }

    //   const state =
    //   String(localStorage.getItem("IS_LOGGED_IN")).toLowerCase() === "true";

    return !!getAccessToken() && window.location.pathname !== Routes.LOGIN;
};

export const saveLocale = (locale: string): void => {
    localStorage.setItem("locale", locale);
};

export const setDocumentLang = (locale: string): void => {
    document.documentElement.setAttribute("lang", locale);
};

export const renderAddress = (address: any) => {
    let addr = ``;
    // if (address.addressLine1) {
    // }
    // if (address.addressLine2) {
    // }
    // if (address,)
    addr += address.addressLine1;
    addr += ", " + address.addressLine2;
    addr += ", " + address.district;
    addr += ", " + address.city;
    addr += ", " + address.state;
    addr += ", " + address.country;
    addr += ", " + address.pincode;

    return addr;
};



export const timestampToFormattedDate = (timestamp: number | string | undefined, dateFormat: string) => {
    return timestamp !== undefined && isValid(timestamp) ? format(new Date(timestamp), dateFormat) : "";
};

export const goBack = (navigate: any) => {
    navigate("..", { relative: "path" });
};
