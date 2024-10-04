import React, { useEffect, useState } from 'react';
import CardSpreadLayout from './CardSpreadLayout';
import Card from '../Card/Card';
import { GetAllCardType, GetAllTopic, GetMeaningCard, GetRandomCardList } from '../../../api/CardApi';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
// import { WidthFull } from '@mui/icons-material';

function Home() {
    const [selectedCardsRow1, setSelectedCardsRow1] = useState([]);
    const [selectedCardsRow2, setSelectedCardsRow2] = useState([]);
    const [type, setType] = useState('0');
    const [topic, setTopic] = useState('0');
    const [randomCardList, setRandomCardList] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);
    const [selectedRandomCard, setSelectedRandomCard] = useState([]);
    const [meaningCard, setMeaningCard] = useState([]);
    const [cardType, setCardType] = useState([]);
    const [topicData, setTopicData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const cardCountRow1 = 16;
    const cardCountRow2 = 16;
    const shouldDisplayCards = type !== '0' && topic !== '0';
    const maxSelectedCards = 3;

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleTopicChange = (event) => {
        setTopic(event.target.value);
    };

    const handleCardClickRow1 = (index) => {
        if (selectedCardsRow1.length + selectedCardsRow2.length < maxSelectedCards) {
            setSelectedCardsRow1((prevSelected) => [...prevSelected, index]);
            setSelectedRandomCard((prevSelectedRandomCard) => [...prevSelectedRandomCard, randomCardList[cardNumber]]);
            setCardNumber(cardNumber + 1);
        }
    };

    const handleCardClickRow2 = (index) => {
        if (selectedCardsRow1.length + selectedCardsRow2.length < maxSelectedCards) {
            setSelectedCardsRow2((prevSelected) => [...prevSelected, index]);
            setSelectedRandomCard((prevSelectedRandomCard) => [...prevSelectedRandomCard, randomCardList[cardNumber]]);
            setCardNumber(cardNumber + 1);
        }
    };

    const handleViewMeaning = async () => {
        if (randomCardList && randomCardList.length > 0) {
            const requestBody = randomCardList.map((i, index) => ({
                cardId: i.cardId,
                positionId: index + 1,
            }));
            const response = await GetMeaningCard(topic, requestBody);
            if (response.ok) {
                const responseJson = await response.json();
                setMeaningCard(responseJson.result)
            }
        }
    }

    useEffect(() => {
        const fetchAllCardType = async () => {
            setIsLoading(true);
            const response = await GetAllCardType();
            if (response.ok) {
                const responseData = await response.json();
                setCardType(responseData.result);
            } else {
                throw new Error('Failed to fetch card types');
            }
            setIsLoading(false);
        };

        fetchAllCardType();

        const fetchAllTopic = async () => {
            setIsLoading(true);
            const response = await GetAllTopic();
            if (response.ok) {
                const responseData = await response.json();
                setTopicData(responseData.result);
            } else {
                throw new Error('Failed to fetch topic');
            }
            setIsLoading(false);
        };

        fetchAllTopic();

        if (type !== '0') {
            const fetchRandomCardList = async () => {
                setIsLoading(true);
                const response = await GetRandomCardList(type);
                if (response.ok) {
                    const responseData = await response.json();
                    setRandomCardList(responseData.result);
                } else {
                    throw new Error('Failed to fetch');
                }
                setIsLoading(false);
            };

            fetchRandomCardList();
        }
    }, [type]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200 z-50">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className='p-10'
            style={{
                height: 'max-width',
                backgroundImage: "url('/image/BG-01.png')",
                backgroundSize: 'cover',

            }}>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 p-4">
                    <form>
                        <div className="text-center mb-6">
                            <select
                                className="text-center w-60 p-1"
                                value={type}
                                onChange={handleTypeChange}
                                style={{
                                    border: 'solid 2px white',
                                    borderRadius: '10px',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}
                            >
                                <option value='0'>1. Chọn loại bài</option>
                                {cardType && cardType.length > 0 && (
                                    cardType.map((cardType) => (
                                        <option key={cardType.cardTypeId} value={cardType.cardTypeId}>{cardType.cardTypeName}</option>
                                    )
                                    ))}
                            </select>
                        </div>
                        <div className="text-center mb-10">
                            <select
                                className="text-center w-60 p-1"
                                value={topic}
                                onChange={handleTopicChange}
                                style={{
                                    border: 'solid 2px white',
                                    borderRadius: '10px',
                                    backgroundColor: 'black',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}
                            >
                                <option value='0'>2. Chọn chủ đề</option>
                                {topicData && topicData.length > 0 && (
                                    topicData.map((topic) => (
                                        <option key={topic.topicId} value={topic.topicId}>{topic.topicName}</option>
                                    ))
                                )}
                            </select>
                        </div>
                    </form>

                    {shouldDisplayCards && (
                        <>
                            <CardSpreadLayout
                                cardCountRow1={cardCountRow1}
                                cardCountRow2={cardCountRow2}
                                selectedCardsRow1={selectedCardsRow1}
                                selectedCardsRow2={selectedCardsRow2}
                                handleCardClickRow1={handleCardClickRow1}
                                handleCardClickRow2={handleCardClickRow2}
                            />
                        </>
                    )}
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <img src="/image/main-element-02.png" alt="main element" />
                </div>

                <div className='w-full'>
                    <div className="flex justify-center text-center" style={{ marginTop: "5%", color: 'white' }}>
                        {selectedRandomCard.map((card) => (
                            <div key={card.cardId} className="flex flex-col items-center mx-2 text-center">
                                <Card
                                    ImageLink={card.imageLink}
                                />
                                <h5>{card.cardName}</h5>
                            </div>
                        ))}
                    </div>

                    {(selectedCardsRow1.length + selectedCardsRow2.length === 3) && (meaningCard.length === 0) && (
                        <div className='text-center mt-5'>
                            <button
                                onClick={handleViewMeaning}
                                style={{
                                    backgroundColor: '#FFB11A',
                                    borderRadius: '10px',
                                    padding: "10px 30px"
                                }}>Xem ý nghĩa</button>
                        </div>
                    )}
                </div>

                {(meaningCard && meaningCard.length > 0) && (
                    meaningCard.map((card, index) => (
                        <div key={card.cardId} className='flex text-white pt-10' style={{ width: '60%', margin: '0 auto' }}>
                            <div className="flex flex-col items-center mx-2 text-center pr-10">
                                <Card
                                    ImageLink={card.cardAfterMeaning.imageLink}
                                />
                                <h5 className='font-bold'>{card.cardAfterMeaning.cardName}</h5>
                            </div>
                            <div className='mb-12' >
                                <h1 className='font-bold pb-2'>Lá bài {card.cardAfterMeaning.cardName} ở vị trí thứ {index + 1}:</h1>
                                {card.meaning}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {(meaningCard && meaningCard.length > 0) && (
                <div className='flex justify-center mt-10'>
                    <a href='/tarot-reader-list'
                        style={{
                            backgroundColor: '#FFB11A',
                            borderRadius: '10px',
                            padding: "10px 30px"
                        }} >
                        Xem chi tiết
                    </a>
                </div>
            )}

        </div>
    );
}

export default Home;
