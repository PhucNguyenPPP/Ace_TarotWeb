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

export const RegisterCustomer = (data) => {
    const formData = new FormData();
    formData.append('UserName', data.username);
    formData.append('Password', data.password);
    formData.append('FullName', data.fullName);
    formData.append('Phone', data.phone);
    formData.append('Address', data.address);
    formData.append('Email', data.email);
    formData.append('DateOfBirth', data.dateOfBirth);
    formData.append('Gender', data.Gender);
    formData.append('AvatarLink', data.avatar[0]);

    const url = `${baseUrl}/api/Auth/new-customer`;
    const request = {
        method: 'POST',
        body: formData,
        headers: {
            'accept': '*/*',
        },
    };

    return fetch(url, request)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

export const RegisterTarotReader = (data) => {
    const formData = new FormData();
    formData.append('UserName', data.username);
    formData.append('Password', data.password);
    formData.append('FullName', data.fullName);
    formData.append('Phone', data.phone);
    formData.append('Address', data.address);
    formData.append('Email', data.email);
    formData.append('DateOfBirth', data.dateOfBirth);
    formData.append('Gender', data.Gender);
    formData.append('AvatarLink', data.avatar[0]);
    formData.append('Experience', data.experience);
    formData.append('Description', data.description);
    formData.append('NickName', data.nickname);
    formData.append('Quote', data.quote);
    formData.append('MeetLink', data.meetLink);

    const url = `${baseUrl}/api/Auth/new-reader`;
    const request = {
        method: 'POST',
        body: formData,
        headers: {
            'accept': '*/*',
        },
    };

    return fetch(url, request)
        .then(response => {
            return response;
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

export const SendOtpEmail = async (email) => {
    try {
        const url = `${baseUrl}/api/Email/otp-email?email=${email}`;
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

export const CheckOtp = async (email, otp) => {
    try {
        const url = `${baseUrl}/otp-verifying?email=${email}&otp=${otp}`;
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

export const ChangePassword = async (password, confirmedPassword, email) => {
    try {
        const url = `${baseUrl}/api/Auth/password`;
        const bodyJson = {
            password: password,
            confirmedPassword: confirmedPassword,
            email: email
        };
        console.log(bodyJson)
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyJson)
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const Logout = async (refreshToken) => {
    try {
        const url = `${baseUrl}/api/Auth/logout?rfToken=${refreshToken}`;
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
            },
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const VerifyEmail = async (email) => {
    try {
        const url = `${baseUrl}/api/Auth/verify-email?email=${email}`;
        const request = {
            method: "PUT",
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