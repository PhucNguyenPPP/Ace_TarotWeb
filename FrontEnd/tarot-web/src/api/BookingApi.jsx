const baseUrl = import.meta.env.VITE_API_HOST;

export const CreateBooking = async (data) => {
    try {
        const url = `${baseUrl}/api/Booking/new-booking`;
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