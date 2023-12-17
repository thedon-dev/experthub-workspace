"use client"

import React, { useState } from 'react';

const test = () => {
  const [steps, setSteps] = useState(0)
  return (
    <main >
      <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
      <section className='absolute top-28 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
        <h3 className='font-bold text-base text-center my-6'>Kindly Fill the Form Below</h3>
        <section className=' bg-white rounded-md border border-[#FDC3327D] p-6 '>
          {(() => {
            switch (steps) {
              case 0:
                return <div>
                  <p className='font-medium text-sm'>Do you have access to a computer?</p>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Yes</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>No</p>
                  </div>
                </div>
              case 1:
                return <div>
                  <p className='font-medium text-sm'>Do you have access to an internet?</p>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Yes</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>No</p>
                  </div>
                </div>
              case 2:
                return <div>
                  <p className='font-medium text-sm'>Gender</p>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Male</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Female</p>
                  </div>
                </div>
              case 3:
                return <div>
                  <p className='font-medium text-sm'>What is your employment status?</p>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Student</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Unemployed</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Part time employment</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>Full time employment</p>
                  </div>
                </div>
              case 4:
                return <div>
                  <p className='font-medium text-sm'>How many hours can you commit to your training a week?</p>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>6-12 hours</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>24 hours</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>48 hours</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>I’m open for anytime</p>
                  </div>
                </div>
              case 5:
                return <div>
                  <p className='font-medium text-sm'>What is your age?</p>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>10-15 years</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>16-20 years</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>21-25 years</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input type="radio" />
                    <p className='ml-3'>26 and above</p>
                  </div>
                </div>
              case 6:
                return <div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>Prefred course</label>
                    <select className='w-full border my-1 border-[#FA815136] p-2 rounded-sm'>
                      <option value="">Virtual Assistant</option>
                      <option value="">Product Management</option>
                      <option value="">Cybersecurity </option>
                      <option value="">Software Development</option>
                      <option value="">AI / Machine Learning</option>
                      <option value="">Data Analysis & Visualisation</option>
                      <option value="">Story Telling</option>
                      <option value="">Animation</option>
                      <option value="">Cloud Computing</option>
                      <option value="">Dev Ops</option>
                      <option value="">UI/UX Design</option>
                      <option value="">Journalism</option>
                      <option value="">Game development</option>
                      <option value="">Data Science</option>
                      <option value="">Digital Marketing</option>
                      <option value="">Advocacy</option>
                    </select>
                  </div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>Years of experience</label>
                    <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='3 years' />
                  </div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>What is your current education</label>
                    <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='Bachelors degree' />
                  </div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>Tell us what you will accomplish by joining</label>
                    <textarea className='w-full border h-32 my-1 border-[#FA815136] p-2 rounded-sm' placeholder='Text'></textarea>
                  </div>
                </div>
              default:
                return null
            }
          })()}

          <div className='border-t border-[#DCDCDC36] mt-10 p-2 flex justify-between'>
            <p className='text-sm'>{steps + 1}/08</p>
            <div className='flex'>
              <button onClick={() => setSteps(steps >= 1 ? steps - 1 : 0)} className='bg-gray p-2 rounded-sm'>
                <img src="/images/icons/arrow-left.svg" alt="" />
              </button>
              <button onClick={() => setSteps(steps <= 6 ? steps + 1 : 0)} className='bg-primary p-2 rounded-sm ml-2'>
                <img src="/images/icons/arrow-right.svg" alt="" />
              </button>
            </div>
          </div>

        </section>
        <div className='text-sm p-6 font-medium bg-[#F9ECCC] rounded-md mt-3'>
          <p>Thanks for your interest in Experthub trainings. Note, you need to own a laptop & have access to internet to be part of our trainings.</p>
        </div>
        <div className='text-center'>
          <button disabled={steps < 6} className='w-44  p-3 my-3 rounded-sm bg-gray text-white'>Sumbit</button>
        </div>
      </section>
    </main>
  );
};

export default test;