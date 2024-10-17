const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllLanguage = async () => {
    try {
        const url = `${baseUrl}/api/Language/Languages`;
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

export const GetAllLanguageOfTarotReader = async (userId) => {
    try {
        const url = `${baseUrl}/api/Language/languages-tarot-reader?userId=${userId}`;
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

export const RegisterLanguageByTarotReader = async (data) => {
    try {
        const url = `${baseUrl}/api/UserLanguage`;
        const request = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const UnregisterLanguageByTarotReader = async (data) => {
    try {
        const url = `${baseUrl}/api/UserLanguage`;
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};