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
import { Checkbox } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

dayjs.locale('vi'); // Set the global locale to Vietnamese

// Styled component for custom month view cell
const CustomMonthViewCell = styled(MonthView.TimeTableCell)(({ theme, startDate }) => ({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#d0d0d0',
    },
}));

function TimeForm() {
    const initialDate = dayjs();
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [openPopover, setOpenPopover] = useState(false);
    const [selectedDate, setSelectedDate] = useState();
    const timeslots = Array.from({ length: 48 }, (_, i) => `Timeslot ${i + 1}`);

    const handleClose = () => {
        setOpenPopover(false);
    };

    const TimeTableCell = ({ startDate, ...restProps }) => {
        const handleClick = () => {
            if (startDate) {
                console.log(dayjs(startDate).format('YYYY-MM-DD'));
                setSelectedDate(dayjs(startDate).format('DD-MM-YYYY'))
                setOpenPopover(true);
            } else {
                console.log('No date available');
            }
        };

        return (
            <CustomMonthViewCell
                {...restProps}
                startDate={startDate}
                onClick={handleClick}
            />
        );
    };

    return (
        <div>
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
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
                        zIndex: 999, // Make sure it's on top
                    }}
                    onClick={handleClose} // Close when clicking the dark background
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
                            width: '100%', // Set your desired width here
                            padding: '20px', // Add padding if needed
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
                            borderRadius: '30px'
                        }}>THANH TOÁN <KeyboardArrowRightIcon /></button>
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
                                marginTop: '15px'
                            }}
                        >
                            <p className="font-extrabold">10:00 - 10:30</p>
                            <Checkbox color='info' />
                        </div>
                    ))}
                </div>
            </Popover>


        </div>
    );
}

export default TimeForm;
