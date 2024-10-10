import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    MonthView,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
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

const initialDate = new Date();

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
        setIsLoading(true);
        const response = await GetSlotOfDate(dayjs(startDate).format('YYYY-MM-DD'), user.userId);
        setSelectedDate(dayjs(startDate).format('DD/MM/YYYY'));
        if (response.ok) {
            const responseData = await response.json();
            setSlotOfDate(responseData.result);
        } else {
            setSlotOfDate([]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (user) {
            fetchAllSlotOfSystem();
        }
    }, [user]);

    const highlightedDates = availableSlotSystem.map(slot => dayjs(slot.startDate).format('YYYY-MM-DD'));

    const handleCellClick = (startDate) => {
        fetchSlotOfDate(startDate);
        setIsDialogOpen(true);
    };

    const CustomTimeTableCell = ({ startDate, ...restProps }) => {
        const formattedDate = dayjs(startDate).format('YYYY-MM-DD');
        const isHighlighted = highlightedDates.includes(formattedDate);
        return (
            <MonthView.TimeTableCell
                {...restProps}
                startDate={startDate}
                style={{
                    backgroundColor: isHighlighted ? '#5900E5' : undefined,
                    color: isHighlighted ? 'white' : undefined,
                    cursor: 'pointer',
                }}
                onClick={() => handleCellClick(startDate)}
            />
        );
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
            toast.error("Vui long chọn ít nhất 1 slot để đăng kí");
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

    // Custom DayView component
    const CustomDayView = () => {
        return (
            <Scheduler
                data={availableSlotSystem}
                locale="vi"
            >
                <ViewState
                    currentDate={selectedDate ? dayjs(selectedDate, 'DD/MM/YYYY').format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD')}
                />
                <DayView
                    startDayHour={0}
                    endDayHour={24}
                    timeTableCellComponent={(props) => {
                        const timeSlotStart = dayjs(props.startDate).format('YYYY-MM-DD HH:mm');
                        const isSlotAvailable = slotOfDate.some(slot => dayjs(slot.startDate).format('YYYY-MM-DD HH:mm') === timeSlotStart);
                        const slotId = slotIdMapping[timeSlotStart];
                        const isSlotSelected = selectedSlotIds.includes(slotId);

                        return (
                            <DayView.TimeTableCell
                                {...props}
                                style={{
                                    backgroundColor: isSlotSelected ? '#FFD232' : (isSlotAvailable ? '#5900E5' : undefined),
                                    color: isSlotSelected ? 'black' : (isSlotAvailable ? 'white' : undefined),
                                    cursor: isSlotAvailable ? 'not-allowed' : 'pointer',
                                }}
                                onClick={() => {
                                    if (!isSlotAvailable) {
                                        if (isSlotSelected) {
                                            setSelectedSlotIds((prev) => prev.filter(id => id !== slotId));
                                        } else {
                                            setSelectedSlotIds((prev) => [...prev, slotId]);
                                        }
                                        console.log(selectedSlotIds)
                                    }
                                }}
                            />
                        );
                    }}
                />
            </Scheduler>
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
        <div>
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
                <Scheduler
                    data={availableSlotSystem}
                    locale="vi"
                >
                    <ViewState
                        currentDate={currentDate.format('YYYY-MM-DD')}
                    />
                    <MonthView
                        startDayHour={0}
                        endDayHour={24}
                        timeTableCellComponent={CustomTimeTableCell}
                    />
                </Scheduler>
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
