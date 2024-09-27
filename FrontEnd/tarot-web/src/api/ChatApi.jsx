const baseUrl = import.meta.env.VITE_API_HOST;

export const GetMessage = async (user1, user2) => {
    try {
        const url = `${baseUrl}/api/Message/messages?user1=${user1}&user2=${user2}`;
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

export const SendMessage = async (data) => {
    try {
        const url = `${baseUrl}/api/Message/message`;
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

export const GetAllChatUsers = async (userId) => {
    try {
        const url = `${baseUrl}/api/Message/chat-users?userId=${userId}`;
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