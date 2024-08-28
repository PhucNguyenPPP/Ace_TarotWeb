import React, { useEffect, useState } from 'react';
import styles from './tarot-reader-list.module.scss';
import { TextField, InputAdornment, Button, debounce, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import { GetTarotReaderList } from '../../../api/TarotReaderApi';
function TarotReaderList() {
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 5;
    const [tarotReaderList, setTarotReaderList] = useState([])

    const handleInputSearch = debounce((e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1)
        console.log("a")
    }, 500);

    useEffect(() => {
        const fetchTarotReaderList = async () => {
            const response = await GetTarotReaderList(searchValue, currentPage, rowsPerPage);
            console.log(response)
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
            <div className='flex justify-center items-center mt-10 mb-20'>
                <p className='font-bold'>Filter:</p>
                <select className={styles.filter_select}>
                    <option value='0'>NGÔN NGỮ</option>
                </select>
                <select className={styles.filter_select}>
                    <option value='0'>GIỚI TÍNH</option>
                </select>
                <select className={styles.filter_select}>
                    <option value='0'>HÌNH THỨC</option>
                </select>
            </div>
            <div className='flex justify-center mb-10'>
                {(tarotReaderList && tarotReaderList.length > 0) ? (
                    tarotReaderList.map((i, index) => (
                        <div key={index} className='flex'
                            style={{
                                width: '45%',
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
                                    <h1 className={styles.tarot_reader_name}>{i.fullName}</h1>
                                    <StarIcon style={{ height: '45px', marginLeft: '20px', color: '#5900E5' }} />
                                </div>
                                <div className=' mt-1 mb-5'>
                                    <p className={styles.tarot_reader_info}>{i.quote}</p>
                                </div>

                                <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Kinh nghiệm:</span> {i.experience} năm</p>

                                <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Giới tính:</span> Nam</p>
                                <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Ngôn ngữ:</span> Tiếng Anh,Tiếng Việt</p>
                                <p className={styles.tarot_reader_info}><span className='font-semibold text-black'>Hình thức:</span> Video call, Tin nhắn</p>
                                <button className={styles.btn_book}>ĐẶT LỊCH NGAY <KeyboardArrowRightIcon /></button>
                            </div>
                        </div>
                    ))
                ) : (<p>Không tìm thất tarot reader phù hợp!</p>)}
            </div>
            <div className='flex justify-center mt-10 mb-10'>
                <Pagination count={10} color="primary" />
            </div>

        </div>
    );
}

export default TarotReaderList;
