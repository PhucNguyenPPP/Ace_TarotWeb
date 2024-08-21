function Card({ImageLink}) {
    return (
        <div
            style={{
                backgroundColor: '#D9D9D9',
                width: '98px',
                height: '206px',
                borderRadius: '8px',
                position: 'relative',
                zIndex: 1,
                border: 'solid 2px black'
            }}
        >
            <img
                src= {ImageLink}
                alt="logo-back-card"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '98px',
                    height: '206px',
                }}
            />
        </div>
    );
}

export default Card;