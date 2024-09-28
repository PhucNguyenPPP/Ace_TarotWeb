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

export const GetAllBooking = async (customerId, pageNumber, rowsPerPage, searchValue, filterBookingAsc) => {
    try {
        var url = '';
        if (searchValue !== '') {
            url = `${baseUrl}/api/Booking/bookings-of-customer?cusID=${customerId}&pageNumber=${pageNumber}&rowsPerpage=${rowsPerPage}&bookingDate=true&asc=${filterBookingAsc}&search=${searchValue}`;

        } else {
            url = `${baseUrl}/api/Booking/bookings-of-customer?cusID=${customerId}&pageNumber=${pageNumber}&rowsPerpage=${rowsPerPage}&bookingDate=true&asc=${filterBookingAsc}`;
        }

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