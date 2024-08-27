import React from 'react';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
function Contact() {
    return (
        <div
            style={{
                height: 'max-width',
            }}>
            <div className="w-full h-10 bg-black">
            </div>
            <h1 className='text-center font-extrabold mt-20'
                style={{ fontSize: '60px', color: '#5900E5' }}>
                LIÊN HỆ
            </h1>
            <div className="flex flex-wrap ml-10 mr-10"
                style={{ borderRadius: "50px 50px 0 0" }}>

                <div className="w-full md:w-1/2 p-10">
                    <p className='font-semibold' style={{ fontSize: '30px' }}>Xin chào bạn</p>
                    <p className='font-semibold mb-8' style={{ fontSize: '35px' }}>Chúng tôi có thể giúp gì cho bạn?</p>
                    <div
                        className='text-white text-center mb-10'
                        style={{
                            backgroundColor: '#5900E5',
                            borderRadius: '10px',
                            padding: '15px 20px'
                        }}>
                        <p style={{ fontSize: '20px' }}>Để thắc mắc của bạn được giải quyết nhanh hơn, vui
                            lòng <span className='font-bold'>đăng nhập</span> hoặc <span className='font-bold'>đăng ký</span> tài khoản ACE nhé.</p>
                    </div>
                    <div
                        style={{
                            border: '2px solid #5900E5',
                            borderRadius: '10px',
                            padding: '15px 20px'
                        }}>
                        <p className='font-semibold mb-5' style={{ fontSize: '24px' }}>Hãy liên hệ với bộ phận Dịch Vụ Khách Hàng
                            của chúng tôi.
                        </p>

                        <div
                            className='mb-5'
                            style={{
                                border: '2px solid black',
                                borderRadius: '10px',
                                padding: '15px 20px'
                            }}
                        >
                            <p className='font-semibold' style={{ fontSize: '14px', color: '#6F6F6F' }}>
                                Giờ hoạt động của Trung tâm chăm sóc khách hàng
                            </p>
                            <p className='font-semibold' style={{ fontSize: '16px' }}>
                                Gọi điện: thứ hai-chủ nhật từ 8 giờ sáng - 10 giờ tối
                            </p>
                            <p className='font-semibold' style={{ fontSize: '16px' }}>
                                Tin nhắn và email: Hoạt động 24/7
                            </p>
                        </div>
                        <div
                            className='flex'
                            style={{
                                backgroundColor: '#5900E5',
                                borderBottom: '2px solid black',
                                padding: '10px 15px',
                            }}>
                            <div className='flex justify-center items-center' style={{ width: '30%' }}>
                                <PhoneEnabledOutlinedIcon style={{ width: '70%', height: '40%', color: 'white' }} />
                            </div>
                            <div
                                className='mb-5'
                                style={{
                                    width: '70%'
                                }}
                            >
                                <p className='font-semibold' style={{ fontSize: '20px', color: 'white' }}>
                                    Gọi cho bộ phận Dịch Vụ Khách Hàng của chúng tôi 012345678
                                </p>
                                <p style={{ fontSize: '14px', color: 'white' }}>
                                    Áp dụng mức cước thông thường
                                </p>
                            </div>
                        </div>
                        <div
                            className='flex'
                            style={{
                                backgroundColor: '#5900E5',
                                borderBottom: '2px solid black',
                                padding: '10px 15px',
                            }}>
                            <div className='flex justify-center items-center' style={{ width: '30%' }}>
                                <EmailOutlinedIcon style={{ width: '70%', height: '40%', color: 'white' }} />
                            </div>
                            <div
                                className='mb-5'
                                style={{
                                    width: '70%'
                                }}
                            >
                                <p className='font-semibold' style={{ fontSize: '20px', color: 'white' }}>
                                    Gửi thư điện tử cho bộ phận Dịch Vụ Khách Hàng của chúng tôi
                                </p>
                                <p style={{ fontSize: '14px', color: 'white' }}>
                                    Vui lòng gửi thư điện tử đến bộ phận Dịch Vụ Khách Hàng của chúng tôi tại cs@acetarot.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-full md:w-1/2 p-10" style={{ marginTop: '128px' }}>
                    <div
                        className='text-white text-center mb-10'
                        style={{
                            backgroundColor: '#5900E5',
                            borderRadius: '10px',
                            padding: '15px 20px'
                        }}>
                        <p className='font-bold' style={{ fontSize: '32px' }}>
                            <ChatBubbleOutlineOutlinedIcon style={{ fontSize: '40px' }} />
                            Chat với đội ngũ admin ACE
                        </p>
                    </div>

                    <div className='mb-10'>

                        <div
                            style={{
                                backgroundColor: '#5900E5',
                                padding: '15px 20px',
                                borderBottom: '2px solid black',
                                borderRadius: '10px 10px 0 0'
                            }}
                        >
                            <p className='font-semibold text-white' style={{ fontSize: '20px' }}>Hướng dẫn đặt lịch</p>
                        </div>

                        <div
                            style={{
                                backgroundColor: '#5900E5',
                                padding: '15px 20px',
                                borderBottom: '2px solid black'
                            }}
                        >
                            <p className='font-semibold text-white' style={{ fontSize: '20px' }}>Hướng dẫn thanh toán</p>
                        </div>

                        <div
                            style={{
                                padding: '15px 20px',
                                borderRight: '2px solid #5900E5',
                                borderLeft: '2px solid #5900E5',
                                borderRadius: '0 0 10px 10px',
                                borderBottom: '2px solid #5900E5',
                            }}
                        >
                            <p className='font-bold' style={{ fontSize: '25px' }}>Câu hỏi thường gặp</p>
                            <div className='pb-5 underline' style={{ fontSize: '20px' }}>
                                <a>Tôi có thể hủy lịch đã đặt không?</a><br />
                                <a>Hủy lịch tôi có bị mất phí gì không?</a><br />
                                <a>Tôi có thể đổi lịch đã đặt được không?</a><br />
                                <a>Tôi có thể đổi sang tarot reader khác không?</a><br />
                                <a>Có bao nhiêu cách thức thanh toán?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
