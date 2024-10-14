import React, { useState, useEffect } from 'react';
import { CircularProgress, Modal, Box, TextField, Button, FormControl, InputLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';
import useAuth from '../../../hooks/useAuth';
import styles from './profile.module.scss';
import { UpdateUser } from '../../../api/UserApi';
import { toast } from 'react-toastify';

function Profile() {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const maxDate = getTodayDate();

    const fetchUserDetail = async () => {
        setIsLoading(true);
        const response = await GetTarotReaderDetail(user.userId);
        if (response.ok) {
            const responseData = await response.json();
            const formattedData = {
                ...responseData.result,
                dateOfBirth: formatDate(responseData.result.dateOfBirth) || getTodayDate(), // Format the date or use today's date if undefined
            };
            setUserData(formattedData);
            reset(formattedData); // Populate the form with existing user data
        } else {
            throw new Error('Failed to fetch user detail');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user) {
            fetchUserDetail();
        }
    }, [user, reset]);

    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);

    const onSubmit = async (data) => {
        const dataParse = {
            userId: user.userId,
            fullName: data.fullName,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            phone: data.phone,
            address: data.address,
            gender: data.gender,
        }
        console.log(dataParse)
        setIsLoading(true);
        const response = await UpdateUser(dataParse);
        if (response.ok) {
            toast.success("Cập nhật tài khoản thành công")
            fetchUserDetail();
        } else {
            toast.error("Cập nhật tài khoản thất bại")
        }
        setIsLoading(false);
        handleCloseEditModal();
    };

    if (isLoading || !userData) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div
            style={{
                height: 'max-content',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover'
            }}>
            <div className='text-white text-3xl font-bold text-center pt-5 pb-5'
                style={{
                    backgroundColor: '#5900E5'
                }}>
                <h1>TÀI KHOẢN</h1>
            </div>
            <div className='flex pt-14 text-white'>
                <div className='w-full md:w-1/2 pb-10'>
                    <img className={styles.avatar} src={userData.avatarLink} alt="Avatar"></img>
                    <h1 className='text-3xl font-bold text-center pt-5'>{userData.userName}</h1>
                    <div className={styles.container_info}>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Tên:</p>
                            <p className={styles.detail_info}>{userData.fullName}</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Ngày sinh:</p>
                            <p className={styles.detail_info}>{userData.dateOfBirth}</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Giới tính:</p>
                            <p className={styles.detail_info}>{userData.gender}</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Email:</p>
                            <p className={styles.detail_info}>{userData.email}</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Số điện thoại:</p>
                            <p className={styles.detail_info}>{userData.phone}</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Địa chỉ:</p>
                            <p className={styles.detail_info}>{userData.address}</p>
                        </div>
                    </div>
                    <div className={styles.container_btn}>
                        <a onClick={handleOpenEditModal}>Chỉnh sửa tài khoản</a><br />
                    </div>
                    <div className={styles.container_btn}>
                        <a>Quên mật khẩu</a><br />
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex items-center'>
                    <div className='w-full'>
                        <div className={styles.option_container}>
                            <a href='/booking-list'>LỊCH HẸN</a>
                        </div>
                        <div className={styles.option_container}>
                            <a href='/signup-tarot-reader'>TRỞ THÀNH TAROT READER</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            <Modal open={openEditModal} onClose={handleCloseEditModal}>
                <Box
                    sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: '10px'
                    }}
                >
                    <h2>Chỉnh sửa tài khoản</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="fullName"
                            control={control}
                            rules={{
                                required: 'Vui lòng nhập họ và tên',
                                minLength: {
                                    value: 8,
                                    message: 'Họ và tên phải có ít nhất 8 ký tự'
                                },
                                pattern: {
                                    value: /^[\p{L}]+([\s\p{L}]+)*$/u,
                                    message: 'Họ và tên không hợp lệ',
                                }
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Tên"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="dateOfBirth"
                            control={control}
                            rules={{
                                required: 'Vui lòng nhập ngày sinh',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ngày sinh"
                                    fullWidth
                                    type="date"
                                    margin="normal"
                                    error={!!errors.dateOfBirth}
                                    helperText={errors.dateOfBirth?.message}
                                    inputProps={{
                                        max: maxDate,
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Vui lòng nhập email',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Email không hợp lệ',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: 'Vui lòng nhập số điện thoại',
                                pattern: {
                                    value: /^0\d{9}$/,
                                    message: 'Số điện thoại không hợp lệ',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Số điện thoại"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            rules={{
                                required: 'Vui lòng nhập địa chỉ'
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Địa chỉ"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                />
                            )}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel shrink>
                                Giới tính
                            </InputLabel>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                        <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                                    </RadioGroup>
                                )}
                            />
                        </FormControl>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#5900E5', color: 'white' }} fullWidth>
                            Cập nhật
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Profile;
