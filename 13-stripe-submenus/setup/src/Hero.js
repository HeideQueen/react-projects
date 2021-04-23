import React from 'react';
import phoneImg from './images/phone.svg';
import { useGlobalContext } from './context';

const Hero = () => {
  const { closeSubmenu } = useGlobalContext();

  return (
    <section className='hero' onMouseOver={closeSubmenu}>
      <div className='hero-center'>
        <article className='hero-info'>
          <h1>Payment infrastructure for the internet</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
            iure perferendis ut reiciendis ex delectus fugit blanditiis
            repellendus? Magni rem odio alias consectetur deserunt aliquam sunt
            aliquid veniam? Eaque, non!
          </p>
          <button className='btn'>Start now</button>
        </article>
        <article className='hero-images'>
          <img src={phoneImg} alt='phone' className='phone-img' />
        </article>
      </div>
    </section>
  );
};

export default Hero;
