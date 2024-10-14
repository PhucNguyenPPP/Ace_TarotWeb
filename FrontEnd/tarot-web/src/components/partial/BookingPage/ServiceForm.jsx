import { CircularProgress, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GetServiceOfServiceType, GetServiceTypeOfTarotReader } from '../../../api/ServiceApi';
import { GetAllFormMeetingOfTarotReader } from '../../../api/FormMeetingApi';
import { toast } from 'react-toastify';

function ServiceForm({ tarotReaderData, onDataUpdate, serviceData }) {
    const [serviceType, setServiceType] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [formMeetingList, setFormMeetingList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(serviceData.serviceId || '');
    const [selectedServiceType, setSelectedServiceType] = useState(serviceData.serviceTypeId || '');
    const [selectedServiceName, setSelectedServiceName] = useState(serviceData.serviceName || '');
    const [selectedFormMeeting, setSelectedFormMeeting] = useState(serviceData.formMeetingId || '');
    const [selectedAmount, setSelectedAmount] = useState(serviceData.questionAmount || 0);
    const [selectedServiceDuration, setSelectedServiceDuration] = useState(serviceData.serviceDuration || 0);

    useEffect(() => {
        const fetchServiceTypeOfTarotReader = async () => {
            setIsLoading(true);
            const response = await GetServiceTypeOfTarotReader(tarotReaderData.userId);
            if (response.ok) {
                const responseData = await response.json();
                setServiceType(responseData.result);
            } else {
                throw new Error('Failed to fetch service type of tarot reader');
            }
            setIsLoading(false);
        };

        fetchServiceTypeOfTarotReader();

        const fetchServiceOfServiceType = async () => {
            setIsLoading(true);
            const response = await GetServiceOfServiceType(selectedServiceType);
            if (response.ok) {
                const responseData = await response.json();
                setServiceList(responseData.result);
            } else {
                setServiceList([])
                throw new Error('Failed to fetch service of service type');
            }
            setIsLoading(false);
        };

        fetchServiceOfServiceType();

        const fetchFormMeetingOfTarotReader = async () => {
            setIsLoading(true);
            const response = await GetAllFormMeetingOfTarotReader(tarotReaderData.userId);
            if (response.ok) {
                const responseData = await response.json();
                setFormMeetingList(responseData.result);
            } else {
                setFormMeetingList([]);
                throw new Error('Failed to fetch form meeting of tarot reader');
            }
            setIsLoading(false);
        };

        fetchFormMeetingOfTarotReader();

    }, [selectedServiceType])

    const handleServiceTypeChange = (event) => {
        setSelectedServiceType(event.target.value)
        setSelectedServiceName('');
        setSelectedAmount(0);
    }

    const handleFormMeetingChange = (event) => {
        setSelectedFormMeeting(event.target.value);
    }

    const handleRadioChange = (event) => {
        const serviceId = event.target.value;
        setSelectedService(serviceId);
        setSelectedAmount(0);
        const selectedServiceObject = serviceList.find(service => service.serviceId === serviceId);

        if (selectedServiceObject) {
            setSelectedServiceName(selectedServiceObject.serviceName);
            if(selectedServiceObject.serviceName !== "Theo câu hỏi lẻ"){
                setSelectedServiceDuration(selectedServiceObject.duration);
            } else {
                setSelectedServiceDuration(0);
            }
        }
    };

    const handleInputQuestionAmount = (event) => {
        setSelectedAmount(event.target.value);
        const selectedServiceObject = serviceList.find(service => service.serviceId === selectedService);
        if (selectedServiceObject) {
            if(selectedServiceObject.serviceName === "Theo câu hỏi lẻ"){
                setSelectedServiceDuration(selectedServiceObject.duration * event.target.value);
            }
        }
    }

    useEffect(() => {
        onDataUpdate({
            serviceId: selectedService,
            serviceTypeId: selectedServiceType,
            serviceName: selectedServiceName,
            formMeetingId: selectedFormMeeting,
            questionAmount: selectedAmount,
            serviceDuration: selectedServiceDuration
        });
    }, [selectedFormMeeting, selectedServiceType, selectedService, selectedAmount])

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div>
            <div className='flex'>
                <div className='w-full md:w-1/3'>
                    <Typography
                        sx={{
                            color: '#5900E5',
                            fontSize: 26,
                            textAlign: 'center',
                            mb: 2
                        }}
                    >Thông tin Reader
                    </Typography>
                    <div
                        style={{
                            border: '2px solid #5900E5',
                            borderRadius: '10px'
                        }}>
                        <div
                            style={{
                                backgroundColor: '#5900E5',
                                borderRadius: '10px 10px 0 0',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '60px 0'
                            }}>
                            <img
                                style={{
                                    height: '170px',
                                    width: '170px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }}
                                src={tarotReaderData.avatarLink}
                                alt={tarotReaderData.nickName}
                            />
                        </div>
                        <div
                            style={{
                                borderRadius: '0 0 10px 10px',
                                padding: '30px 0'
                            }}>
                            <Typography
                                sx={{
                                    fontSize: 26,
                                    paddingLeft: '40px'
                                }}
                            >Tên: {tarotReaderData.nickName}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-2/3 pl-20'>
                    <Typography
                        sx={{
                            color: '#5900E5',
                            fontSize: 26,
                            mb: 2
                        }}
                    >Chi tiết
                    </Typography>
                    <div
                        style={{
                            border: '2px solid #5900E5',
                            borderRadius: '10px'
                        }}>
                        <div className='flex'>
                            <div className='w-1/5'
                                style={{
                                    borderRadius: '10px 0 0 0',
                                    borderBottom: '2px solid white',
                                    backgroundColor: '#5900E5',
                                }}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        padding: '30px 10px',
                                        fontWeight: 'bold',
                                    }}
                                >Loại bài
                                </Typography>
                            </div>
                            <div className='w-4/5'
                                style={{
                                    borderBottom: '2px solid #5900E5',
                                }}>
                                <div className='flex justify-center mt-7'>
                                    <select
                                        value={selectedServiceType}
                                        style={{
                                            border: '3px solid black',
                                            padding: '5px 10px',
                                            borderRadius: '10px',
                                            textAlign: 'center',
                                            fontWeight: 'bolder'
                                        }}
                                        onChange={handleServiceTypeChange}
                                    >
                                        <option value=''>1. CHỌN LOẠI BÀI</option>
                                        {serviceType && serviceType.length > 0 &&
                                            serviceType.map((i) => (
                                                <option key={i.serviceTypeId} value={i.serviceTypeId}>
                                                    {i.serviceTypeName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-1/5'
                                style={{
                                    borderBottom: '2px solid white',
                                    backgroundColor: '#5900E5',
                                }}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        padding: '30px 10px',
                                        fontWeight: 'bold',
                                    }}
                                >Hình thức
                                </Typography>
                            </div>
                            <div className='w-4/5'
                                style={{
                                    borderBottom: '2px solid #5900E5',
                                }}>
                                <div className='flex justify-center mt-7'>
                                    <select
                                        value={selectedFormMeeting}
                                        style={{
                                            border: '3px solid black',
                                            padding: '5px 10px',
                                            borderRadius: '10px',
                                            textAlign: 'center',
                                            fontWeight: 'bolder'
                                        }}
                                        onChange={handleFormMeetingChange}
                                    >
                                        <option value=''>1. CHỌN HÌNH THỨC</option>
                                        {formMeetingList && formMeetingList.length > 0 &&
                                            formMeetingList.map((i) => (
                                                <option key={i.formMeetingId} value={i.formMeetingId}>
                                                    {i.formMeetingName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='w-1/5'
                                style={{
                                    backgroundColor: '#5900E5',
                                    borderRadius: '0 0 0 10px',
                                }}>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: 20,
                                        textAlign: 'center',
                                        padding: '30px 10px',
                                        fontWeight: 'bold',
                                    }}
                                >Loại dịch vụ
                                </Typography>
                            </div>
                            <div className='w-4/5'>
                                <div className='ml-10'>
                                    <Typography
                                        sx={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            mt: 2
                                        }}
                                    >Theo gói:
                                    </Typography>
                                    <div className='flex flex-wrap'>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            name="radio-buttons-group"
                                            row={true}
                                            value={selectedService}
                                            onChange={handleRadioChange}
                                        >
                                            {serviceList && serviceList.length > 0 &&
                                                serviceList.map((i) => (
                                                    <div key={i.serviceId} className='pr-8'>
                                                        <FormControlLabel
                                                            value={i.serviceId}
                                                            control={<Radio />}
                                                            label={i.serviceName}
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize: 20,
                                                                ml: 2
                                                            }}
                                                        >
                                                            {new Intl.NumberFormat('vi-VN').format(i.price)} VND
                                                            / {i.duration} phút
                                                        </Typography>
                                                    </div>
                                                ))
                                            }
                                        </RadioGroup>
                                    </div>
                                </div>

                                <div className='ml-10'>
                                    <Typography
                                        sx={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            mt: 2,
                                            mb: 2
                                        }}
                                    >Theo câu hỏi:
                                    </Typography>

                                    {selectedServiceName === "Theo câu hỏi lẻ" && (
                                        <div className='flex flex-wrap mb-8'>
                                            <div className='flex flex-wrap w-full'>
                                                <TextField
                                                    onChange={handleInputQuestionAmount}
                                                    type="number"
                                                    value={selectedAmount}
                                                    inputProps={{
                                                        inputMode: 'numeric',
                                                        min: 0,
                                                        max: 10,
                                                        sx: {
                                                            padding: '5px 5px',
                                                        },
                                                    }}
                                                    sx={{
                                                        width: '50px',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceForm;
