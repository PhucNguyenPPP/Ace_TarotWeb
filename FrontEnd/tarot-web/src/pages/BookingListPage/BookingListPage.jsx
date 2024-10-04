import Footer from "../../components/layouts/Footer/Footer";
import Header from "../../components/layouts/Header/Header";
import TarotReaderSideBar from "../../components/layouts/Sidebar/TarotReaderSidebar";
import BookingList from "../../components/partial/BookingListPage/BookingList";
import useAuth from "../../hooks/useAuth";

const BookingListPage = () => {
    const { user } = useAuth();
    return (
        <>
            {(user && user.roleName === 'Tarot Reader') ? (
                <>
                    <div className="flex">
                        <TarotReaderSideBar />
                        <BookingList />
                    </div>
                    <Footer />
                </>
            ) : (
                <>
                    <Header />
                    <BookingList />
                    <Footer />
                </>
            )}

        </>
    );
};

export default BookingListPage
