import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const initialDate = new Date();

const schedulerData = [
    { startDate: '2024-09-04T00:30:00', endDate: '2024-09-04T01:00:00', title: 'Trống' },
    { startDate: '2024-09-04T09:30:00', endDate: '2024-09-04T10:00:00', title: 'Go to a gym' },
];

function TimeForm1() {
    const [currentDate, setCurrentDate] = useState(dayjs(initialDate));
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
                    data={schedulerData}
                    locale="vi"
                >
                    <ViewState
                        currentDate={currentDate.format('YYYY-MM-DD')}
                    />
                    <DayView
                    
                        startDayHour={0}
                        endDayHour={24}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        </div>

    );
}

export default TimeForm1;
