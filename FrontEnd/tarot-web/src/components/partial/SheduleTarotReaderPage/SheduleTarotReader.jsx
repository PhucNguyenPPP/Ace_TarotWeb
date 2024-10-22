import * as React from 'react';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { GetAllSlotOfSystem, GetSlotOfDate, RegisterSlotByTarotReader } from '../../../api/SlotApi';
import { CircularProgress, Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const initialDate = new Date();
const localizer = momentLocalizer(moment); // Sử dụng momentLocalizer
const now = dayjs().format('YYYY-MM-DD');

function ScheduleTarotReader({ tarotReaderData }) {
    const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
    const [isLoading, setIsLoading] = useState(false);
    const [availableSlotSystem, setAvailableSlotSystem] = useState([]);
    const [slotOfDate, setSlotOfDate] = useState([]);
    const [selectedSlotIds, setSelectedSlotIds] = useState([]); // State để lưu slotId đã chọn
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const { user } = useAuth();

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

    const fetchSlotOfDate = async (startDate) => {
        const response = await GetSlotOfDate(dayjs(startDate).format('YYYY-MM-DD'), user.userId);
        setSelectedDate(dayjs(startDate).format('YYYY-MM-DD'));
        if (response.ok) {
            const responseData = await response.json();
            setSlotOfDate(responseData.result);
        } else {
            setSlotOfDate([]);
        }
    };

    useEffect(() => {
        if (user) {
            fetchAllSlotOfSystem();
        }
    }, [user, currentDate]);

    const highlightedDates = availableSlotSystem.map(slot => dayjs(slot.startDate).format('YYYY-MM-DD'));

    const handleCellClick = (startDate) => {
        fetchSlotOfDate(startDate);
        setIsDialogOpen(true);
    };


    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSlotOfDate([]);
        setSelectedSlotIds([]);
    };

    const slotIdMapping = {};
    availableSlotSystem.forEach(slot => {
        const formattedStartDate = dayjs(slot.startDate).format('YYYY-MM-DD HH:mm');
        slotIdMapping[formattedStartDate] = slot.slotId;
    });

    const handleRegisterSlot = async () => {
        if (selectedSlotIds.length <= 0) {
            toast.error("Vui lòng chọn ít nhất 1 slot để đăng kí");
            return;
        }

        setIsLoading(true);
        const response = await RegisterSlotByTarotReader(user.userId, selectedSlotIds);
        if (response.ok) {
            toast.success("Đăng kí giờ làm việc thành công");
        } else {
            toast.error("Đăng kí giờ làm việc thất bại");
        }
        handleCloseDialog();
        fetchAllSlotOfSystem();
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

    // Custom DayView component

    const CustomDayView = () => {
        return (
            <Calendar
                localizer={localizer}
                defaultView='day'
                startAccessor="start"
                endAccessor="end"
                step={30}
                timeslots={1}
                date={selectedDate}
                style={{ height: '100vh' }}
                selectable
                onSelectSlot={(slotInfo) => {
                    console.log("Slot clicked:", slotInfo);

                    const formattedSlot = dayjs(slotInfo.start).format('YYYY-MM-DD HH:mm');
                    const slotId = slotIdMapping[formattedSlot]; // Lấy ID của slot

                    const isChoosedAlready= slotOfDate.some(slot =>
                        dayjs(slot.startDate).format('YYYY-MM-DD HH:mm') === formattedSlot
                    );

                    const isSlotAvailable = dayjs(slotInfo.start).isAfter(dayjs(new Date()))


                    if (isSlotAvailable && !isChoosedAlready) {
                        const isSlotSelected = selectedSlotIds.includes(slotId);
                        if (isSlotSelected) {
                            // Nếu slot đã được chọn, bỏ chọn nó
                            setSelectedSlotIds(prev => prev.filter(id => id !== slotId));
                        } else {
                            // Nếu slot chưa được chọn, thêm vào danh sách đã chọn
                            setSelectedSlotIds(prev => [...prev, slotId]);
                        }
                    } else {
                        toast.error("Slot đã qua thời gian");
                    }
                }}
                slotPropGetter={(slotProp) => {
                    const formattedSlot = dayjs(slotProp).format('YYYY-MM-DD HH:mm');
                    const isAvailable = slotOfDate.some(slot =>
                        dayjs(slot.startDate).format('YYYY-MM-DD HH:mm') === formattedSlot
                    );
                    const slotId = slotIdMapping[formattedSlot];
                    const isSlotSelected = selectedSlotIds.includes(slotId);

                    return {
                        style: {
                            backgroundColor: isSlotSelected ? '#FFD232' : (isAvailable ? '#5900E5' : null), // Tô màu cho slot đã chọn hoặc có sẵn
                            color: isAvailable ? 'white' : 'black',
                            cursor: !isAvailable ? 'pointer' : 'not-allowed', // Thay đổi con trỏ
                        },
                    };
                }}
                components={{ toolbar: CustomToolbar }}
                formats={{
                    dayFormat: (date) => {
                        const day = dayjs(date).format('dddd'); // Lấy tên ngày trong tuần
                        return getWeekdayNames()[dayjs(date).day()]; // Trả về tên thứ bằng tiếng Việt
                    },
                    weekdayFormat: (date) => {
                        return getWeekdayNames()[dayjs(date).day()]; // Trả về tên thứ bằng tiếng Việt
                    },
                    timeGutterFormat: (date) => {
                        return dayjs(date).format('HH:mm'); // Sử dụng định dạng 24 giờ
                    },
                    eventTimeRangeFormat: ({ start, end }) => {
                        return `${dayjs(start).format('HH:mm')} - ${dayjs(end).format('HH:mm')}`; // Định dạng thời gian cho sự kiện
                    },
                }}
            />

        );
    };



    if (isLoading || !user) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='w-full'>
            <div>
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
                    onSelectSlot={(slotInfo) => {
                        const startDate = slotInfo.start; // Lấy ngày bắt đầu từ sự kiện `slotInfo`
                        handleCellClick(startDate); // Gọi hàm handleClick với startDate
                    }}
                    selectable
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

            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Các khoảng thời gian trong ngày {selectedDate || ''}</DialogTitle>
                <DialogContent>
                    <div className='flex justify-center'>
                        <Button style={{ backgroundColor: "#5900E5", color: 'white' }} onClick={() => handleRegisterSlot()}>XÁC NHẬN</Button>
                    </div>
                    <CustomDayView />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ScheduleTarotReader;
