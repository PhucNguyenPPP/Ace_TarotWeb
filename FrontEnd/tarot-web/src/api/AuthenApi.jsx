const baseUrl = import.meta.env.VITE_API_HOST;

export const SignIn = async (value) => {
    try {
        const url = `${baseUrl}/api/Auth/sign-in`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify(value)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const RegisterCustomer = async (formData) => {
    try {
        const response = await fetch(`${baseUrl}/api/Auth/new-customer`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: formData,
        });
        if (!response.ok) {
            console.error('There was a problem with API')
        }
        return response;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
};

export const RefreshToken = (accessToken, refreshToken) => {
    const url = `${baseUrl}/api/Auth/refresh-token`;
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ accessToken, refreshToken })
    };

    return fetch(url, request)
        .then(response => {
            if (!response.ok) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                throw new Error('Failed to refresh token');
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            return;
        });
};

export const GetUserByToken = (refreshToken) => {
    const url = `${baseUrl}/user/access-token/${refreshToken}`;
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        },
    };

    return fetch(url, request)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed');
            }
            return response.json();
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};