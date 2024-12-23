import React, { useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ApiComponent = () => {
  useEffect(() => {
    // Fetch data from the backend
    fetch(`${API_BASE_URL}/api/backend-endpoint`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data fetched from API:', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return <div></div>;
};

export default ApiComponent;
