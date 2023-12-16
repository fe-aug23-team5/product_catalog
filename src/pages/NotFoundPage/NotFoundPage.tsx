import React, { useState, useEffect } from 'react';
import './NotFoundPage.scss';
import { Navigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countInterval);
  }, []);

  if (countdown === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className="errorPage__container">
      <h1 className="errorPage__container__title">Page not found</h1>

      <p>
        {`You will be redirected to Home page in ${countdown} seconds`}
      </p>
    </div>
  );
};
