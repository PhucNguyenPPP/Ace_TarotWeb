import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { KeyboardArrowLeft } from '@mui/icons-material';
import ServiceForm from './ServiceForm';
import TimeForm from './TimeForm';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetTarotReaderDetail } from '../../../api/TarotReaderApi';
import { CircularProgress } from '@mui/material';

const steps = ['Chọn loại dịch vụ', 'Chọn khung thời gian', 'Thanh toán'];

export default function BookingStep() {
  const [activeStep, setActiveStep] = useState(0);
  const [tarotReaderData, setTarotReaderData] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        if (tarotReaderData) {
          return <ServiceForm tarotReaderData={tarotReaderData} />
        } else {
          return <CircularProgress />
        }
      case 1:
        return <TimeForm />;
      case 2:
        return <PaymentForm />;
      default:
        return null;
    }
  };

  const location = useLocation();
  const { userId } = location.state || {};

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

  return (
    <div
      style={{
        height: '100%'
      }}>
      <div className='bg-black h-14'>
      </div>
      <div
        style={{
          height: 'max-content',
          width: '100%',
          backgroundColor: 'white',
          top: '15%',
          padding: '20px 0',
        }}>
        <div
          className='flex justify-center'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            margin: '0 auto',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: 36,
                textAlign: 'center',
                mb: 5
              }}
            >
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
                  All steps completed - you&apos;re finished
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
                  {activeStep === steps.length - 3 ? (
                    <Button onClick={handleNext}
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
                      }}>
                      TIẾP THEO
                    </Button>)
                    : null}
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
      <div className='bg-black h-14'>
      </div>
    </div>
  );
}
