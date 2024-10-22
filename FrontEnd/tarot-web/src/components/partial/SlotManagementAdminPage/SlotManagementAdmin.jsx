import * as React from 'react';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { CreateSlotByAdmin, GetAllSlotOfSystem } from '../../../api/SlotApi';
import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const initialDate = new Date();
const localizer = momentLocalizer(moment); // Sử dụng momentLocalizer

function SlotManagementAdmin() {
    const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
    const [isLoading, setIsLoading] = useState(false);
    const [availableSlotSystem, setAvailableSlotSystem] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchAllSlotOfSystem = async () => {
        setIsLoading(true);
        const response = await GetAllSlotOfSystem();
        if (response.ok) {
            const responseData = await response.json();
            setAvailableSlotSystem(responseData.result);
        } else {
            throw new Error('Failed to fetch all slot of system');
        }
        setIsLoading(false);
    };



    useEffect(() => {
        fetchAllSlotOfSystem();
    }, [currentDate]);

    const highlightedDates = availableSlotSystem.map(slot => dayjs(slot.startDate).format('YYYY-MM-DD'));

    const handleStartDateChange = (event) => {
        console.log(availableSlotSystem)
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleCreateSlot = async () => {
        if (startDate == '' || endDate == '') {
            toast.error("Vui lòng nhập ngày bắt đầu và ngày kết thúc");
            return;
        }

        if (startDate > endDate) {
            toast.error("Ngày bắt đầu không thể lớn hơn hoặc bằng ngày kết thúc");
            return;
        }

        if (startDate == endDate) {
            toast.error("Ngày bắt đầu không thể bằng ngày kết thúc");
            return;
        }

        const response = await CreateSlotByAdmin(startDate, endDate);
        const responseData = await response.json();
        if (response.ok) {
            toast.success("Tạo slot thành công");
            fetchAllSlotOfSystem();
        } else {
            toast.error(responseData.message);
        }
        setIsLoading(false);
    }

    const CustomToolbar = () => {
        return (
            <div style={{ display: 'none' }}></div> // Trả về một div trống để ẩn toolbar
        );
    };

    const getWeekdayNames = () => {
        return ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    };


    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='p-5 w-full'>
            <div className='pb-10'>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Chọn Khoảng Thời Gian Tạo Slot
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <TextField
                                style={{ width: '40%' }}
                                label="Ngày Bắt Đầu"
                                type="date"
                                onChange={handleStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                style={{ width: '40%' }}
                                label="Ngày Kết Thúc"
                                type="date"
                                onChange={handleEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                        <div className='flex justify-end mt-5'>
                            <Button
                                style={{ backgroundColor: '#5900E5', color: 'white', padding: '10px 20px' }}
                                onClick={handleCreateSlot}
                            >Tạo Slot
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className='pb-10'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Chọn ngày"
                            value={currentDate}
                            onChange={(newValue) => setCurrentDate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>

            <Paper style={{ padding: 16 }}>
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    defaultDate={currentDate.format('YYYY-MM-DD')}
                    dayPropGetter={(date) => {
                        const formattedDate = dayjs(date).format('YYYY-MM-DD');
                        if (highlightedDates.includes(formattedDate)) {
                            return {
                                style: {
                                    backgroundColor: '#5900E5',
                                    color: '#FFFFFF',
                                    cursor: 'pointer',
                                },
                            };
                        }
                        return {};
                    }}
                    components={{ toolbar: CustomToolbar }}
                    formats={{
                        dayFormat: (date) => {
                            const day = dayjs(date).format('dddd'); // Lấy tên ngày trong tuần
                            return getWeekdayNames()[dayjs(date).day()]; // Trả về tên thứ bằng tiếng Việt
                        },
                        weekdayFormat: (date) => {
                            return getWeekdayNames()[dayjs(date).day()]; // Trả về tên thứ bằng tiếng Việt
                        }
                    }}
                />
            </Paper>
        </div>
    );
}

export default SlotManagementAdmin;
