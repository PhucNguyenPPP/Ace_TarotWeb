const baseUrl = import.meta.env.VITE_API_HOST;

export const GetAllFormMeeting = async () => {
    try {
        const url = `${baseUrl}/api/FormMeeting/form_meetings`;
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

export const GetAllFormMeetingOfTarotReader = async (userId) => {
    try {
        const url = `${baseUrl}/api/FormMeeting/form-meetings-tarot-reader?userId=${userId}`;
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


export const RegisterFormMeetingByTarotReader = async (userId, formMeetingId) => {
    try {
        const url = `${baseUrl}/api/FormMeeting/user_service_type?userID=${userId}&formMeetingId=${formMeetingId}`;
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

export const UnregisterFormMeetingByTarotReader = async (userId, formMeetingId) => {
    try {
        const url = `${baseUrl}/api/FormMeeting/user_service_type?userID=${userId}&formMeetingId=${formMeetingId}`;
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