import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';
import StarIcon from '@mui/icons-material/Star';
import styles from './tarot-reader-detail.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import useAuth from '../../../hooks/useAuth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

function TarotReaderDetail() {
    const location = useLocation();
    const { userId } = location.state || {};
    const [tarotReaderData, setTarotReaderData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false); // State for dialog
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleNavigate = (userId) => {
        if(!user){
            toast.error("Vui lòng đăng nhập để đặt lịch");
            return;
        }

        if (!user.isVerified) {
            setOpenDialog(true);
        }

        navigate('/booking-step', { state: { userId } });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleVerifyNavigate = () => {
        setOpenDialog(false);
        navigate('/verify'); // Navigate to the verify page
    };

    useEffect(() => {
        if (userId) {
            const fetchTarotReaderDetail = async () => {
                setIsLoading(true);
                const response = await GetTarotReaderDetail(userId);
                if (response.ok) {
                    const responseData = await response.json();
                    setTarotReaderData(responseData.result);
                } else {
                    throw new Error('Failed to fetch tarot reader detail');
                }
                setIsLoading(false);
            };

            fetchTarotReaderDetail();
        }
    }, [userId]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    if (!tarotReaderData) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='p-10'
            style={{
                height: 'max-width',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover',
            }}>
            <div className='text-center'>
                <StarIcon style={{ height: '45px', color: 'white' }} />
                <h1 className={styles.title}>TAROT READER</h1>
            </div>
            <div className='flex justify-center mt-10'>
                <div className={styles.container_content}>
                    <div className='flex mt-16'>
                        <div className='w-full md:w-1/2 p-5 flex flex-col items-center'>
                            <img className={styles.avatar_tarot_reader} src={tarotReaderData.avatarLink} alt='Avatar' />
                            <h1 className={styles.quote}>{tarotReaderData.quote}</h1>
                        </div>
                        <div className='w-full md:w-1/2 p-5'>
                            <h1 className={styles.tarot_reader_fullname}>{tarotReaderData.fullName}</h1>
                            <p className={styles.tarot_reader_name}>{tarotReaderData.nickName}</p>
                            <p className={styles.tarot_reader_description}>{tarotReaderData.description}</p>
                            <ul className={styles.tarot_reader_info}>
                                <li>{tarotReaderData.experience} năm kinh nghiệm</li>
                                <li>{tarotReaderData.averageRating} <StarBorderOutlinedIcon style={{marginTop: '-3px'}} />: {tarotReaderData.totalAmountCompletedBooking} reviewed</li>
                            </ul>
                            <div className={styles.info_box}>
                                <p>{tarotReaderData.gender}</p>
                            </div>
                            <div className='flex mt-5'>
                                {tarotReaderData.languageOfReader
                                    && tarotReaderData.languageOfReader.length > 0
                                    && tarotReaderData.languageOfReader.map((i, index) => (
                                        <div className={styles.info_box} key={index}>
                                            <p>{i.languageName}</p>
                                        </div>
                                    ))}

                            </div>
                            <div className='flex mt-5'>
                                {tarotReaderData.formMeetingOfReaderDTOs
                                    && tarotReaderData.formMeetingOfReaderDTOs.length > 0
                                    && tarotReaderData.formMeetingOfReaderDTOs.map((i, index) => (
                                        <div className={styles.info_box} key={index}>
                                            <p>{i.formMeetingName}</p>
                                        </div>
                                    ))}

                            </div>
                            <div className='flex justify-end mt-10'>
                                <button className={styles.btn_book} onClick={() => handleNavigate(userId)}>
                                    ĐẶT LỊCH NGAY <KeyboardArrowRightIcon />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog for unverified users */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Xác thực tài khoản"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Vui lòng xác thực tài khoản để đặt lịch.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} style={{ backgroundColor: 'red', color: 'white'}}>
                        Hủy
                    </Button>
                    <Button onClick={handleVerifyNavigate}  style={{ backgroundColor: '#5900E5', color: 'white'}} autoFocus>
                        Xác thực ngay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TarotReaderDetail;
