const baseUrl = import.meta.env.VITE_API_HOST;

export const UpdateUser = async (data) => {
    try {
        const url = `${baseUrl}/api/User/updated-user`;
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

export const UpdateIntroTarotReader = async (data) => {
    try {
        const url = `${baseUrl}/api/User/updated-tarot-reader`;
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