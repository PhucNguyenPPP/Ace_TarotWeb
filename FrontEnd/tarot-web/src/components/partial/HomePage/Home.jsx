import React, { useEffect, useState } from 'react';
import CardSpreadLayout from './CardSpreadLayout';
import Card from '../Card/Card';
import { GetRandomCardList } from '../../../api/CardApi';
import { toast } from 'react-toastify';

function Home() {
    const [selectedCardsRow1, setSelectedCardsRow1] = useState([]);
    const [selectedCardsRow2, setSelectedCardsRow2] = useState([]);
    const [type, setType] = useState('0');
    const [topic, setTopic] = useState('0');
    const [randomCardList, setRandomCardList] = useState([]);
    const [cardNumber, setCardNumber] = useState(0);
    const [selectedRandomCard, setSelectedRandomCard] = useState([]);

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

    useEffect(() => {
        if (type !== '0') {
            const fetchRandomCardList = async () => {
                try {
                    const response = await GetRandomCardList(type);
                    if (response.ok) {
                        const responseData = await response.json();
                        setRandomCardList(responseData.result);
                    } else {
                        throw new Error('Failed to fetch');
                    }
                } catch (error) {
                    console.error('Error fetching random card list:', error);
                    toast.error('Failed to fetch random card list');
                }
            };

            fetchRandomCardList();
        }
    }, [type]);

    return (
        <div className='p-10' style={{ height: 'max-width', backgroundColor: 'black' }}>
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
                                    fontWeight: 'bold'
                                }}
                            >
                                <option value='0'>1. Chọn loại bài</option>
                                <option value='1'>Tarot</option>
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
                                    fontWeight: 'bold'
                                }}
                            >
                                <option value='0'>2. Chọn chủ đề</option>
                                <option value='1'>Tình yêu</option>
                                <option value='2'>Sự nghiệp</option>
                                <option value='3'>Sức khỏe</option>
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

                            <div className="flex justify-center text-center" style={{ marginTop: "50%", color: 'white' }}>
                                {selectedRandomCard.map((card) => (
                                    <div key={card.cardId} className="flex flex-col items-center mx-2 text-center">
                                        <Card
                                            ImageLink={card.imageLink}
                                        />
                                        <h5>{card.cardName}</h5>
                                    </div>
                                ))}
                            </div>

                            {(selectedCardsRow1.length + selectedCardsRow2.length === 3) && (
                                <div className='text-center mt-5'>
                                    <button
                                        style={{
                                            backgroundColor: '#FFB11A',
                                            borderRadius: '10px',
                                            padding: "10px 30px"
                                        }}>Xem ý nghĩa</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <img src="/image/PersonHome.png" alt="Person Home" />
                </div>

                {(selectedCardsRow1.length + selectedCardsRow2.length === 3) && (
                    <div style={{ color: 'white' }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
