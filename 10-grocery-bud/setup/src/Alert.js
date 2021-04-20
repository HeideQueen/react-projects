import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert }) => {
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(alertTimeout);
  }, [removeAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
