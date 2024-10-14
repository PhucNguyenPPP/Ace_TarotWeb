import React from 'react';
import styles from './booking-list.module.scss'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, colors, debounce, InputAdornment, Pagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GetAllBooking } from '../../../api/BookingApi';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function BookingList() {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#5900E5',
            color: theme.palette.common.white,
            fontWeight: 'bold',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
            borderBottom: '4px solid black'
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const WhitePagination = styled(Pagination)(({ theme }) => ({
        '& .MuiPaginationItem-root': {
            color: 'white', // Set text color to white
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: 'white', // Set selected page background color to white
            color: theme.palette.primary.main, // Set selected page text color to primary color
        },
        '& .MuiPaginationItem-ellipsis': {
            color: 'white', // Set ellipsis color to white
        },
        '& .MuiPaginationItem-previousNext': {
            color: 'white', // Set previous/next page color to white
        },
    }));

    const formatDateTime = (date, options) => {
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(date));
    };

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [bookingList, setBookingList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [filterBookingDateAsc, setFilterBookingDateAsc] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const options = [
        { value: 'true', label: <span>Ngày hẹn <ArrowUpwardIcon /></span> },
        { value: 'false', label: <span>Ngày hẹn <ArrowDownwardIcon /></span> }
    ];
    const { user } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchBookingList = async () => {
            if (user) {
                setIsLoading(true);
                const response = await GetAllBooking(user.userId, currentPage, rowsPerPage, searchValue, filterBookingDateAsc);
                if (response.ok) {
                    const responseData = await response.json();
                    setBookingList(responseData.result.list);
                    setTotalPages(responseData.result.totalPages);
                } else if (response.status === 404) {
                    setBookingList([]);
                    setTotalPages(1);
                } else {
                    throw new Error('Failed to fetch booking list');
                }
                setIsLoading(false);
            }
        };
        fetchBookingList();
    }, [user, currentPage, searchValue, filterBookingDateAsc]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleInputSearch = debounce((e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    }, 500);

    const handleChangeFilter = (event) => {
        setFilterBookingDateAsc(event.value);
        setCurrentPage(1);
    }

    const handleNavigate = (bookingId) => {
        navigate('/booking-detail', { state: { bookingId } });
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                height: 'max-content',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover'
            }}>
            <div className='flex justify-between items-center pr-20'>
                <h1 className='font-bold text-3xl pt-10 pl-14 text-white'>LỊCH HẸN CỦA BẠN </h1>
                <div className=' flex justify-center items-center'>
                    <p className='pr-5 text-xl text-white'>Xếp theo:</p>
                    <Select
                        onChange={handleChangeFilter}
                        options={options}
                        defaultValue={options[1]}
                    />
                </div>
            </div>
            <div className={styles.container_search} >
                <TextField
                    sx={{
                        backgroundColor: 'white',
                        width: '100%'
                    }}
                    id="outlined-basic"
                    placeholder="Tìm kiếm theo tên tarot reader"
                    variant="outlined"
                    onChange={handleInputSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    sx={{
                                        backgroundColor: 'black',
                                        color: 'white',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '5px'
                                    }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className={styles.container_table}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>ID</StyledTableCell>
                                {user.roleName === 'Tarot Reader' && (
                                    <StyledTableCell align='center'>Khách hàng</StyledTableCell>
                                )}
                                {user.roleName === 'Customer' && (
                                    <StyledTableCell align='center'>Tarot Reader</StyledTableCell>
                                )}
                                <StyledTableCell align='center'>Ngày đặt lịch</StyledTableCell>
                                <StyledTableCell align='center'>Ngày hẹn</StyledTableCell>
                                <StyledTableCell align='center'>Thời gian</StyledTableCell>
                                <StyledTableCell align='center'>Tình trạng</StyledTableCell>
                                <StyledTableCell align='center'></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingList
                                && bookingList.length > 0
                                && bookingList.map((row) => (
                                    <StyledTableRow key={row.bookingId}>
                                        <StyledTableCell align="center">
                                            {row.bookingNumber}
                                        </StyledTableCell>
                                        {user.roleName === 'Tarot Reader' && (
                                            <StyledTableCell align="center">{row.customerName}</StyledTableCell>
                                        )}

                                        {user.roleName === 'Customer' && (
                                             <StyledTableCell align="center">{row.nickname}</StyledTableCell>
                                        )}
                                        <StyledTableCell align='center'>
                                            {formatDateTime(row.createdDate, {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {formatDateTime(row.bookingDate, {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            {formatDateTime(row.startTime, {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            -{' '}
                                            {formatDateTime(row.endTime, {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.status}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <button
                                                className={styles.btn_detail}
                                                onClick={() => handleNavigate(row.bookingId)}
                                            >
                                                CHI TIẾT
                                            </button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='flex justify-center pt-10 pb-10'>
                <WhitePagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default BookingList;
