"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const HeaderNav = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className='absolute p-2 top-0 lg:w-[80%] left-0 right-0 mx-auto border-b border-white flex justify-between'>
      <div className='flex'>
        <img src="/images/logo.png" alt="" />
        <h3 className='text-base lg:block hidden font-medium my-auto text-white'>EXPERTHUB INSTITUTE</h3>
      </div>
      <div className='lg:flex hidden justify-between text-white text-sm w-[60%]'>
        <Link className='my-auto' href={"/"}><p >Home</p></Link>
        <a href="#about" className='my-auto'><p >About Us</p></a>
        <a href="#courses" className='my-auto'><p >Courses</p></a>
        <a href="#patners" className='my-auto'><p >Our Partners</p></a>
        <a href="#footer" className='my-auto'>
          <p>Contact</p>
        </a>
        <Link href={"/auth/login"} className='my-auto'><button className='border text-primary my-auto ml-10 border-primary p-1'>LOGIN</button></Link>
        <Link href={"/auth/signup"} className='my-auto'><button className=' bg-primary text-black p-1 my-auto'>REGISTER</button></Link>
      </div>
      <button onClick={() => setOpen(!open)} className='bg-primary h-10 w-10 my-auto lg:hidden block'>
        <img src="/images/icons/menu.png" className='w-8 h-8 mx-auto' alt="" />
      </button>
      {open &&
        <div className='fixed z-50 top-24 left-0 right-0 p-6 bg-primary text-white w-[90%] mx-auto rounded-md'>
          <p onClick={() => setOpen(!open)} className="float-right text-4xl cursor-pointer">&times;</p>

          <p className='my-4 mt-20 font-bold'>Home</p>
          <p className='my-4 font-bold'>About Us</p>
          <p className='my-4 font-bold'>Courses</p>
          <p className='my-4 font-bold'>Our Partners</p>
          <p className='my-4 font-bold'>Contact</p>
          <div className='flex justify-between my-4'>
            <Link href={"/auth/login"}><button className='border text-white border-white w-[40%] p-1'>LOGIN</button></Link>
            <Link href={"/auth/signup"}><button className=' bg-white text-black p-1  w-[40%]'>REGISTER</button></Link>
          </div>
        </div>
      }
    </header>
  );
};

export default HeaderNav;