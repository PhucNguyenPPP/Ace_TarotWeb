import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';
import StarIcon from '@mui/icons-material/Star';
import styles from './tarot-reader-detail.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function TarotReaderDetail() {
    const location = useLocation();
    const { userId } = location.state || {};
    const [tarotReaderData, setTarotReaderData] = useState(null);
    const navigate = useNavigate();

    const handleNavigate = (userId) => {
        navigate('/booking-step', { state: { userId } });
    };

    useEffect(() => {
        if (userId) {
            const fetchTarotReaderDetail = async () => {

                const response = await GetTarotReaderDetail(userId);
                if (response.ok) {
                    const responseData = await response.json();
                    setTarotReaderData(responseData.result);
                } else {
                    throw new Error('Failed to fetch tarot reader detail');
                }

            };

            fetchTarotReaderDetail();
        }
    }, [userId]);



    if (!tarotReaderData) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <CircularProgress color='primary' />
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
                                <li>4.6: 72 reviewed</li>
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
        </div>
    );
}

export default TarotReaderDetail;
