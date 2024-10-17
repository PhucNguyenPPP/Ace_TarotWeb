import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { HandlePaymentResponse } from "../../../api/PaymentApi";

function WaitingCheckoutPayOs() {
    const { user } = useAuth();
    const [paymentStatus, setPaymentStatus] = useState("pending");

    useEffect(() => {
        console.log(user);
        const queryParams = window.location.search;
        const cleanQuery = queryParams.replace("?", "");
        const urlParams = new URLSearchParams(cleanQuery);
        const code = urlParams.get("code");
        const orderCode = urlParams.get("orderCode");

        const processPayment = async () => {
            const isSuccess = code === "00";
            const status = isSuccess ? "success" : "fail";
            const data = {
                bookingNumPayOs: orderCode,
                isSuccess: isSuccess
            };

            if (user?.userId) {
                try {
                    const postMethod = await HandlePaymentResponse(data);
                    if (postMethod.ok) {
                        const responseData = await postMethod.json();
                        if (responseData.statusCode === 201) {
                            if (isSuccess) {
                                toast.success("Thanh toán thành công");
                                setTimeout({}, 2000)
                            } else {
                                toast.error("Thanh toán thất bại");
                            }
                        } else {
                            console.log(responseData.message);
                        }
                    } else {
                        console.log("There was an error processing");
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("An unexpected error occurred");
                }
            }

            setPaymentStatus(status);
        };

        processPayment();
    }, [user]);

    return (
        <Container style={{ width: '100%', textAlign: "center", marginTop: '50px', maxHeight:'max-content', minHeight:'100vh' }}>
            {paymentStatus === "success" && (
                <Box className="status-payment flex justify-center">
                    <Alert severity="success" style={{ fontSize: "35px", display: "flex", alignItems: "center" }}>
                        Payment successful
                    </Alert>
                </Box>
            )}

            {paymentStatus === "fail" && (
                <Box className="status-payment flex justify-center">
                    <Alert severity="error" style={{ fontSize: "35px", display: "flex", alignItems: "center" }}>
                        Payment failed
                    </Alert>
                </Box>
            )}

            <Box className="buttonLoading" marginTop={4}>
                <Box className="buttonItem" marginBottom={2}>
                    <Link to="/">
                        <Button variant="contained">Back Home</Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}

export default WaitingCheckoutPayOs;
