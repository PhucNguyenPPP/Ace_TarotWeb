import Banner from "../../components/layouts/Banner/Banner";
import Footer from "../../components/layouts/Footer/Footer";
import Header from "../../components/layouts/Header/Header";
import Home from "../../components/partial/HomePage/Home";
import useAuth from "../../hooks/useAuth";
import HomeTarotReaderPage from "./HomeTarotReaderPage";

const HomePage = () => {
    const { user } = useAuth();
    return (
        <>
            {(user && user.roleName === 'Tarot Reader') ? (
                <>
                    <HomeTarotReaderPage />
                    <Footer />
                </>
            ) : (
                <>
                    <Header />
                    <Banner />
                    <Home />
                    <Footer />
                </>
            )}

        </>
    );
};

export default HomePage;
