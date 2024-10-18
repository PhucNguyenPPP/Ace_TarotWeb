const baseUrl = import.meta.env.VITE_API_HOST;

export const GetServiceTypeOfTarotReader = async (userId) => {
    try {
        const url = `${baseUrl}/api/UserServiceType/user_service_type?userId=${userId}`;
        const request = {
            method: "GET",
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

export const GetServiceTypeOfSystem = async () => {
    try {
        const url = `${baseUrl}/api/Service/system_service_type`;
        const request = {
            method: "GET",
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

export const GetServiceOfServiceType = async (serviceTypeId) => {
    try {
        const url = `${baseUrl}/api/Service/Service?serviceTypeId=${serviceTypeId}`;
        const request = {
            method: "GET",
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

export const RegisterServiceByTarotReader = async (userId, serviceTypeId) => {
    try {
        const url = `${baseUrl}/api/UserServiceType/user_service_type?userID=${userId}&serviceTypeId=${serviceTypeId}`;
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

export const RemoveServiceByTarotReader = async (userId, serviceTypeId) => {
    try {
        const url = `${baseUrl}/api/UserServiceType/user_service_type?userID=${userId}&serviceTypeId=${serviceTypeId}`;
        const request = {
            method: "DELETE",
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