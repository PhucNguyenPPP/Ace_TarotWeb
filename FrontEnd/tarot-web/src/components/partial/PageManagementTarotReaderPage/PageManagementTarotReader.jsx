import React, { useState } from 'react';
import { Button, CircularProgress, Avatar, Box, Typography, IconButton, Modal, TextField, FormControl, RadioGroup, FormControlLabel, InputLabel, Radio } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './PageManagementTarotReader.module.scss'; // Import the SCSS module
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';
import { Controller, useForm } from 'react-hook-form';
import { UpdateIntroTarotReader, UpdateUser } from '../../../api/UserApi';
import { toast } from 'react-toastify';

function PageManagementTarotReader() {
    const [isLoading, setIsLoading] = useState(false);
    const [tarotReaderData, setTarotReaderData] = useState(null);
    const [openEditInfoModal, setOpenEditInfoModal] = useState(false);
    const [openEditIntroModal, setOpenEditIntroModal] = useState(false);
    const { user } = useAuth();
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

    const handleOpenEditInfoModal = () => setOpenEditInfoModal(true);
    const handleCloseEditInfoModal = () => setOpenEditInfoModal(false);

    const handleOpenEditIntroModal = () => setOpenEditIntroModal(true);
    const handleCloseEditIntroModal = () => setOpenEditIntroModal(false);

    const fetchTarotReaderDetail = async () => {
        setIsLoading(true);
        const response = await GetTarotReaderDetail(user.userId);
        if (response.ok) {
            const responseData = await response.json();
            setTarotReaderData(responseData.result);
            const formattedData = {
                ...responseData.result,
                dateOfBirth: formatDate(responseData.result.dateOfBirth) || getTodayDate(),
            };
            reset(formattedData);
        } else {
           console.log('Failed to fetch tarot reader detail');
        }
        setIsLoading(false);
    };

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
            fetchTarotReaderDetail();
        } else {
            toast.error("Cập nhật tài khoản thất bại")
        }
        setIsLoading(false);
        handleCloseEditInfoModal();
    };

    const onSubmitIntro = async (data) => {
        const dataParse = {
            userId: user.userId,
            experience: data.experience,
            description: data.description,
            nickName: data.nickName,
            quote: data.quote,
            meetLink: data.meetLink,
        }
        console.log(dataParse);
        setIsLoading(true);
        const response = await UpdateIntroTarotReader(dataParse);
        if (response.ok) {
            toast.success("Cập nhật giới thiệu thành công");
            fetchTarotReaderDetail();
        } else {
            toast.error("Cập nhật giới thiệu thất bại");
        }
        setIsLoading(false);
        handleCloseEditIntroModal();
    };

    useEffect(() => {
        if (user) {
            fetchTarotReaderDetail();
        }
    }, [user]);

    if (isLoading || !tarotReaderData) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <Box className={styles.pageContainer}>
            {/* Profile Header */}
            <Box className={styles.profileHeader}>
                {/* Cover Image */}
                <Box
                    className={styles.coverImage}
                    style={{
                        backgroundImage: 'url("/image/coverTarotReader.png")',
                    }}
                >
                </Box>

                {/* Profile Picture */};
                <div className='z-50 flex'>
                    <img
                        alt="Profile Picture"
                        src={tarotReaderData.avatarLink}
                        className={styles.avatar}
                    />

                    {/* Name and Booking Info */}
                    <Typography variant="h5" style={{ fontWeight: 'bold', marginLeft: '30px', marginTop: '30px' }}>
                        {tarotReaderData.userName}
                    </Typography>
                </div>

            </Box>

            {/* Info Sections */}
            <div className={styles.infoSection}>
                {/* Left Section - Introduction */}
                <div className={styles.infoBox}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p variant="h6" className={styles.infoTitle}>Giới Thiệu</p>
                        <IconButton style={{ marginTop: '-15px' }} aria-label="edit" onClick={handleOpenEditIntroModal}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <p className={styles.quote} variant="body2">
                        {tarotReaderData.quote}
                    </p>
                    <p className='font-bold ml-2 mb-3 w-full' variant="body2"> Kinh nghiệm: <span className='font-normal'> {tarotReaderData.experience} năm</span></p>
                    <p className='font-bold ml-2 mb-3 w-full' variant="body2"> Nick name: <span className='font-normal'> {tarotReaderData.nickName}</span></p>
                    <p className='font-bold ml-2 mb-3 w-full' variant="body2"> Meet Link: <span className='font-normal'> {tarotReaderData.meetLink}</span></p>
                    <p variant="body2" className={styles.textSecondary}>
                        {tarotReaderData.description}
                    </p>
                </div>

                {/* Right Section - Account Info */}
                <div className={styles.infoBox}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p variant="h6" className={styles.infoTitle}>Thông Tin Tài Khoản</p>
                        <IconButton style={{ marginTop: '-20px' }} aria-label="edit" onClick={handleOpenEditInfoModal}>
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Tên:</p>
                        <p className={styles.infoValue}>{tarotReaderData.fullName}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Ngày sinh:</p>
                        <p className={styles.infoValue}>{formatDate(tarotReaderData.dateOfBirth)}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Giới tính:</p>
                        <p className={styles.infoValue}>{tarotReaderData.gender}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Số điện thoại:</p>
                        <p className={styles.infoValue}>{tarotReaderData.phone}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Emal:</p>
                        <p className={styles.infoValue}>{tarotReaderData.email}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Địa chỉ:</p>
                        <p className={styles.infoValue}>{tarotReaderData.address}</p>
                    </div>
                    <div className={styles.infoItem}>
                        <p className={styles.infoLabel}>Vai trò:</p>
                        <p className={styles.infoValue}>Tarot Reader</p>
                    </div>
                </div>
            </div>

            <Modal open={openEditInfoModal} onClose={handleCloseEditInfoModal}>
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

             {/* Modal for Editing Introduction (New Modal) */}
             <Modal open={openEditIntroModal} onClose={handleCloseEditIntroModal}>
                <Box
                    sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: 400, bgcolor: 'background.paper', p: 4, boxShadow: 24, borderRadius: '10px'
                    }}
                >
                    <h2>Chỉnh sửa giới thiệu</h2>
                    <form onSubmit={handleSubmit(onSubmitIntro)}>
                        {/* Experience */}
                        <Controller
                            name="experience"
                            control={control}
                            rules={{ required: 'Vui lòng nhập số năm kinh nghiệm' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Kinh nghiệm (năm)"
                                    type="number"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.experience}
                                    helperText={errors.experience?.message}
                                    inputProps={{ min: 1, max: 100 }}
                                />
                            )}
                        />

                        {/* Nickname */}
                        <Controller
                            name="nickName"
                            control={control}
                            rules={{ required: 'Vui lòng nhập nickname' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Nick name"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.nickName}
                                    helperText={errors.nickName?.message}
                                />
                            )}
                        />

                        {/* Quote */}
                        <Controller
                            name="quote"
                            control={control}
                            rules={{ required: 'Vui lòng nhập châm ngôn' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Châm ngôn"
                                    multiline
                                    maxRows={2}
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.quote}
                                    helperText={errors.quote?.message}
                                />
                            )}
                        />

                        {/* Meet Link */}
                        <Controller
                            name="meetLink"
                            control={control}
                            rules={{ required: 'Vui lòng nhập Meet link' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Meet Link"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.meetLink}
                                    helperText={errors.meetLink?.message}
                                />
                            )}
                        />

                        {/* Description */}
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: 'Vui lòng nhập mô tả' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Mô tả"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    maxRows={5}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            )}
                        />

                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>
                            {isLoading ? <CircularProgress size={24} /> : 'Lưu thay đổi'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
}

export default PageManagementTarotReader;
