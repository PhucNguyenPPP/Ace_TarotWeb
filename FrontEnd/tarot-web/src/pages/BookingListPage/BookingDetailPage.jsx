import Footer from "../../components/layouts/Footer/Footer";
import Header from "../../components/layouts/Header/Header";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import BookingDetail from "../../components/partial/BookingDetailPage/BookingDetail";
import useAuth from "../../hooks/useAuth";

const BookingDetailPage = () => {
    const { user } = useAuth();
    return (
        <>
            {(user && user.roleName === 'Tarot Reader') ? (
                <>
                    <div className="flex">
                        <TarotReaderSideBar />
                        <BookingDetail />
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    <Header />
                    <BookingDetail />
                    <Footer />
                </>
            )}

        </>
    );
};

export default BookingDetailPage
