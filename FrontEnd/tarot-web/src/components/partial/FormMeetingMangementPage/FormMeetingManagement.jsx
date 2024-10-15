import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { GetAllFormMeeting, GetAllFormMeetingOfTarotReader } from '../../../api/FormMeetingApi';
import useAuth from '../../../hooks/useAuth';

function FormMeetingManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [formMeeting, setFormMeeting] = useState([]);
    const [registeredFormMeeting, setRegisteredFormMeeting] = useState([]);
    const { user } = useAuth();

    const fetchAllFormMeeting = async () => {
        const response = await GetAllFormMeeting();
        if (response.ok) {
            const responseData = await response.json();
            setFormMeeting(responseData.result);
        } else {
            setFormMeeting([]);
            console.log('Failed to fetch all form meetings');
        }
    };

    const fetchFormMeetingOfTarotReader = async () => {
        const response = await GetAllFormMeetingOfTarotReader(user.userId);
        if (response.ok) {
            const responseData = await response.json();
            setRegisteredFormMeeting(responseData.result);
        } else {
            setRegisteredFormMeeting([]);
            console.log('Failed to fetch form meetings of tarot reader');
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchAllFormMeeting();
        if (user) {
            fetchFormMeetingOfTarotReader();
        }
        setIsLoading(false);
    }, [user]);

    const handleRegister = (formMeetingId) => {
        alert(`Đăng ký cho hình thức có ID: ${formMeetingId}`);
        // Thêm logic đăng ký ở đây (ví dụ: gọi API)
    };

    const handleUnregister = (formMeetingId) => {
        alert(`Hủy đăng ký cho hình thức có ID: ${formMeetingId}`);
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
                            <TableCell style={{ fontWeight: "bold", fontSize: '25px' }}>Hình thức</TableCell>
                            <TableCell style={{ fontWeight: "bold", fontSize: '25px' }} align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formMeeting && formMeeting.length > 0 && formMeeting.map((form) => (
                            <TableRow key={form.formMeetingId}>
                                <TableCell  style={{ fontSize: '20px' }} >
                                    {form.formMeetingName}
                                </TableCell>
                                <TableCell align="right">
                                    {registeredFormMeeting.some((registeredForm) => registeredForm.formMeetingId === form.formMeetingId) ? (
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: 'red' }}
                                            onClick={() => handleUnregister(form.formMeetingId)}
                                        >
                                            Hủy Đăng ký
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#5900E5' }}
                                            onClick={() => handleRegister(form.formMeetingId)}
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

export default FormMeetingManagement;
