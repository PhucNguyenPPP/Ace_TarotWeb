import React, { useEffect, useState } from 'react';
import styles from './forgot-password.module.scss';
import { Button, CircularProgress, Popover, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChangePassword, CheckOtp, SendOtpEmail, VerifyEmail } from '../../../api/AuthenApi';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

function Verify() {
    const [openOtpPopUp, setOpenOtpPopUp] = useState(false)
    const [openResultPopUp, setOpenResultPopUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [buttonSend, setButtonSend] = useState(true);
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user.isVerified) {
            navigate('/');
        }
    }, [user]);

    const handleSendOtpEmail = async () => {
        setIsLoading(true)
        const response = await SendOtpEmail(user.email);
        if (response.ok) {
            setOpenOtpPopUp(true);
            setButtonSend(false);
            toast.success('Gửi OTP thành công')
        } else {
            const responseData = await response.json();
            toast.error("Gửi OTP thất bại: " + responseData.message)
        }
        setIsLoading(false);
    }


    const handleOpenResultPopUp = async () => {
        setIsLoading(true);
        const response = await CheckOtp(user.email, otp);
        if (response.ok) {
            const responseVerify = await VerifyEmail(user.email)
            if (responseVerify.ok) {
                toast.success('Xác thực thành công');
                setOpenOtpPopUp(false);
                setOpenResultPopUp(true);
                navigate("/")
            } else {
                toast.error("Xác thực thất bại")
            }
        } else {
            const responseData = await response.json();
            toast.error("OTP không hợp lệ: " + responseData.message)
        }
        setIsLoading(false);
    }

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    if (!user) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover',
            }}>
            {
                buttonSend && (
                    <div style={{
                        width: 'max-content',
                        padding: '10px 10px',
                        margin: '0 auto'
                    }}>
                        <Button
                            onClick={handleSendOtpEmail}
                            disabled={isLoading}
                            style={{
                                backgroundColor: "#5900E5",
                                color: 'white',
                                padding: '10px 20px',
                                marginTop: '50px'
                            }}>
                            {isLoading ? (
                                <>
                                    <CircularProgress size={24} sx={{ position: 'absolute', color: 'white' }} />
                                    <span style={{ visibility: 'hidden' }}>XÁC THỰC</span>
                                </>
                            ) : (
                                'XÁC THỰC'
                            )}
                        </Button>
                    </div>
                )
            }
            <div className='pt-10'>
                <Popover
                    open={openOtpPopUp}
                    onClose={() => setOpenOtpPopUp(false)}
                    anchorReference="none"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1000,
                        '& .MuiPaper-root': {
                            borderRadius: '10px',
                        }
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                width: '100%',
                            },
                        },
                    }}
                >

                    <div className={styles.container_popup}>
                        <h1 className='text-center pb-5'>XÁC THỰC EMAIL</h1>
                        <p className='text-center pb-5'>Điền mã xác nhận đã gửi đến email của bạn.</p>
                        <div className={styles.search_field}>
                            <p className='pb-3'>Mã xác nhận</p>
                            <TextField id="outlined-basic" variant="outlined"
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    width: '60%',
                                    '& .MuiOutlinedInput-root': {
                                        height: '40px',
                                    }
                                }}
                                onChange={handleOtpChange} />
                        </div>
                        <div className={styles.btn_container}>
                            <button disabled={isLoading} onClick={handleOpenResultPopUp}>
                                {isLoading ? (
                                    <>
                                        <CircularProgress size={24} sx={{ position: 'absolute', color: 'white' }} />
                                        <span style={{ visibility: 'hidden' }}>TIẾP TỤC</span>
                                    </>
                                ) : (
                                    'TIẾP TỤC'
                                )}
                            </button>
                        </div>
                    </div>

                </Popover>

                <Popover
                    open={openResultPopUp}
                    anchorReference="none"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        height: '100%',
                        zIndex: 1000,
                        '& .MuiPaper-root': {
                            borderRadius: '10px',
                        }
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                width: '100%',
                            },
                        },
                    }}
                >
                    <div className={styles.container_popup}>
                        <h1 className='text-center pb-5'>XÁC THỰC EMAIL THÀNH CÔNG</h1>
                        <Button ></Button>
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default Verify;
