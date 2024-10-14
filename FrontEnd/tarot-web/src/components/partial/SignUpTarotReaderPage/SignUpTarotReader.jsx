import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box, InputLabel, FormControl, Input, MenuItem, Select, FormControlLabel, Radio, RadioGroup, TextareaAutosize, CircularProgress } from '@mui/material';
import { RegisterTarotReader } from '../../../api/AuthenApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUpTarotReader = () => {
    const { handleSubmit, control, register, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const maxDate = getTodayDate();
    const onSubmit = async (data) => {
        setIsLoading(true);
        const response = await RegisterTarotReader(data);
        if (response.ok) {
            const responseData = await response.json();
            setErrorMessage('')
            toast.success('Đăng kí thành công')
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            const responseData = await response.json();
            setErrorMessage(responseData.message)
            toast.error("Đăng kí thất bại: " + responseData.message)
        }
        setIsLoading(false);
    };

    return (
        <div
            style={{
                height: 'max-content',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                minHeight: '100vh' // Ensure it takes full viewport height
            }}
        >

            <Box
                sx={{
                    maxWidth: '50%',
                    mx: 'auto',
                    mt: 5,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center content horizontally
                }}
            >
                <img className='w-40' src='image/logo.png' alt='Logo' />
                <Typography variant="h5" align="center" gutterBottom fontWeight='bold'>
                    ĐĂNG KÍ TAROT READER
                </Typography>
                {errorMessage && (
                    <Typography color='red' gutterBottom>
                        * {errorMessage}
                    </Typography>)}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormControl fullWidth margin="normal">
                        <InputLabel shrink>
                            Ảnh đại diện
                        </InputLabel>
                        <Controller
                            name="avatar"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...register("avatar", {
                                        required: "Vui lòng chọn ảnh đại diện",
                                    })}
                                    type="file"
                                    id="avatar"
                                />
                            )}
                        />
                    </FormControl>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập tên tài khoản',
                            minLength: {
                                value: 5,
                                message: 'Tên tài khoản phải có ít nhất 5 ký tự'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Tên tài khoản"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập mật khẩu',
                            minLength: {
                                value: 8,
                                message: 'Mật khẩu phải có ít nhất 8 ký tự'
                            },
                            pattern: {
                                value: /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                                message: 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                type='password'
                                {...field}
                                label="Mật khẩu"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        name="fullName"
                        control={control}
                        defaultValue=""
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
                                label="Họ và tên"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
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
                                variant="outlined"
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
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập địa chỉ'
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Địa chỉ"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
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
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập ngày sinh',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Ngày sinh"
                                type="date"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={!!errors.dateOfBirth}
                                helperText={errors.dateOfBirth?.message}
                                inputProps={{
                                    max: maxDate,
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="experience"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập năm kinh nghiệm',
                            min: {
                                value: 1,
                                message: 'Năm kinh nghiệm phải trong khoảng từ 1 - 70'
                            },
                            max: {
                                value: 70,
                                message: 'Năm kinh nghiệm phải trong khoảng từ 1 - 70'
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type='number'
                                min={1}
                                max={70}
                                label="Năm kinh nhiệm"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.experience}
                                helperText={errors.experience?.message}
                            />
                        )}
                    />
                    <Controller
                        name="nickname"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập nickname',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nickname"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.nickname}
                                helperText={errors.nickname?.message}
                            />
                        )}
                    />
                    <Controller
                        name="quote"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Một câu nói mà bạn yêu thích"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.quote}
                                helperText={errors.quote?.message}
                            />
                        )}
                    />
                    <Controller
                        name="meetLink"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập Google Meet Link',
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Google Meet Link"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.meetLink}
                                helperText={errors.meetLink?.message}
                            />
                        )}
                    />
                     <FormControl fullWidth margin="normal">
                        <InputLabel shrink>
                            Giới tính
                        </InputLabel>
                        <Controller
                            name="Gender"
                            control={control}
                            defaultValue="Nam"
                            render={({ field }) => (
                                <RadioGroup {...field} row>
                                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Vui lòng nhập mô tả',
                        }}
                        render={({ field }) => (
                            <div className='pt-3'>
                                <InputLabel>
                                    Mô tả bản thân
                                </InputLabel>
                                <TextareaAutosize
                                    {...field}
                                    minRows={5}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', borderColor: errors.description ? 'red' : '#ccc' }}
                                    placeholder="Nhập mô tả của bạn"
                                />
                                {errors.description && (
                                    <span style={{ color: 'red' }}>{errors.description.message}</span>
                                )}
                            </div>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <CircularProgress size={24} sx={{ position: 'absolute' }} />
                                <span style={{ visibility: 'hidden' }}>ĐĂNG KÍ</span>
                            </>
                        ) : (
                            'ĐĂNG KÍ'
                        )}
                    </Button>
                </form>
            </Box>
        </div>
    );
};

export default SignUpTarotReader;
