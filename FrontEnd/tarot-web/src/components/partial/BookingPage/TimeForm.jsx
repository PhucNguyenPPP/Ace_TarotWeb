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

dayjs.locale('vi'); // Set the global locale to Vietnamese

const CustomMonthViewCell = styled(MonthView.TimeTableCell)(({ theme, startDate, dateHasSlot }) => {
    const dateFormatted = dayjs(startDate).format('YYYY-MM-DD');
    const isDateHasSlot = dateHasSlot.includes(dateFormatted);

    return {
        backgroundColor: isDateHasSlot ? '#590CE0' : 'white',
        color: isDateHasSlot ? 'white' : 'black',
    };
});

function TimeForm({ tarotReaderData }) {
    const initialDate = dayjs();
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [openPopover, setOpenPopover] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const [dateHasSlot, setDateHasSlot] = useState([]);
    const [slotOfDate, setSlotOfDate] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const timeslots = Array.from({ length: 48 }, (_, i) => `Timeslot ${i + 1}`);

    const handleClose = () => {
        setOpenPopover(false);
    };

    // Custom TimeTableCell component
    const TimeTableCell = ({ startDate, ...restProps }) => {
        const handleClick = () => {

            if (dateHasSlot.includes(dayjs(startDate).format('YYYY-MM-DD'))) {
                if (startDate) {

                    const fetchSlotOfDate = async () => {
                        const response = await GetSlotOfDate(dayjs(startDate).format('YYYY-MM-DD'), tarotReaderData.userId);
                        setSelectedDate(dayjs(startDate).format('DD-MM-YYYY'))
                        if (response.ok) {
                            const responseData = await response.json();
                            setSlotOfDate(responseData.result);
                        } else {
                            throw new Error('Failed to fetch slot of date');
                        }
                    };

                    fetchSlotOfDate();
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
                dateHasSlot={dateHasSlot} // Pass dates with slots to the cell
            />
        );
    };

    // Fetch dates that have slots when the current date changes
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

        fetchDateHasSlotOfMonth();
    }, [currentDate]);

    return (
        <div>
            {isLoading ?
                <div className='flex justify-center'>
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
                            >
                                THANH TOÁN <KeyboardArrowRightIcon />
                            </button>
                        </div>
                        <div className='flex flex-wrap justify-center'>
                            {timeslots.map((slot, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-1/4"
                                    style={{
                                        backgroundColor: '#5900E5',
                                        color: 'white',
                                        textAlign: 'center',
                                        borderRadius: '20px',
                                        padding: '10px 0',
                                        marginRight: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <p className="font-extrabold">10:00 - 10:30</p>
                                    <Checkbox color='info' />
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