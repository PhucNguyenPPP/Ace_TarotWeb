import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Appointments,
    MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { CheckBox } from '@mui/icons-material';
import { Checkbox, CircularProgress } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useEffect } from 'react';
import { GetDateHasSlotOfMonth, GetSlotOfDate } from '../../../api/SlotApi';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { CreateBooking } from '../../../api/BookingApi';
import { CreatePaymentUrl } from '../../../api/PaymentApi';
import { useNavigate } from 'react-router-dom';

dayjs.locale('vi'); // Set the global locale to Vietnamese

const CustomMonthViewCell = styled(MonthView.TimeTableCell)(({ theme, startDate, dateHasSlot }) => {
    const dateFormatted = dayjs(startDate).format('YYYY-MM-DD');
    const isDateHasSlot = dateHasSlot.includes(dateFormatted);

    return {
        backgroundColor: isDateHasSlot ? '#590CE0' : 'white',
        color: isDateHasSlot ? 'white' : 'black',
    };
});

function TimeForm({ tarotReaderData, serviceData }) {
    const initialDate = dayjs();
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [openPopover, setOpenPopover] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [dateHasSlot, setDateHasSlot] = useState([]);
    const [slotOfDate, setSlotOfDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generateSlots, setGenerateSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState([]);
    const { user } = useAuth();

    const handleClose = () => {
        setOpenPopover(false);
    };

    const TimeTableCell = ({ startDate, ...restProps }) => {
        const handleClick = () => {
            setSelectedSlot([]);
            if (dateHasSlot.includes(dayjs(startDate).format('YYYY-MM-DD'))) {
                if (startDate) {
                    const fetchSlotOfDate = async () => {
                        setIsLoading(true);
                        const response = await GetSlotOfDate(dayjs(startDate).format('YYYY-MM-DD'), tarotReaderData.userId);
                        setSelectedDate(dayjs(startDate).format('DD-MM-YYYY'))
                        if (response.ok) {
                            const responseData = await response.json();
                            setSlotOfDate(responseData.result);
                        } else {
                            throw new Error('Failed to fetch slot of date');
                        }
                        setIsLoading(false);
                    };

                    fetchSlotOfDate();
                    setGenerateSlots([]);
                    generateTimeSlots();
                    setOpenPopover(true);
                } else {
                    console.log('No date available');
                }
            }
        };

        return (
            <CustomMonthViewCell
                {...restProps}
                startDate={startDate}
                onClick={handleClick}
                dateHasSlot={dateHasSlot}
            />
        );
    };

    useEffect(() => {
        const fetchDateHasSlotOfMonth = async () => {
            setIsLoading(true);
            const month = currentDate.format('MM');
            const year = currentDate.format('YYYY');
            const response = await GetDateHasSlotOfMonth(year, month, tarotReaderData.userId);
            if (response.ok) {
                const responseData = await response.json();
                const formattedDates = responseData.result.map(date => dayjs(date).format('YYYY-MM-DD'));
                setDateHasSlot(formattedDates);
            } else {
                console.log('Failed to fetch date has slot');
            }
            setIsLoading(false);
        };
        setSelectedSlot([]);
        fetchDateHasSlotOfMonth();
    }, [currentDate]);

    const generateTimeSlots = () => {
        let slots = [];
        let time = dayjs().startOf('day');
        for (let i = 0; i < 48; i++) {
            slots.push({
                timeRange: `${time.format('H:mm')} - ${time.add(30, 'minute').format('H:mm')}`,
                time: time.format('H:mm')
            });
            time = time.add(30, 'minute');
        }
        setGenerateSlots(slots);
    };

    const isSlotAvailable = (startTime) => {
        return slotOfDate.some(slot => slot.startTime === startTime && slot.status === true);
    };

    const getUserSlotId = (startTime) => {
        var slot = slotOfDate.find(c => c.startTime === startTime && c.status === true);
        return slot.userSlotId
    }

    const handleChooseSlot = (event) => {
        if (event.target.checked) {
            setSelectedSlot((prevSlots) => [...prevSlots, event.target.value]);
        } else {
            setSelectedSlot((prevSlots) => prevSlots.filter((slot) => slot !== event.target.value));
        }
    };

    const handleClickPayment = () => {
        var slotAmount = Math.ceil(serviceData.serviceDuration / 30)
        if (selectedSlot.length !== slotAmount) {
            toast.error("Vui lòng chọn " + slotAmount + " slot");
            return;
        }

        if (selectedSlot.length > 1) {
            const selectedSlotsDetails = selectedSlot
                .map((userSlotId) => slotOfDate.find((slot) => slot.userSlotId === userSlotId))
                .sort((a, b) => dayjs(a.startTime, 'H:mm').diff(dayjs(b.startTime, 'H:mm')));

            let areSlotsSequential = true;
            for (let i = 1; i < selectedSlotsDetails.length; i++) {
                const prevSlotEndTime = dayjs(selectedSlotsDetails[i - 1].endTime, 'H:mm');
                const currentSlotStartTime = dayjs(selectedSlotsDetails[i].startTime, 'H:mm');

                if (!currentSlotStartTime.isSame(prevSlotEndTime)) {
                    areSlotsSequential = false;
                    break;
                }
            }

            if (!areSlotsSequential) {
                toast.error("Vui lòng chọn các slot liền kề nhau.");
                return;
            }
        }

        if (user?.userId) {
            const fetchCreateBooking = async () => {
                setIsLoading(true);
                var data = {};
                if (serviceData.serviceName === "Theo câu hỏi lẻ") {
                    data = {
                        customerId: user.userId,
                        tarotReaderId: tarotReaderData.userId,
                        serviceId: serviceData.serviceId,
                        formMeetingId: serviceData.formMeetingId,
                        questionAmount: serviceData.questionAmount,
                        userSlotId: selectedSlot
                    }
                } else {
                    data = {
                        customerId: user.userId,
                        tarotReaderId: tarotReaderData.userId,
                        serviceId: serviceData.serviceId,
                        formMeetingId: serviceData.formMeetingId,
                        userSlotId: selectedSlot
                    }
                }
                const response = await CreateBooking(data);
                setOpenPopover(false);
                if (response.ok) {
                    const responseData = await response.json();
                    toast.success("Tạo lịch hẹn thành công")
                    setTimeout(() => {
                    }, 1000);

                    const fetchCreatePaymentUrl = async () => {
                        const response = await CreatePaymentUrl(responseData.result);
                        const responseDataCreateUrl = await response.json();
                        if (response.ok) {
                            setIsLoading(false);
                            window.location.href = responseDataCreateUrl.result;
                        } else {
                            throw new Error('Failed to fetch create payment url');
                        }
                    };

                    fetchCreatePaymentUrl();

                } else {
                    throw new Error('Failed to fetch create booking');
                }
            };

            fetchCreateBooking();
        } else {
            toast.error("Vui lòng đăng nhập để có thể đặt lịch");
        }


    }


    return (
        <div>
            {isLoading ?
                <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                    <CircularProgress />
                </div>
                :
                <>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs} locale="vi">
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    label="Chọn tháng"
                                    value={currentDate}
                                    onChange={(newValue) => setCurrentDate(dayjs(newValue))}
                                    views={['year', 'month']}
                                    format="MMMM YYYY"
                                    minDate={initialDate}
                                    maxDate={initialDate.add(2, 'month')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <Paper
                        style={{
                            padding: 60,
                            backgroundColor: '#9747FF',
                            marginTop: 30,
                        }}
                    >
                        <Scheduler locale="vi" firstDayOfWeek={1}>
                            <ViewState currentDate={currentDate.format('YYYY-MM-DD')} />
                            <MonthView timeTableCellComponent={TimeTableCell} />
                            <Appointments />
                        </Scheduler>
                    </Paper>

                    {/* Dark overlay */}
                    {openPopover && (
                        <div
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                zIndex: 999,
                            }}
                            onClick={handleClose}
                        />
                    )}

                    <Popover
                        open={openPopover}
                        onClose={handleClose}
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
                        }}
                        slotProps={{
                            paper: {
                                sx: {
                                    width: '100%',
                                    padding: '20px',
                                },
                            },
                        }}
                    >
                        <div>
                            <p className='font-extrabold'>Ngày {selectedDate}</p>
                        </div>
                        <div className='flex justify-center'>
                            <button
                                style={{
                                    backgroundColor: 'black',
                                    color: 'white',
                                    padding: '5px 30px',
                                    borderRadius: '30px',
                                }}
                                onClick={handleClickPayment}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <CircularProgress size={24} sx={{ position: 'absolute' }} />
                                        <span style={{ visibility: 'hidden' }}>THANH TOÁN</span>
                                    </>
                                ) : (
                                    'THANH TOÁN'
                                )} <KeyboardArrowRightIcon />
                            </button>
                        </div>
                        <div className='flex flex-wrap justify-center'>
                            {generateSlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/4"
                                    style={{
                                        backgroundColor: isSlotAvailable(slot.time) ? '#5900E5' : 'gray',
                                        color: 'white',
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                        padding: '10px 0',
                                        marginRight: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <p className="font-extrabold">{slot.timeRange}</p>
                                    <Checkbox
                                        color='info'
                                        disabled={!isSlotAvailable(slot.time)}
                                        value={isSlotAvailable(slot.time) ? getUserSlotId(slot.time) : ''}
                                        onChange={(event) => handleChooseSlot(event)}
                                    />
                                </div>
                            ))}
                        </div>
                    </Popover>
                </>
            }

        </div>
    );
}

export default TimeForm;