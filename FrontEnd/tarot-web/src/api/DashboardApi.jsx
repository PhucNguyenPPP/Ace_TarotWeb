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