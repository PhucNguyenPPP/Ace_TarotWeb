import React from 'react';
import { Link } from 'react-router-dom';

function RoleSignUp() {
    return (
        <div
            style={{
                backgroundColor: '#5900E5',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className='text-center flex flex-col justify-center items-center'>
                <div>
                    <h1 className='text-white font-bold text-2xl'>TÔI LÀ</h1>
                </div>
                <div style={{
                    width: '150%',
                    marginTop: '10px'
                }}>
                    <Link to="/signup-tarot-reader" style={{ width: '100%' }}>
                        <button
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                width: '100%',
                            }}>TAROT READER
                        </button>
                    </Link>
                </div>
                <div style={{
                    width: '150%',
                    marginTop: '20px'
                }}>
                    <Link to="/signup-customer" style={{ width: '100%' }}>
                        <button
                            style={{
                                backgroundColor: 'white',
                                color: 'black',
                                borderRadius: '10px',
                                padding: '10px 20px',
                                width: '100%',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            TAROT LOVER
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RoleSignUp;
