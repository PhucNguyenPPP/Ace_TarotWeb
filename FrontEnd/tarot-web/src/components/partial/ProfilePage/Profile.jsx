import styles from './profile.module.scss'

function Profile() {

    return (
        <div
            style={{
                height: 'max-content',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover'
            }}>
            <div className='text-white text-3xl font-bold text-center pt-5 pb-5 ite'
                style={{
                    backgroundColor: '#5900E5'
                }}>
                <h1>TÀI KHOẢN</h1>
            </div>
            <div className='flex pt-14 text-white'>
                <div className='w-full md:w-1/2 pb-10'>
                    <img className={styles.avatar} src='https://firebasestorage.googleapis.com/v0/b/acetarot-3c0d6.appspot.com/o/users_img%2F23810b32-e647-4043-b281-236f81e48be1.jpg?alt=media&token=8c1b85da-6ec6-4cdd-8d0c-3111b3a01e46'></img>
                    <h1 className='text-3xl font-bold text-center pt-5'>@NguyenVanA</h1>
                    <div className={styles.container_info}>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Tên:</p>
                            <p className={styles.detail_info}>Nguyễn Văn A</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Ngày sinh:</p>
                            <p className={styles.detail_info}>15-12-2000</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Giới tính:</p>
                            <p className={styles.detail_info}>Nam</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Email:</p>
                            <p className={styles.detail_info}>nguyenphuc@gmail.com</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Số điện thoại:</p>
                            <p className={styles.detail_info}>0123456789</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Ngày sinh:</p>
                            <p className={styles.detail_info}>20-12-2000</p>
                        </div>
                        <div className={styles.row_info}>
                            <p className={styles.label_info}>Địa chỉ:</p>
                            <p className={styles.detail_info}>204 Nguyễn Hữu Thọ, Phường 1, Quận 7</p>
                        </div>
                    </div>
                    <div className={styles.container_btn}>
                        <a>Chỉnh sửa tài khoản</a><br />
                    </div>
                    <div className={styles.container_btn}>
                        <a>Quên mật khẩu</a><br />
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex items-center'>
                    <div className='w-full'>
                        <div className={styles.option_container}>
                            <a href='/booking-list'>LỊCH HẸN</a>
                        </div>
                        <div className={styles.option_container}>
                            <a href='/signup-tarot-reader'>TRỞ THÀNH TAROT READER</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Profile