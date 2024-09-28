import { useState } from 'react';
import styles from './booking-detail.module.scss'
import { CircularProgress, Rating } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateFeedback, GetBookingDetail } from '../../../api/BookingApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import StarIcon from '@mui/icons-material/Star';

function BookingDetail() {
    const location = useLocation();
    const { bookingId } = location.state || {};
    const [bookingDetailData, setBookingDetailData] = useState(null);
    const [ratingStar, setRatingStar] = useState(0);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const formatDateTime = (date, options) => {
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(date));
    };

    const fetchGetBookingDetail = async () => {

        const response = await GetBookingDetail(bookingId);
        if (response.ok) {
            const responseData = await response.json();
            setBookingDetailData(responseData.result);
        } else {
            const responseData = await response.json();
            toast.error(responseData.result);
        }

    };

    useEffect(() => {
        if (bookingId) {
            fetchGetBookingDetail();
        }
    }, [bookingId]);

    const handleCreateFeedback = async () => {
        if (ratingStar <= 0 || ratingStar > 5) {
            toast.error("Vui lòng chọn số sao");
            return;
        }

        if (feedback === '') {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }

        const response = await CreateFeedback(bookingId, ratingStar, feedback);
        if (response.ok) {
            toast.success('Đánh giá thành công');
            fetchGetBookingDetail();
        } else {
            const responseData = await response.json();
            toast.error('Đánh giá thất bại: ' + responseData.result);
        }
    }

    const handleBack = () => {
        navigate(-1);
    };

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
                    <p className={styles.tarot_reader_name}>Tarot Reader: {bookingDetailData.tarotReaderName}</p>
                    <div className={styles.container_status}>
                        <p className='pr-3'>Trạng thái:</p>
                        <p className={styles.status}>{bookingDetailData.status}</p>
                    </div>
                </div>

                <div className={styles.detail_content}>
                    <div className={styles.content_col}>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>ID:</p>
                            <p className={styles.detail_content}>{bookingDetailData.bookingNumber}</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Ngày đặt:</p>
                            <p className={styles.detail_content}>
                                {formatDateTime(bookingDetailData.createdDate, {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Ngày hẹn:</p>
                            <p className={styles.detail_content}>
                                {formatDateTime(bookingDetailData.bookingDate, {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Thời gian:</p>
                            <p className={styles.detail_content}>
                                {formatDateTime(bookingDetailData.startTime, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                -
                                {formatDateTime(bookingDetailData.endTime, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Hình thức:</p>
                            <p className={styles.detail_content}>{bookingDetailData.formMeetingName}</p>
                        </div>
                        {bookingDetailData.formMeetingName === "Gọi video" && bookingDetailData.status === 'Đã thanh toán'
                            ?
                            (
                                <div className={styles.content_row}>
                                    <a
                                        className={styles.meetLink}
                                        href={bookingDetailData.meetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Meet URL
                                    </a>
                                </div>
                            )
                            :
                            (null)
                        }
                    </div>
                    <div className={styles.content_col}>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Loại dịch vụ:</p>
                            <p className={styles.detail_content}>{bookingDetailData.serviceTypeName}</p>
                        </div>
                        <div className={styles.content_row}>
                            <p className={styles.detail_lable}>Dịch vụ:</p>
                            <p className={styles.detail_content}>{bookingDetailData.serviceName}</p>
                        </div>
                        {bookingDetailData.serviceTypeName === "Theo câu hỏi lẻ"
                            ?
                            (
                                <div className={styles.content_row}>
                                    <p className={styles.detail_lable}>Số câu hỏi:</p>
                                    <p className={styles.detail_content}>{bookingDetailData.questionAmount}</p>
                                </div>
                            )
                            :
                            (null)
                        }

                        {
                            (bookingDetailData.status === 'Hoàn thành' && !bookingDetailData.behaviorRating && !bookingDetailData.behaviorFeedback) ? (
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
                                            <Textarea
                                                minRows={5}
                                                style={{ width: '80%' }}
                                                onChange={(event) => {
                                                    setFeedback(event.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (bookingDetailData.status === 'Hoàn thành' && bookingDetailData.behaviorRating && bookingDetailData.behaviorFeedback) ? (
                                <>
                                    <div className={styles.content_row}>
                                        <p className={styles.detail_lable}>Đánh giá:</p>
                                        <p className={styles.detail_content}>
                                            {bookingDetailData.behaviorRating} <StarIcon style={{ marginTop: '2px', color: '#5900E5' }} />
                                        </p>
                                    </div>
                                    <div className={styles.content_row}>
                                        <p className={styles.detail_lable}>Bình luận:</p>
                                        <p className={styles.detail_content}>{bookingDetailData.behaviorFeedback}</p>
                                    </div>
                                </>
                            ) : null
                        }

                        {
                            (bookingDetailData.status === 'Hoàn thành' && !bookingDetailData.behaviorRating && !bookingDetailData.behaviorFeedback) ? (
                                <div className={styles.btn_group}>
                                    <button className={styles.btn_primary} onClick={handleCreateFeedback}>XÁC NHẬN</button>
                                    <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                                </div>
                            ) : (bookingDetailData.status === 'Hoàn thành' && bookingDetailData.behaviorRating && bookingDetailData.behaviorFeedback) ? (
                                <div className={styles.btn_group}>
                                    <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDetail