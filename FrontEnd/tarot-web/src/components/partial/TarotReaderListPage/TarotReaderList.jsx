import React, { useEffect, useState } from 'react';
import styles from './tarot-reader-list.module.scss';
import {
    TextField,
    InputAdornment,
    Button,
    debounce,
    Pagination,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Checkbox
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import { GetTarotReaderList } from '../../../api/TarotReaderApi';
import { useNavigate } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function TarotReaderList() {
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 5;
    const [tarotReaderList, setTarotReaderList] = useState([]);
    const navigate = useNavigate();

    const handleInputSearch = debounce((e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1)
        console.log("a")
    }, 500);


    const handleNavigate = (userId) => {
        navigate('/tarot-reader-detail', { state: { userId } });
    };

    useEffect(() => {
        const fetchTarotReaderList = async () => {
            const response = await GetTarotReaderList(searchValue, currentPage, rowsPerPage);
            if (response.ok) {
                const responseData = await response.json();
                setTarotReaderList(responseData.result);
            } else if (response.status === 404) {
                setTarotReaderList([]);
            }
            else {
                throw new Error('Failed to fetch tarot reader list');
            }
        };

        fetchTarotReaderList();
    }, [searchValue, currentPage])

    return (
        <div>
            <div className='text-center'>
                <h1 className={styles.title} >ĐẶT LỊCH</h1>
                <p className={styles.quote_title}>“Tarot doesn`t predict the future. Tarot facilitates it.”</p>
                <p className={styles.quote_title}>― Philippe St Genoux</p>
            </div>
            <div className='flex justify-center mt-10'>
                <TextField className={styles.txt_search}
                    onChange={handleInputSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    placeholder='Tìm kiếm theo tên tarot reader'
                />
            </div>
            <div className='flex mt-20'>
                <div className='w-full md:w-1/4'>
                    <div className={styles.filter_container}>
                        <div className='text-center'>
                            <h1 className='font-bold text-xl mb-5'>BỘ LỌC</h1>
                        </div>
                        <div className='pl-10'>
                            <h1 className='font-bold'>Giới tính</h1>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            </FormControl>
                            <h1 className='font-bold'>Ngôn ngữ</h1>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Tiếng Anh" />
                                <FormControlLabel control={<Checkbox />} label="Tiếng Việt" />
                                <FormControlLabel control={<Checkbox />} label="Tiếng Trung" />
                                <FormControlLabel control={<Checkbox />} label="Tiếng Hàn" />
                            </FormGroup>
                            <h1 className='font-bold'>Hình thức</h1>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Gọi video" />
                                <FormControlLabel control={<Checkbox />} label="Tin nhắn" />
                            </FormGroup>
                        </div>
                        <div className='flex justify-center'>
                            <button className={styles.btn_book}>LỌC<FilterAltIcon/></button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mb-10 w-full md:w-3/4'>
                    {(tarotReaderList && tarotReaderList.length > 0) ? (
                        tarotReaderList.map((i, index) => (
                            <div key={index} className='flex'
                                style={{
                                    width: '65%',
                                    border: '1px solid #5900E5',
                                    borderRadius: '30px',
                                    height: 'max-content'
                                }}
                            >
                                <div className='w-full md:w-1/2 pt-8 pb-8 flex flex-col items-center'>
                                    <img className={styles.avatar_tarot_reader} src={i.avatarLink} alt='Avatar' />
                                    <div className='mt-4'>
                                        <StarIcon style={{ height: '45px', color: '#5900E5' }} />
                                    </div>
                                </div>
                                <div className='w-full md:w-3/4 pt-5 pr-5 pb-8'>
                                    <div className='flex'>
                                        <h1 className={styles.tarot_reader_name}>{i.nickName}</h1>
                                        <StarIcon style={{ height: '45px', marginLeft: '20px', color: '#5900E5' }} />
                                    </div>
                                    <div className=' mt-1 mb-5'>
                                        <p className={styles.tarot_reader_info}>{i.quote}</p>
                                    </div>

                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Kinh nghiệm:</span> {i.experience} năm</p>

                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Giới tính:</span> Nam</p>
                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Ngôn ngữ:</span> Tiếng Anh,Tiếng Việt</p>
                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Hình thức:</span> Video call, Tin nhắn</p>
                                    <button className={styles.btn_book} onClick={() => handleNavigate(i.userId)}>
                                        ĐẶT LỊCH NGAY <KeyboardArrowRightIcon />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (<p>Không tìm thấy tarot reader phù hợp!</p>)}
                </div>
            </div>
            <div className='flex justify-center mt-10 mb-10'>
                <Pagination count={10} color="primary" />
            </div>

        </div>
    );
}

export default TarotReaderList;
