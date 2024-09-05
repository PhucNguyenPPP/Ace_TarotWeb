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
import { BorderBottom } from '@mui/icons-material';
import { colors, InputAdornment, Pagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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

    function createData(id, tarotReader, bookingDate, bookDate, time, status) {
        return { id, tarotReader, bookingDate, bookDate, time, status };
    }

    const rows = [
        createData('B123', "PPP", "2024-12-12", "2024-12-12", "9:00-10:00", "Chưa thanh toán"),
        createData('B124', "PPP", "2024-12-12", "2024-12-12", "9:00-10:00", "Chưa thanh toán"),
        createData('B125', "PPP", "2024-12-12", "2024-12-12", "9:00-10:00", "Chưa thanh toán"),
        createData('B126', "PPP", "2024-12-12", "2024-12-12", "9:00-10:00", "Chưa thanh toán"),
        createData('B127', "PPP", "2024-12-12", "2024-12-12", "9:00-10:00", "Chưa thanh toán"),
    ];

    return (
        <div
            style={{
                height: 'max-content',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover'
            }}>
            <div className='flex justify-between items-center pr-20'>
                <h1 className='font-bold text-3xl pt-10 pl-14 text-white'>LỊCH HẸN CỦA BẠN </h1>
                <div className=' flex justify-center items-center'>
                    <p className='pr-5 text-xl text-white'>Xếp theo:</p>
                    <select className={styles.filter_select}>
                        <option>Ngày đặt tăng dần</option>
                        <option>Ngày đặt giảm dần</option>
                    </select>
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
                                <StyledTableCell align='center'>Tarot reader</StyledTableCell>
                                <StyledTableCell align='center'>Ngày đặt lịch</StyledTableCell>
                                <StyledTableCell align='center'>Ngày hẹn</StyledTableCell>
                                <StyledTableCell align='center'>Thời gian</StyledTableCell>
                                <StyledTableCell align='center'>Tình trạng</StyledTableCell>
                                <StyledTableCell align='center'></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell align="center">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.tarotReader}</StyledTableCell>
                                    <StyledTableCell align="center">{row.bookingDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.bookDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.time}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <button className={styles.btn_detail}>CHI TIẾT</button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='flex justify-center pt-10 pb-10'>
                <WhitePagination
                    count={5}
                    page={1}
                // Add other props as needed
                />
            </div>


        </div>
    );
}

export default BookingList;
