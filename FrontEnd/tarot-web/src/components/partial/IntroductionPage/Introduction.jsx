import React from 'react';

function Introduction() {
    return (
        <div className='text-white'
            style={{
                height: 'max-width',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover',

            }}>
            <div className="flex flex-wrap">
                <div className="w-full flex justify-center">
                    <img style={{ width: '20%' }} src="/image/logo.png" alt="ACE logo" />
                </div>
                <div className="w-full text-center font-semibold uppercase">
                    <h1 style={{ marginTop: '-2%', fontSize: '40px' }}>Mỗi Lá Bài - Một Câu Chuyện</h1>
                </div>

                <div className="w-full flex justify-center mt-5">
                    <div className='mt-5' style={{ borderBottom: "2px solid white", width: "20%" }}>
                        <p></p>
                    </div>
                </div>

                <div className="w-full  flex justify-center mt-20 text-center">
                    <div style={{ width: '60%', fontSize: '20px' }}>
                        <p className='mb-8'>
                            Chào mừng bạn đến với <span className='font-bold text-2xl'>ACE</span>, nơi chúng tôi tin rằng mỗi người đều sở hữu một câu chuyện riêng và lá bài Tarot chính là chìa khóa để mở ra những chương sách ấy.
                        </p>
                        <p>
                            Với phương châm <span className='font-bold text-2xl'>“Mỗi Lá Bài, Một Câu Chuyện”</span>, chúng tôi không chỉ đơn thuần mang đến dịch vụ xem tarot, mà còn mong muốn trở thành người bạn đồng hành đáng tin cậy, mang đến cho bạn những trải nghiệm chiêm tinh và tâm linh sâu sắc, giúp bạn thấu hiểu bản thân hơn.
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-4">
                    <img src="/image/logo-eye-01.png" alt="Person Home" />
                </div>
                <div className="w-full md:w-1/2 p-4 mt-28">
                    <h1 className='font-semibold mb-4' style={{ fontSize: '40px' }}>DỊCH VỤ</h1>
                    <div className='mb-6' style={{ borderBottom: "2px solid white", width: "25%" }}>
                        <p></p>
                    </div>
                    <p className='mb-8' style={{ fontSize: '20px' }}>
                        Tại <span className='font-bold text-2xl'>ACE</span>, đội ngũ Tarot Reader của chúng tôi là những chuyên gia giàu kinh nghiệm, luôn sẵn sàng lắng nghe và thấu hiểu từng câu hỏi của bạn. Chúng tôi không chỉ đọc bài mà còn chia sẻ và tư vấn tận tình, nhằm đưa ra những thông điệp và lời khuyên phù hợp nhất với bạn.
                    </p>
                    <p style={{ fontSize: '20px' }}>
                        Với <span className='font-bold text-2xl'>Dịch vụ xem tarot trực tuyến</span>, bạn có thể kết nối với <span className='font-bold text-2xl'>ACE</span> bất kỳ đâu và bất cứ lúc nào qua nhiều hình thức như chat, voice hoặc gọi trực tiếp với Tarot Reader qua website này.
                    </p>
                </div>

                <div className="w-full md:w-1/2 p-4 mt-10 text-right">
                    <h1 className='font-semibold mb-4 pb-4' style={{ borderBottom: "2px solid white", fontSize: '40px' }}>CAM KẾT</h1>
                    <p className='mb-8' style={{ fontSize: '20px' }}>
                        <span className='font-bold text-2xl'>ACE</span> cam kết bảo mật tuyệt đối thông tin và nội dung các buổi xem tarot của bạn. Sự riêng tư của bạn luôn là ưu tiên hàng đầu của chúng tôi.
                    </p>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <img style={{width: '50%'}} src="/image/logo-eye-02.png" alt="Person Home" />
                </div>

                <div className="w-full flex justify-center text-center mb-32">
                    <p style={{fontSize: '20px', width: '30%'}}>Hãy để <span className='font-bold text-2xl'>ACE</span> đồng hành cùng bạn trên hành trình khám phá bản thân.</p>
                </div>
            </div>
        </div>
    );
}

export default Introduction;
