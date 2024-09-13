import React, { useState } from 'react';
import styles from './forgot-password.module.scss';
import { Popover, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChangePassword, CheckOtp, SendOtpEmail } from '../../../api/AuthenApi';
import { toast } from 'react-toastify';

function ForgotPassword() {
    const [openOtpPopUp, setOpenOtpPopUp] = useState(false)
    const [openChangePasswordPopUp, setOpenChangePasswordPopUp] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false)
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    const handleOpenOtpPopUp = async () => {
        setButtonDisable(true);
        const response = await SendOtpEmail(email);
        if (response.ok) {
            setOpenOtpPopUp(true)
            const responseData = await response.json();
            toast.success('Gửi OTP thành công')
        } else {
            const responseData = await response.json();
            toast.error("Gửi OTP thất bại: " + responseData.message)
        }
        setButtonDisable(false);
    }

    const handleOpenChangePasswordPopUp = async () => {
        setButtonDisable(true);
        const response = await CheckOtp(email, otp);
        if (response.ok) {
            toast.success('OTP hợp lệ');
            setOpenOtpPopUp(false);
            setOpenChangePasswordPopUp(true);
        } else {
            const responseData = await response.json();
            toast.error("OTP không hợp lệ: " + responseData.message)
        }
        setButtonDisable(false);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError('Mật khẩu phải có ít nhất 1 ký tự đặc biệt và ít nhất 8 ký tự ');
        }else {
            setPasswordError('');
        }
    };

    const validateConfirmPassword = (value) => {
        if (value !== password) {
            setConfirmPasswordError('Mật khẩu không khớp');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleChangePassword = async () => {
        setButtonDisable(true);
        const response = await ChangePassword(password, confirmPassword, email);
        if (response.ok) {
            toast.success('Đổi mật khẩu thành công');
            setOpenChangePasswordPopUp(false);
        } else {
            const responseData = await response.json();
            toast.error("Đổi mật khẩu thất bại: " + responseData.message)
        }
        setButtonDisable(false);
    }


    return (
        <div
            style={{
                height: '100vh',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover',
            }}>
            <div className='pt-10'>
                <div className={styles.container}>
                    <h1 className='text-center pb-5'>ĐỔI MẬT KHẨU</h1>
                    <p className='text-center pb-5'>Điền email gắn với tài khoản của bạn để nhận mã xác nhận qua email.</p>
                    <div className={styles.search_field}>
                        <p className='pb-3'>Email</p>
                        <TextField id="outlined-basic" variant="outlined"
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                width: '60%',
                                '& .MuiOutlinedInput-root': {
                                    height: '40px',
                                }
                            }}
                            onChange={handleEmailChange} />
                    </div>
                    <div className={styles.btn_container}>
                        <button onClick={handleOpenOtpPopUp} disabled={buttonDisable} >Tiếp tục</button>
                        <button onClick={handleBack}>Hủy</button>
                    </div>
                </div>

                {openOtpPopUp && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999
                        }}
                        onClick={() => setOpenOtpPopUp(false)}
                    />
                )}

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
                        <h1 className='text-center pb-5'>ĐỔI MẬT KHẨU</h1>
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
                            <button onClick={handleOpenChangePasswordPopUp}>Tiếp tục</button>
                            <button onClick={() => setOpenOtpPopUp(false)}>Quay lại</button>
                        </div>
                    </div>

                </Popover>

                {openChangePasswordPopUp && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999, // Make sure it's on top
                        }}
                        onClick={() => setOpenChangePasswordPopUp(false)}
                    />
                )}

                <Popover
                    open={openChangePasswordPopUp}
                    onClose={() => setOpenChangePasswordPopUp(false)}
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
                        <h1 className='text-center pb-5'>ĐỔI MẬT KHẨU</h1>
                        <p className='text-center pb-5'>Điền mật khẩu mới.</p>

                        <div className={styles.search_field}>
                            <p className='pb-3'>Mật khẩu mới</p>
                            <TextField
                                id="outlined-password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                error={Boolean(passwordError)}
                                helperText={passwordError}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    width: '60%',
                                    '& .MuiOutlinedInput-root': {
                                        height: '40px',
                                    }
                                }}
                            />
                        </div>

                        <div className={styles.search_field}>
                            <p className='pb-3'>Nhập lại mật khẩu mới</p>
                            <TextField
                                id="outlined-confirm-password"
                                variant="outlined"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    validateConfirmPassword(e.target.value);
                                }}
                                error={Boolean(confirmPasswordError)}
                                helperText={confirmPasswordError}
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    width: '60%',
                                    '& .MuiOutlinedInput-root': {
                                        height: '40px',
                                    }
                                }}
                            />
                        </div>

                        <div className={styles.btn_container}>
                            <button disabled={passwordError || confirmPasswordError} onClick={handleChangePassword}>Xác nhận</button>
                            <button onClick={() => setOpenChangePasswordPopUp(false)}>Hủy</button>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    );
}

export default ForgotPassword;
