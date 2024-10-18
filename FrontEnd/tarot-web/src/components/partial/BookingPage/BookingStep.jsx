import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';
import { CircularProgress } from '@mui/material';
import ServiceForm from './ServiceForm';
import TimeForm from './TimeForm';
import PaymentForm from './PaymentForm';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';

const steps = ['Chọn loại dịch vụ', 'Chọn khung thời gian', 'Thanh toán'];

export default function BookingStep() {
  const [activeStep, setActiveStep] = useState(0);
  const [tarotReaderData, setTarotReaderData] = useState(null);
  const [timeData, setTimeData] = useState(null);
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    serviceId: '',
    serviceTypeId: '',
    serviceName: '',
    formMeetingId: '',
    questionAmount: 0,
    serviceDuration: 0
  });

  const location = useLocation();
  const { userId } = location.state || {};
  const { user } = useAuth();

  useEffect(() => {
    if (!user.isVerified) {
      navigate('/');
    }
  }, [user])

  useEffect(() => {
    if (userId) {
      const fetchTarotReaderDetail = async () => {
        try {
          const response = await GetTarotReaderDetail(userId);
          if (response.ok) {
            const responseData = await response.json();
            setTarotReaderData(responseData.result);
          } else {
            throw new Error('Failed to fetch tarot reader detail');
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchTarotReaderDetail();
    }
  }, [userId]);

  const handleNext = () => {
    if (!serviceData.serviceId || !serviceData.formMeetingId) {
      toast.error('Vui lòng chọn đầy đủ thông tin.');
      return;
    }

    if (serviceData.serviceName === 'Theo câu hỏi lẻ' && serviceData.questionAmount <= 0) {
      toast.error('Vui lòng nhập số câu hỏi muốn xem.');
      return;
    }

    if (serviceData.serviceName === 'Theo câu hỏi lẻ' && serviceData.questionAmount > 10) {
      toast.error('Số câu hỏi tối đa được chọn là 10');
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setServiceData(null);
    setTimeData(null);
  };

  const handleDataUpdate = (data) => {
    setServiceData(prevData => ({
      ...prevData,
      ...data
    }));
  };


  const renderForm = () => {
    switch (activeStep) {
      case 0:
        console.log(serviceData)
        return tarotReaderData ? (
          <ServiceForm tarotReaderData={tarotReaderData} onDataUpdate={handleDataUpdate} serviceData={serviceData} />
        ) : (
          <CircularProgress />
        );
      case 1:
        return <TimeForm tarotReaderData={tarotReaderData} serviceData={serviceData} />;
      case 2:
        return <PaymentForm />;
      default:
        return null;
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <div className='bg-black h-14'></div>
      <div style={{ minHeight: '100vh', maxHeight: 'max-content', width: '100%', backgroundColor: 'white', padding: '20px 0' }}>
        <div className='flex justify-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', margin: '0 auto' }}>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: 36, textAlign: 'center', mb: 5 }}>
              ĐẶT LỊCH VỚI READER
            </Typography>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you're finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ pt: 5 }}>
                  {renderForm()}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                      mr: 1,
                      color: 'white !important',
                      backgroundColor: '#9747FF',
                      borderRadius: '30px',
                      padding: '0 30px',
                      '&:hover': {
                        backgroundColor: 'gray',
                        color: 'black !important',
                      }
                    }}
                  >
                    Trở về
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button
                    onClick={handleNext}
                    sx={{
                      mr: 1,
                      color: 'white !important',
                      backgroundColor: '#9747FF',
                      borderRadius: '30px',
                      padding: '8px 20px',
                      '&:hover': {
                        backgroundColor: 'gray',
                        color: 'black !important',
                      }
                    }}
                  >
                    TIẾP THEO
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
      <div className='bg-black h-14'></div>
    </div>
  );
}
