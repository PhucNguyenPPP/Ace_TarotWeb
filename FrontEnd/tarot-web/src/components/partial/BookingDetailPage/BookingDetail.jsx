import { useState, useEffect } from 'react';
import styles from './booking-detail.module.scss';
import { CircularProgress, Rating, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import { CompleteBookingByCustomer, CompleteBookingByTarotReader, CreateFeedback, GetBookingDetail, SendRequestComplaint } from '../../../api/BookingApi';
import { toast } from 'react-toastify';
import StarIcon from '@mui/icons-material/Star';
import useAuth from '../../../hooks/useAuth';
import { useDropzone } from 'react-dropzone';
import { CreatePaymentPayOsUrl } from '../../../api/PaymentApi';

function BookingDetail() {
    const location = useLocation();
    const { bookingId } = location.state || {};
    const [bookingDetailData, setBookingDetailData] = useState(null);
    const [ratingStar, setRatingStar] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    // State for popup and form fields
    const [openPopup, setOpenPopup] = useState(false);
    const [complaintText, setComplaintText] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);

    const formatDateTime = (date, options) => {
        return new Intl.DateTimeFormat('vi-VN', options).format(new Date(date));
    };

    const fetchGetBookingDetail = async () => {
        setIsLoading(true);
        const response = await GetBookingDetail(bookingId);
        if (response.ok) {
            const responseData = await response.json();
            setBookingDetailData(responseData.result);
        } else {
            const responseData = await response.json();
            toast.error(responseData.result);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (bookingId) {
            fetchGetBookingDetail();
        }
    }, [bookingId]);

    const handleCreateFeedback = async () => {
        if (ratingStar <= 0 || ratingStar > 5) {
            toast.error('Vui lòng chọn số sao');
            return;
        }

        if (feedback === '') {
            toast.error('Vui lòng nhập nội dung đánh giá');
            return;
        }

        setIsLoading(true);
        const response = await CreateFeedback(bookingId, ratingStar, feedback);
        if (response.ok) {
            toast.success('Đánh giá thành công');
            fetchGetBookingDetail();
        } else {
            const responseData = await response.json();
            toast.error('Đánh giá thất bại: ' + responseData.message);
        }
        setIsLoading(false);
    };

    const handleCompleteByTarotReader = async () => {
        setIsLoading(true);
        const response = await CompleteBookingByTarotReader(bookingId);
        if (response.ok) {
            toast.success('Xác nhận hoàn thành lịch hẹn thành công');
            fetchGetBookingDetail();
        } else {
            const responseData = await response.json();
            toast.error(responseData.message);
        }
        setIsLoading(false);
    };

    const handleCompleteByCustomer = async () => {
        setIsLoading(true);
        const response = await CompleteBookingByCustomer(bookingId);
        if (response.ok) {
            toast.success('Xác nhận hoàn thành lịch hẹn thành công');
            fetchGetBookingDetail();
        } else {
            const responseData = await response.json();
            toast.error(responseData.message);
        }
        setIsLoading(false);
    };

    const handlePaymentByCustomer = async () => {
        window.location.href = bookingDetailData.payOsUrlPayment;
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setUploadedImages(prev => [...prev, ...acceptedFiles]);
        }
    });

    const openRequestComplaint = () => {
        setOpenPopup(true);
    };

    const handleSubmitComplaint = async () => {
        if (complaintText === '') {
            toast.error("Vui lòng nhập nội dung khiếu nại");
            return;
        }

        if (uploadedImages.length === 0) {
            toast.error("Vui lòng cung cấp hình ảnh");
            return;
        }

        setIsLoading(true);
        const response = await SendRequestComplaint(bookingId, complaintText, uploadedImages)
        if (response.ok) {
            toast.success('Gửi khiếu nại thành công');
            setOpenPopup(false);
            fetchGetBookingDetail();
        } else {
            const responseData = await response.json();
            toast.error(responseData.message);
        }
        setIsLoading(false);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleNavigateChat = (customerId, tarotReaderId) => {
        navigate('/chat', { state: { customerId, tarotReaderId } });
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    if (!bookingDetailData) {
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
                <h1 className='font-bold text-3xl pt-10 pl-14 text-white'>LỊCH HẸN CHI TIẾT</h1>
            </div>
            <div className={styles.container_content}>

                <div className={styles.header_content}>
                    {user.roleName === 'Tarot Reader' && (
                        <p className={styles.tarot_reader_name}>Khách hàng: {bookingDetailData.customerName}</p>
                    )}
                    {user.roleName === 'Customer' && (
                        <p className={styles.tarot_reader_name}>Tarot Reader: {bookingDetailData.tarotReaderName}</p>
                    )}
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
                        {bookingDetailData.formMeetingName === "Gọi video"
                            && bookingDetailData.status === 'Đã thanh toán'
                            &&
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
                        }

                        {bookingDetailData.formMeetingName === "Nhắn tin"
                            && bookingDetailData.status === 'Đã thanh toán'
                            &&
                            (
                                <div className={styles.content_row}>
                                    <a
                                        className={styles.meetLink}
                                        onClick={() => handleNavigateChat(bookingDetailData.customerId, bookingDetailData.tarotReaderId)}
                                    >
                                        Nhắn tin
                                    </a>
                                </div>
                            )
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
                            (bookingDetailData.status === 'Hoàn thành'
                                && !bookingDetailData.behaviorRating
                                && !bookingDetailData.behaviorFeedback
                                && user.roleName === 'Customer') ? (
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
                            ) : (bookingDetailData.status === 'Hoàn thành'
                                && bookingDetailData.behaviorRating
                                && bookingDetailData.behaviorFeedback) ? (
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
                    </div>

                    {
                        (bookingDetailData.status === 'Hoàn thành'
                            && !bookingDetailData.behaviorRating
                            && !bookingDetailData.behaviorFeedback
                            && user.roleName === 'Customer') ? (
                            <div className={styles.btn_group}>
                                <button className={styles.btn_primary} onClick={handleCreateFeedback}>XÁC NHẬN</button>
                                <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                            </div>
                        ) : (bookingDetailData.status === 'Hoàn thành'
                            && bookingDetailData.behaviorRating
                            && bookingDetailData.behaviorFeedback) ? (
                            <div className={styles.btn_group}>
                                <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                            </div>
                        ) : null
                    }

                    {
                        (bookingDetailData.status === 'Chưa thanh toán'
                            && user.roleName === 'Customer'
                        ) ? (
                            <div className={styles.btn_group}>
                                <div>
                                    <button className={styles.btn_primary} onClick={handlePaymentByCustomer}>THANH TOÁN</button>
                                </div>
                                <div>
                                    <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                                </div>
                            </div>
                        ) : null
                    }

                    {
                        (bookingDetailData.status === 'Đã thanh toán'
                            && user.roleName === 'Tarot Reader'
                        ) ? (
                            <div className={styles.btn_group}>
                                <div>
                                    <button className={styles.btn_primary} onClick={handleCompleteByTarotReader}>HOÀN THÀNH</button>
                                </div>
                                <div>
                                    <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                                </div>
                            </div>
                        ) : null
                    }
                    {(bookingDetailData.status === 'Chờ xác nhận hoàn thành'
                        && user.roleName === 'Customer') ? (
                        <div className={styles.btn_group}>
                            <div>
                                <button className={styles.btn_primary} onClick={handleCompleteByCustomer}>HOÀN THÀNH</button>
                                {/* <button className={styles.btn_complaint} onClick={openRequestComplaint}>KHIẾU NẠI</button> */}
                            </div>
                            <div>
                                <button className={styles.btn_back} onClick={handleBack}>QUAY LẠI</button>
                            </div>
                        </div>
                    ) : null}

                    {/* <Dialog open={openPopup} onClose={handleClosePopup}>
                        <DialogTitle className='text-center'
                            style={{ fontWeight: 'bold' }}>Gửi khiếu nại</DialogTitle>
                        <DialogContent>
                            <div className='mb-4'>
                                <Textarea
                                    placeholder='Nội dung khiếu nại'
                                    minRows={5}
                                    style={{ width: '100%' }}
                                    onChange={(event) => {
                                        setComplaintText(event.target.value);
                                    }}
                                />
                            </div>
                            <div {...getRootProps()} className={styles.dropzone}>
                                <input {...getInputProps()} />
                                <p>Kéo và thả ảnh vào đây hoặc nhấp để chọn ảnh</p>
                            </div>
                            <div className={styles.image_preview}>
                                {uploadedImages.map((file, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        className={styles.preview_image}
                                    />
                                ))}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClosePopup} color="secondary">
                                Hủy
                            </Button>
                            <Button onClick={handleSubmitComplaint} color="primary">
                                Gửi khiếu nại
                            </Button>
                        </DialogActions>
                    </Dialog> */}
                </div>
            </div>
        </div>
    );
}

export default BookingDetail