import React from 'react';
import BackCard from '../Card/BackCard'; // Đảm bảo đường dẫn chính xác

function CardSpreadLayout({ cardCountRow1, cardCountRow2, selectedCardsRow1, selectedCardsRow2, handleCardClickRow1, handleCardClickRow2 }) {
    const isCardSelectedInRow1 = (index) => selectedCardsRow1.includes(index);
    const isCardSelectedInRow2 = (index) => selectedCardsRow2.includes(index);

    return (
        <div className="flex flex-col" style={{ marginLeft: '10%' }}>
            {/* Top Row of Cards */}
            <div className="relative flex flex-wrap justify-center ml-6">
                {Array.from({ length: cardCountRow1 }).map((_, index) => (
                    !isCardSelectedInRow1(index) && (
                        <div
                            key={`top-${index}`}
                            style={{
                                position: 'absolute',
                                left: `${index * 30}px`, // Adjust the overlap distance
                                top: '0',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleCardClickRow1(index)}
                        >
                            <BackCard />
                        </div>
                    )
                ))}
            </div>
            {/* Bottom Row of Cards */}
            <div className="relative flex flex-wrap justify-center mt-4">
                {Array.from({ length: cardCountRow2 }).map((_, index) => (
                    !isCardSelectedInRow2(index) && (
                        <div
                            key={`bottom-${index}`}
                            style={{
                                position: 'absolute',
                                left: `${index * 30}px`, // Adjust the overlap distance
                                top: '100px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleCardClickRow2(index)}
                        >
                            <BackCard />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default CardSpreadLayout;
