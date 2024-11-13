// src/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the App page or any other page
    navigate('/app');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to the Home Page</h1>
      <p>
        This is the Home component. Use this page to provide an introduction to your app or as a starting point for navigation.
      </p>
      <button onClick={handleNavigate} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Go to App
      </button>
    </div>
  );
};

export default Home;
