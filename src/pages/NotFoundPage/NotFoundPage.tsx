import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PageTitle } from '../../shared/ui/PageTitle';

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
    <div className="errorPage_container">
      <PageTitle>Page not found</PageTitle>
      <p>
        {`You will be redirected to Home page in ${countdown} seconds`}
      </p>
    </div>
  );
};
