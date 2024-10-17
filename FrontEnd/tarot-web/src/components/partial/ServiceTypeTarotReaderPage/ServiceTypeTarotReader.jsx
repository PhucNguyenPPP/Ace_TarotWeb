import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './ServiceTypeTarotReader.module.scss'; // Importing the SCSS module
import useAuth from '../../../hooks/useAuth';
import { GetServiceTypeOfSystem, GetServiceTypeOfTarotReader, RegisterServiceByTarotReader, RemoveServiceByTarotReader } from '../../../api/ServiceApi';
import { toast } from 'react-toastify';

const ServiceTypeTarotReader = () => {
    const [serviceTypes, setServiceTypes] = useState([]);
    const [serviceTypesTarotReader, setServiceTypesTarotReader] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const fetchAllServiceTypesOfTarotReader = async () => {
        const response = await GetServiceTypeOfTarotReader(user.userId);
        if (response.ok) {
            const responseData = await response.json();
            setServiceTypesTarotReader(responseData.result);
        } else {
            setServiceTypesTarotReader([])
            console.error('Failed to fetch all service types of tarot reader');
        }
    };

    const fetchAllServiceTypesOfSystem = async () => {
        const response = await GetServiceTypeOfSystem();
        if (response.ok) {
            const responseData = await response.json();
            setServiceTypes(responseData.result);
        } else {
            setServiceTypes([]);
            console.error('Failed to fetch all service types of system');
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            await fetchAllServiceTypesOfSystem();
            if (user) {
                await fetchAllServiceTypesOfTarotReader();
            }
            setIsLoading(false);
        };
        loadData();
    }, [user]);

    // Create a set of service type IDs from serviceTypesTarotReader
    const registeredServiceTypeIds = new Set(serviceTypesTarotReader.map(serviceType => serviceType.serviceTypeId));

    const handleRegister = async (serviceTypeId) => {
        if (user) {
            setIsLoading(true);
            const response = await RegisterServiceByTarotReader(user.userId, serviceTypeId);
            if (response.ok) {
                toast.success("Đăng ký dịch vụ thành công ")
                const loadData = async () => {
                    await fetchAllServiceTypesOfSystem();
                    await fetchAllServiceTypesOfTarotReader();
                };
                loadData();
            } else {
                toast.error("Đăng ký dịch vụ thất bại")
            }
            setIsLoading(false);
        }
    }

    const handleRemove = async (serviceTypeId) => {
        if (user) {
            setIsLoading(true);
            const response = await RemoveServiceByTarotReader(user.userId, serviceTypeId);
            if (response.ok) {
                toast.success("Hủy đăng ký dịch vụ thành công ")
                const loadData = async () => {
                    await fetchAllServiceTypesOfSystem();
                    await fetchAllServiceTypesOfTarotReader();
                };
                loadData();
            } else {
                toast.error("Hủy đăng ký dịch vụ thất bại")
            }
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div style={{
                backgroundImage: 'url(/image/price_banner.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '230px',
                aspectRatio: 'auto'
            }}>
            </div>
            <div className={styles.tableContainer}>
                <TableContainer component={Paper}>
                    {isLoading ? (
                        <div className={styles.loadingContainer}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <Table aria-label="simple table"
                            sx={{
                                border: '2px solid black',
                                '& th': {
                                    border: '2px solid black',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                },
                                '& td': {
                                    border: '2px solid black',
                                    fontWeight: 'bold',
                                    color: '#5900e5'
                                },
                            }}>
                            <TableHead>
                                <TableRow className={styles.tableHeader}>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Loại dịch vụ</TableCell>
                                    <TableCell>Dịch vụ</TableCell>
                                    <TableCell>Giá tiền</TableCell>
                                    <TableCell>Thời lượng (phút)</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell>Đăng ký</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {serviceTypes.map((serviceType, serviceTypeIndex) => {
                                    const isRegistered = registeredServiceTypeIds.has(serviceType.serviceTypeId);
                                    const totalServices = serviceType.services.length;

                                    return serviceType.services.map((service, serviceIndex) => {
                                        const isFirstRowForType = serviceIndex === 0;

                                        return (
                                            <TableRow key={service.serviceId}>
                                                <TableCell>{serviceTypeIndex + 1}.{serviceIndex + 1}</TableCell>
                                                {isFirstRowForType && (
                                                    <TableCell rowSpan={totalServices}>
                                                        {serviceType.serviceTypeName}
                                                    </TableCell>
                                                )}
                                                <TableCell className={styles.highlightedText}>{service.serviceName}</TableCell>
                                                <TableCell style={{ textAlign: 'right' }}>{service.price.toLocaleString()}đ</TableCell>
                                                <TableCell style={{ textAlign: 'right' }}>{service.duration}</TableCell>

                                                {isFirstRowForType ? (
                                                    <TableCell style={{ textAlign: 'center' }} rowSpan={totalServices}>
                                                        {isRegistered ? 'Đã đăng ký' : 'Chưa đăng ký'}
                                                    </TableCell>
                                                ) : null}


                                                {isFirstRowForType && (
                                                    <TableCell style={{ textAlign: 'center' }} rowSpan={totalServices}>
                                                        {!isRegistered ? (
                                                            <Button onClick={() => handleRegister(serviceType.serviceTypeId)} variant="contained" style={{ backgroundColor: '#5900e5' }} className={styles.registerButton}>
                                                                Đăng ký
                                                            </Button>
                                                        ) : (<Button onClick={() => handleRemove(serviceType.serviceTypeId)} variant="contained" style={{ backgroundColor: 'red' }} className={styles.registerButton}>
                                                            Hủy Đăng Ký
                                                        </Button>)}
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    });
                                })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </div>
        </div>
    );
};

export default ServiceTypeTarotReader;
