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

export const GetAllSlotOfSystem = async () => {
    try {
        const url = `${baseUrl}/api/Slot/all-slots`;
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

export const RegisterSlotByTarotReader = async (userId, data) => {
    try {
        const url = `${baseUrl}/api/UserSlot/user-slots?userID=${userId}`;
        const request = {
            method: "POST",
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

export const CreateSlotByAdmin = async (startDate, endDate) => {
    try {
        const url = `${baseUrl}/api/Slot/new-slots?start=${startDate}&end=${endDate}`;
        const request = {
            method: "POST",
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