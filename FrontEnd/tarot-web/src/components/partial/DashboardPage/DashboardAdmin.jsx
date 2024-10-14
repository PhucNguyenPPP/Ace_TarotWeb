import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, TextField } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ReaderIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';


// Register necessary Chart.js components
ChartJS.register(
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

function DashboardAdmin() {
    const [tarotReaders, setTarotReaders] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [profit, setProfit] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [profitData, setProfitData] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]); // Initialize date range

    // Mock data for profit over 12 months
    useEffect(() => {
        setTarotReaders(10);
        setCustomers(150);
        setProfit(3000);
        setRevenue(5000);

        const mockProfitData = [1500000, 2000000, 1800000, 2200000, 2500000, 2700000, 3000000, 3200000, 3500000, 4000000, 4200000, 4500000];
        setProfitData(mockProfitData);
    }, []);

    // Chart data configuration
    const data = {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [
            {
                label: 'Lợi Nhuận (VND)',
                data: profitData,
                fill: false,
                borderColor: '#5900E5',
                tension: 0.1,
            },
        ],
    };

    // Chart options configuration
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Lợi Nhuận Theo Tháng',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 500000,
                    callback: function (value) {
                        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                    },
                },
            },
        },
    };

    return (
        <div className='p-8'>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <ReaderIcon /> Tổng số Tarot Reader
                            </Typography>
                            <Typography variant="h4">{tarotReaders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <PeopleIcon /> Tổng số Khách Hàng
                            </Typography>
                            <Typography variant="h4">{customers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <AttachMoneyIcon /> Lợi Nhuận
                            </Typography>
                            <Typography variant="h4">${profit}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <TrendingUpIcon /> Doanh Thu
                            </Typography>
                            <Typography variant="h4">${revenue}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <DemoItem label="Static variant" component="StaticDateRangePicker">
                    <StaticDateRangePicker
                        defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                        sx={{
                            [`.${pickersLayoutClasses.contentWrapper}`]: {
                                alignItems: 'center',
                            },
                        }}
                    />
                </DemoItem>

                {/* Profit Chart */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Biểu Đồ Lợi Nhuận Theo 12 Tháng
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <Line data={data} options={options} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    );
}

export default DashboardAdmin;
