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

export const GetBookingDetail = async (bookingId) => {
    try {
        const url = `${baseUrl}/api/Booking/booking-detail?bookingId=${bookingId}`;
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

export const CreateFeedback = async (bookingId, ratingStar, feedback) => {
    try {
        const url = `${baseUrl}/api/Booking/create-feedback?bookingId=${bookingId}&behaviorRating=${ratingStar}&behaviorFeedback=${feedback}`;
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

export const CompleteBookingByTarotReader = async (bookingId) => {
    try {
        const url = `${baseUrl}/api/Booking/complete-booking-tarot-reader?bookingId=${bookingId}`;
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

export const CompleteBookingByCustomer = async (bookingId) => {
    try {
        const url = `${baseUrl}/api/Booking/complete-booking-customer?bookingId=${bookingId}`;
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

export const SendRequestComplaint = async (bookingId, complaintDescription, uploadedImages) => {
    try {
        const formData = new FormData();
        formData.append('BookingId', bookingId);
        formData.append('ComplaintDescription', complaintDescription);
        uploadedImages.forEach((image, index) => {
            formData.append(`ImageLink`, image);
        });

        const url = `${baseUrl}/api/Booking/create-complaint`;
        const request = {
            method: "POST",
            body: formData
        };
        const response = await fetch(url, request);
        return response;
    } catch (err) {
        console.log(err);
    }
};