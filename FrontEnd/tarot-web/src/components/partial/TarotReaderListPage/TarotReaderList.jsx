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
    Checkbox,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from '@mui/icons-material/Star';
import { GetTarotReaderList } from '../../../api/TarotReaderApi';
import { useNavigate } from 'react-router-dom';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { GetAllLanguage } from '../../../api/LanguageApi';
import { GetAllFormMeeting } from '../../../api/FormMeetingApi';

function TarotReaderList() {
    const [searchValue, setSearchValue] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 5;
    const [tarotReaderList, setTarotReaderList] = useState([]);
    const [languageFilter, setLanguageFilter] = useState([]);
    const [genderFilter, setGenderFilter] = useState('');
    const [formFilter, setFormFilter] = useState([]);
    const [languageData, setLanguageData] = useState([]);
    const [formMeetingData, setFormMeetingData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputSearch = debounce((e) => {
        setSearchValue(e.target.value);
        setCurrentPage(1);
    }, 500);

    const handleNavigate = (userId) => {
        navigate('/tarot-reader-detail', { state: { userId } });
    };

    const handleGenderFilterChange = (event) => {
        setGenderFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleLanguageFilterChange = (event) => {
        const value = event.target.value;
        setLanguageFilter(prev =>
            prev.includes(value) ? prev.filter(lang => lang !== value) : [...prev, value]
        );
        setCurrentPage(1);
    };

    const handleFormFilterChange = (event) => {
        const value = event.target.value;
        setFormFilter(prev =>
            prev.includes(value) ? prev.filter(form => form !== value) : [...prev, value]
        );
        setCurrentPage(1);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const fetchAllLanguage = async () => {
            setIsLoading(true);
            const response = await GetAllLanguage();
            if (response.ok) {
                const responseData = await response.json();
                setLanguageData(responseData.result);
            } else {
                throw new Error('Failed to fetch all language');
            }
            setIsLoading(false);
        }

        fetchAllLanguage();

        const fetchAllFormMeeting = async () => {
            setIsLoading(true);
            const response = await GetAllFormMeeting();
            if (response.ok) {
                const responseData = await response.json();
                setFormMeetingData(responseData.result);
            } else {
                throw new Error('Failed to fetch all form meeting');
            }
            setIsLoading(false);
        }

        fetchAllFormMeeting();

        const fetchTarotReaderList = async () => {
            setIsLoading(true);
            const response = await GetTarotReaderList(searchValue, currentPage,
                rowsPerPage, genderFilter, languageFilter, formFilter);
            if (response.ok) {
                const responseData = await response.json();
                setTarotReaderList(responseData.result);
            } else if (response.status === 404) {
                setTarotReaderList([]);
            } else {
                throw new Error('Failed to fetch tarot reader list');
            }
            setIsLoading(false);
        };

        fetchTarotReaderList();
    }, [searchValue, currentPage, genderFilter, languageFilter, formFilter]);

    return (
        <div>
            <div className='text-center'>
                <h1 className={styles.title}>ĐẶT LỊCH</h1>
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
                            <h1 className='font-bold text-xl mb-5'>BỘ LỌC<FilterAltIcon /></h1>
                        </div>
                        <div className='pl-10'>
                            <h1 className='font-bold'>Giới tính</h1>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="gender-radio-group-label"
                                    name="gender-radio-group"
                                    value={genderFilter}
                                    onChange={handleGenderFilterChange}
                                >
                                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                    <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
                                </RadioGroup>
                            </FormControl>
                            <h1 className='font-bold'>Ngôn ngữ</h1>
                            <FormGroup>
                                {languageData && languageData.length > 0 && (
                                    languageData.map((language) => (
                                        <FormControlLabel
                                            control={<Checkbox value={language.languageId}
                                                checked={languageFilter.includes(language.languageId)}
                                                onChange={handleLanguageFilterChange} />}
                                            label={language.languageName}
                                        />
                                    ))
                                )}
                            </FormGroup>
                            <h1 className='font-bold'>Hình thức</h1>
                            <FormGroup>
                                {formMeetingData && formMeetingData.length > 0 && (
                                    formMeetingData.map((formMeeting) => (
                                        <FormControlLabel
                                            control={<Checkbox value={formMeeting.formMeetingId}
                                                checked={formFilter.includes(formMeeting.formMeetingId)}
                                                onChange={handleFormFilterChange} />}
                                            label={formMeeting.formMeetingName}
                                        />
                                    ))
                                )}
                            </FormGroup>
                        </div>

                    </div>
                </div>
                <div className='mb-10 w-full md:w-3/4 ml-32'>
                    {(tarotReaderList.tarotReaderDetailDTOs && tarotReaderList.tarotReaderDetailDTOs.length > 0) ? (
                        tarotReaderList.tarotReaderDetailDTOs.map((i, index) => (
                            <div key={index} className='flex'
                                style={{
                                    width: '65%',
                                    border: '1px solid #5900E5',
                                    borderRadius: '30px',
                                    height: 'max-content',
                                    marginBottom: '80px'
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
                                    <div className='mb-2'>
                                        <p className={styles.tarot_reader_info}>{i.quote}</p>
                                    </div>

                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black mr-2'>Kinh nghiệm:</span> {i.experience} năm</p>

                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black mr-2'>Giới tính:</span> {i.gender}</p>
                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black mr-2'>Ngôn ngữ:</span>
                                        {i.languageOfReader
                                            && i.languageOfReader.length > 0
                                            && (
                                                i.languageOfReader.map((l) => (
                                                    l.languageName + " | "
                                                ))
                                            )}
                                    </p>
                                    <p className={styles.tarot_reader_info}><span className='font-semibold text-black mr-2'>Hình thức:</span>
                                        {i.formMeetingOfReaderDTOs
                                            && i.formMeetingOfReaderDTOs.length > 0
                                            && (
                                                i.formMeetingOfReaderDTOs.map((f) => (
                                                    f.formMeetingName + " | "
                                                ))
                                            )}
                                    </p>
                                    <button className={styles.btn_book} onClick={() => handleNavigate(i.userId)}>
                                        ĐẶT LỊCH NGAY <KeyboardArrowRightIcon />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-col justify-center items-center'>
                            <div style={{ marginLeft: '-20%' }} >
                                <p className='font-bold text-red-500'>Không tìm thấy tarot reader phù hợp!</p>
                            </div>
                        </div>)}
                </div>
            </div>
            <div className='flex justify-center mt-10 mb-10'>
                <Pagination
                    count={tarotReaderList.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
}

export default TarotReaderList;
