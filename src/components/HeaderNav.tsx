import React from 'react';

const HeaderNav = () => {
  
  return (
    <header className='absolute p-2 top-0 lg:w-[80%] left-0 right-0 mx-auto border-b border-white flex justify-between'>
      <div className='flex'>
        <img src="/images/logo.png" alt="" />
        <h3 className='text-base lg:block hidden font-medium my-auto text-white'>EXPERTHUB INSTITUTE</h3>
      </div>
      <div className='lg:flex hidden justify-between text-white text-sm w-[60%]'>
        <p className='my-auto'>Home</p>
        <p className='my-auto'>About Us</p>
        <p className='my-auto'>Instructors</p>
        <p className='my-auto'>Our Partners</p>
        <p className='my-auto'>Contact</p>
        <button className='border text-primary my-auto ml-10 border-primary p-1'>LOGIN</button>
        <button className=' bg-primary text-black p-1 my-auto'>REGISTER</button>
      </div>
      <button className='bg-primary lg:hidden block'>bar</button>

    </header>
  );
};

export default HeaderNav;