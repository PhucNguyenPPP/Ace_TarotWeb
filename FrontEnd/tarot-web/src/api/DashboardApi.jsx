const baseUrl = import.meta.env.VITE_API_HOST;

export const GetRevenueByAdmin = async (startDate, endDate, roleId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/revenue?startdate=${startDate}&enddate=${endDate}&roleid=${roleId}`;
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

export const GetProfitByAdmin = async (startDate, endDate, roleId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/profit?startdate=${startDate}&enddate=${endDate}&roleid=${roleId}`;
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

export const GetProfitOfCurrentYearByAdmin = async (currentYear, roleId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/profit-of-month?year=${currentYear}&roleid=${roleId}`;
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

export const GetTotalBookingByAdmin = async (startDate, endDate) => {
    try {
        const url = `${baseUrl}/api/Dashboard/total-booking-created?startdate=${startDate}&enddate=${endDate}&roleName=Admin`;
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

export const GetTotalCompletedBookingByAdmin = async (startDate, endDate) => {
    try {
        const url = `${baseUrl}/api/Dashboard/total-booking-completed?startdate=${startDate}&enddate=${endDate}&roleName=Admin`;
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

export const GetAmountTarotReaderByAdmin = async () => {
    try {
        const url = `${baseUrl}/api/Dashboard/total-user?role=Tarot%20Reader`;
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

export const GetAmountCustomerByAdmin = async () => {
    try {
        const url = `${baseUrl}/api/Dashboard/total-user?role=Customer`;
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

export const GetRevenueByTarotReader = async (startDate, endDate, roleId, tarotReaderId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/revenue?startdate=${startDate}&enddate=${endDate}&roleid=${roleId}&tarotReaderId=${tarotReaderId}`;
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

export const GetProfitByTarotReader = async (startDate, endDate, roleId, tarotReaderId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/profit?startdate=${startDate}&enddate=${endDate}&roleid=${roleId}&tarotReaderId=${tarotReaderId}`;
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

export const GetProfitOfCurrentYearByTarotReader = async (currentYear, roleId, tarotReaderId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/profit-of-month?year=${currentYear}&roleid=${roleId}&tarotReaderId=${tarotReaderId}`;
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

export const GetTotalBookingByTarotReader = async (startDate, endDate, tarotReaderId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/total-booking-created?startdate=${startDate}&enddate=${endDate}&roleName=Tarot%20Reader&tarotReaderId=${tarotReaderId}`;
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

export const GetTotalCompletedBookingByTarotReader = async (startDate, endDate, tarotReaderId) => {
    try {
        const url = `${baseUrl}/api/Dashboard/total-booking-completed?startdate=${startDate}&enddate=${endDate}&roleName=Tarot%20Reader&tarotReaderId=${tarotReaderId}`;
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