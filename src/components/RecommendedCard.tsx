import React from 'react';

const RecommendedCard = () => {
  return (
    <div className='flex border p-3 my-3 w-[49%] rounded-md border-[#1E1E1E75]'>
      <img className='w-32 rounded-md' src="/images/card.png" alt="" />
      <div className='mx-4'>
        <p className='text-primary text-sm'>UI Design . <span className='text-black'> Evans D</span></p>
        <p className='font-medium'>Get Started with prototyping</p>
        <p className='text-sm'>Nov 17 2023</p>
      </div>
      <button className='p-2 bg-primary my-auto rounded-sm'>Enrol Now</button>
    </div>
  );
};

export default RecommendedCard;