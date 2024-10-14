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
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { GetProfitByAdmin, GetRevenueByAdmin } from '../../../api/DashboardApi';

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

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure 2 digits for month
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    return `${year}-${month}-${day}`;
};

const currentDate = new Date();

const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

function DashboardAdmin() {
    const [tarotReaders, setTarotReaders] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [profit, setProfit] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [profitData, setProfitData] = useState([]);
    const [startDate, setStartDate] = useState(formatDate(firstDayOfMonth));
    const [endDate, setEndDate] = useState(formatDate(lastDayOfMonth));
    const { user } = useAuth();

    useEffect(() => {
        setTarotReaders(10);
        setCustomers(150);

        const mockProfitData = [1500000, 2000000, 1800000, 2200000, 2500000, 2700000, 3000000, 3200000, 3500000, 4000000, 4200000, 4500000];
        setProfitData(mockProfitData);
    }, []);

    const fetchRevenueByTimeRange = async () => {
        const response = await GetRevenueByAdmin(startDate, endDate, user.roleId)
        if(response.ok){
            const responseData = await response.json();
            setRevenue(responseData.result);
        } else {
            console.log("Error when get revenue")
        }
    }

    const fetchProfitByTimeRange = async () => {
        const response = await GetProfitByAdmin(startDate, endDate, user.roleId)
        if(response.ok){
            const responseData = await response.json();
            setProfit(responseData.result);
        } else {
            console.log("Error when get profie")
        }
    }

    useEffect(() => {
        if(user){
            fetchRevenueByTimeRange();
            fetchProfitByTimeRange();
        }
    }, [startDate, endDate])

    // Handle date changes
    const handleStartDateChange = (event) => {
        var startDateValue = event.target.value;
        if(endDate != ''){
            if(startDateValue >= endDate){
                toast.error("Ngày bắt đầu không thể lớn hơn hoặc bằng ngày kết thúc");
                return;
            }
        }
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        var endDateValue = event.target.value;
        if(startDate != ''){
            if(endDateValue <= startDate){
                toast.error("Ngày kết thúc không thể nhỏ hơn hoặc bằng ngày bắt đầu");
                return;
            }
        }
        setEndDate(event.target.value);
    };

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
                {/* Tarot Readers Card */}
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

                {/* Customers Card */}
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
                {/* Date range picker */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Chọn Khoảng Thời Gian
                            </Typography>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <TextField
                                    style={{ width: '40%' }}
                                    label="Ngày Bắt Đầu"
                                    type="date"
                                    value={startDate}
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
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Profit Card */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <AttachMoneyIcon /> Lợi Nhuận
                            </Typography>
                            <Typography variant="h4">{profit}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Revenue Card */}
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <TrendingUpIcon /> Doanh Thu
                            </Typography>
                            <Typography variant="h4">{revenue}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

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
