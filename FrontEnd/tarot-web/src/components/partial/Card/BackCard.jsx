import styles from './Card.module.css';
function BackCard() {
    return (
        <div className={styles.card}
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
                src="/image/logo_back_card.png"
                alt="logo-back-card"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '80%',
                }}
            />
        </div>
    );
}

export default BackCard;