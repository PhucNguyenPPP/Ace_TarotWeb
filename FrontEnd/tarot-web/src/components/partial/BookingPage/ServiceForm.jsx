import { FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function ServiceForm({ tarotReaderData }) {
    const [selectedService, setSelectedService] = useState('');

    const handleRadioChange = (event) => {
        setSelectedService(event.target.value);
    };

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
                                        style={{
                                            border: '3px solid black',
                                            padding: '5px 10px',
                                            borderRadius: '10px',
                                            textAlign: 'center',
                                            fontWeight: 'bolder'
                                        }}>
                                        <option value=''>1. CHỌN LOẠI BÀI</option>
                                        <option value='TAROT'>TAROT</option>
                                        <option value='BÀI TRÀ'>BÀI TRÀ</option>
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
                                            <div className='pr-8'>
                                                <FormControlLabel
                                                    value="Combo câu hỏi"
                                                    control={<Radio />}
                                                    label="Combo câu hỏi"
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        ml: 2
                                                    }}
                                                >120.000/30 phút
                                                </Typography>
                                            </div>
                                            <div className='pr-8'>
                                                <FormControlLabel
                                                    value="Chủ đề"
                                                    control={<Radio />}
                                                    label="Chủ đề"
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        ml: 2
                                                    }}
                                                >200.000/30 phút
                                                </Typography>
                                            </div>
                                            <div className='pr-8'>
                                                <FormControlLabel
                                                    value="Theo câu hỏi"
                                                    control={<Radio />}
                                                    label="Theo câu hỏi"
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: 20,
                                                        ml: 2
                                                    }}
                                                >30.000/1 câu/8p
                                                </Typography>
                                            </div>
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

                                    {selectedService === "Theo câu hỏi" && (
                                        <div className='flex flex-wrap mb-8'>
                                            <div className='flex flex-wrap w-full'>
                                                <TextField
                                                    type="number"
                                                    inputProps={{
                                                        inputMode: 'numeric',
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
