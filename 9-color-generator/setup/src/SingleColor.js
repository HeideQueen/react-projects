import React, { useState, useEffect } from 'react';
// import rgbToHex from './utils';

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);

  const bcg = rgb.join(',');

  // const hex = rgbToHex(...rgb);

  const hexValue = `#${hexColor}`;

  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlert(false);
    }, 2000);

    return () => {
      clearTimeout(alertTimeout);
    };
  }, [alert]);

  return (
    <article
      className={`color ${index > 10 ? 'color-light' : null}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexValue}</p>
      {alert && <p className='alert'>copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
