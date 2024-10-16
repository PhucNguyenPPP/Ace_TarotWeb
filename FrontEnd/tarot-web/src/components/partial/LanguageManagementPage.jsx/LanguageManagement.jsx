import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { GetAllLanguage, GetAllLanguageOfTarotReader } from '../../../api/LanguageApi';

function LanguageManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState([]);
    const [registeredLanguage, setRegisteredLanguage] = useState([]);
    const { user } = useAuth();

    const fetchAllLanguage = async () => {
        const response = await GetAllLanguage();
        if (response.ok) {
            const responseData = await response.json();
            setLanguage(responseData.result);
        } else {
            setLanguage([]);
            console.log('Failed to fetch all languages');
        }
    };

    const fetchLanguageOfTarotReader = async () => {
        const response = await GetAllLanguageOfTarotReader(user.userId)
        if (response.ok) {
            const responseData = await response.json();
            setRegisteredLanguage(responseData.result);
        } else {
            setRegisteredLanguage([]);
            console.log('Failed to fetch languages of tarot reader');
        }

    };

    useEffect(() => {
        setIsLoading(true);
        fetchAllLanguage();
        if (user) {
            fetchLanguageOfTarotReader();
        }
        setIsLoading(false);
    }, [user]);

    const handleRegister = (languageId) => {
        alert(`Đăng ký cho ngôn ngữ có ID: ${languageId}`);
        // Thêm logic đăng ký ở đây (ví dụ: gọi API)
    };

    const handleUnregister = (languageId) => {
        alert(`Hủy đăng ký cho ngôn ngữ có ID: ${languageId}`);
        // Thêm logic hủy đăng ký ở đây (ví dụ: gọi API)
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='w-full flex justify-center items-center'
            style={{
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover'
            }}>
            <TableContainer style={{ width: '70%', height: 'max-content' }} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", fontSize: '25px' }}>Ngôn ngữ</TableCell>
                            <TableCell style={{ fontWeight: "bold", fontSize: '25px' }} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {language && language.length > 0 && language.map((i) => (
                            <TableRow key={i.languageId}>
                                <TableCell  style={{ fontSize: '20px' }} >
                                    {i.languageName}
                                </TableCell>
                                <TableCell align="right">
                                    {registeredLanguage.some((registeredLanguage) => registeredLanguage.languageId === i.languageId) ? (
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'red' }}
                                            onClick={() => handleUnregister(i.languageId)}
                                        >
                                            Hủy Đăng ký
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#5900E5' }}
                                            onClick={() => handleRegister(i.languageId)}
                                        >
                                            Đăng ký
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default LanguageManagement;