const baseUrl = import.meta.env.VITE_API_HOST;

export const GetDateHasSlotOfMonth = async (year, month, userId) => {
    try {
        const url = `${baseUrl}/api/UserSlot/dates-of-month?year=${year}&month=${month}&userID=${userId}`;
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

export const GetSlotOfDate = async (date, userId) => {
    try {
        const url = `${baseUrl}/api/UserSlot/slots-of-date?date=${date}&userID=${userId}`;
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