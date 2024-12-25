import React from 'react';
import welcome from '../../assets/note-taking.png';

const Home = () => {
    return (
        <div style={{
            padding: '80px 20px 40px 20px',
            minHeight: '100vh',
            color: 'white',
            maxWidth: '1200px',
            margin: '0 auto',
            overflow: 'auto'
        }}>

            <div style={{
                textAlign: 'center',
                marginBottom: '60px'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    color: '#fff',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>Welcome to our Notes App</h1>
                <p style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.6',
                    maxWidth: '800px',
                    margin: '0 auto 30px auto',
                    color: '#fff'
                }}>
                    Your personal digital notebook for capturing ideas, organizing thoughts, and keeping track of
                    important information.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '30px',
                marginBottom: '60px'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '25px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '2rem',
                        marginBottom: '15px'
                    }}>📝
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '15px',
                        color: '#fff'
                    }}>Easy Note Taking</h3>
                    <p>Create and edit notes quickly with our intuitive interface. No complicated features - just
                        simple, effective note-taking.</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '25px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '2rem',
                        marginBottom: '15px'
                    }}>🔒
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '15px',
                        color: '#fff'
                    }}>Secure Storage</h3>
                    <p>Your notes are securely stored and accessible only to you. Login to access your personal
                        collection from anywhere.</p>
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '25px',
                    borderRadius: '10px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        fontSize: '2rem',
                        marginBottom: '15px'
                    }}>🚀
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        marginBottom: '15px',
                        color: '#fff'
                    }}>Get Started Easily</h3>
                    <p>No complicated setup needed. Create an account, log in, and start taking notes immediately.</p>
                </div>
            </div>
            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '40px',
                borderRadius: '10px',
                marginBottom: '60px'
            }}>
                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '30px',
                    textAlign: 'center',
                    color: '#fff'
                }}>How It Works</h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
            <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>1</span>
                        <p>Sign up for a free account or log in if you're already a member</p>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
            <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>2</span>
                        <p>Click on "My Notes" to access your personal notes dashboard</p>
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
            <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>3</span>
                        <p>Start creating, editing, and organizing your notes with ease</p>
                    </div>
                </div>
            </div>
            <div style={{
                textAlign: 'center',
                marginBottom: '60px'
            }}>
                <img
                    src={welcome}
                    alt="Notes App"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                    }}
                />
            </div>
        </div>
    );
};

export default Home;