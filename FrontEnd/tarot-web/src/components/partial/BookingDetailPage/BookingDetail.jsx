import { useState } from 'react';
import styles from './booking-detail.module.scss'
import { CircularProgress, Rating } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useLocation } from 'react-router-dom';

function BookingDetail() {
    const [ratingStar, setRatingStar] = useState(0);
    const location = useLocation();
    const { bookingId } = location.state || {};
    const [bookingDetailData, setBookingDetailData] = useState(null);

    // useEffect(() => {
    //     if (userId) {
    //         const fetchTarotReaderDetail = async () => {

    //             const response = await GetTarotReaderDetail(userId);
    //             if (response.ok) {
    //                 const responseData = await response.json();
    //                 setBookingDetailData(responseData.result);
    //             } else {
    //                 throw new Error('Failed to fetch booking detail');
    //             }

    //         };

    //         fetchTarotReaderDetail();
    //     }
    // }, [bookingId]);
    
    if (!bookingDetailData) {
        return (
            <div className='flex items-center justify-center h-screen mt-10'>
                <CircularProgress color='primary' />
            </div>
        );
    }

    return (
        <div
            style={{
                height: 'max-content',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover'
            }}>
            <div className='flex justify-between items-center pr-20'>
                <h1 className='font-bold text-3xl pt-10 pl-14 text-white'>LỊCH HẸN CHI TIẾT</h1>
            </div>
            <div className={styles.container_content}>

                <div className={styles.header_content}>
                    <p className={styles.tarot_reader_name}>Tarot Reader: PPP</p>
                    <div className={styles.container_status}>
                        <p className='pr-3'>Trạng thái:</p>
                        <p className={styles.status}>Đã hoàn thành</p>
                    </div>
                </div>

                <div className={styles.detail_content}>
                    <div className={styles.content_col}>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>ID:</p>
                            <p className={styles.detail_content}>001</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Ngày đặt:</p>
                            <p className={styles.detail_content}>01-01-2024 10:05</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Ngày hẹn:</p>
                            <p className={styles.detail_content}>05-01-2024</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Thời gian:</p>
                            <p className={styles.detail_content}>9:00 - 10:30</p>
                        </div>
                    </div>
                    <div className={styles.content_col}>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Loại dịch vụ:</p>
                            <p className={styles.detail_content}>Xem tarot</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Dịch vụ:</p>
                            <p className={styles.detail_content}>5 câu hỏi</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Ghi chú:</p>
                            <p className={styles.detail_content}>Hướng nội nên chill thôiiii</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Đánh giá:</p>
                            <div className='w-3/4'>
                                <Rating
                                    name="simple-controlled"
                                    value={ratingStar}
                                    onChange={(event, newValue) => {
                                        setRatingStar(newValue);
                                    }}
                                />
                                <div>
                                    <Textarea minRows={5} style={{ width: '80%' }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_group}>
                            <button className={styles.btn_primary}>XÁC NHẬN</button>
                            <button className={styles.btn_back}>QUAY LẠI</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetail