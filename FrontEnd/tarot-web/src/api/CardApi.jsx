import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_HOST;

export const GetRandomCardList = async (cardTypeId) => {
    try {
        const url = `${baseUrl}/api/Card/GetRandomCard?cardType=${cardTypeId}`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const GetMeaningCard = async (topicId, requestBody) => {
    try {
        const url = `${baseUrl}/api/CardPosition/meanings?topicId=${topicId}`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const GetAllCardType = async () => {
    try {
        const url = `${baseUrl}/api/CardType/card-types`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const GetAllTopic = async () => {
    try {
        const url = `${baseUrl}/api/Topic/topics`;
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};