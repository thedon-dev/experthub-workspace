"use client"


import DashboardLayout from '@/components/DashboardLayout';
import { useAppSelector } from '@/store/hooks';
import { AssesmentElement, AssesmentType } from '@/types/AssesmentType';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { userAgent } from 'next/server';
import React, { useEffect, useState } from 'react';

const SingleAssesment = () => {
  const pathname = usePathname()
  const [assesment, setAssesment] = useState<AssesmentType | null>(null)
  const user = useAppSelector((state) => state.value);

  const getAssesment = async () => {
    await axios.get(`assessment/single/${pathname.slice(16)}`)
      .then(function (response) {
        setAssesment(response.data.myAssesment[0])
        // console.log()
      })
  }
  useEffect(() => {
    getAssesment()
  }, [])


  return (
    <DashboardLayout>
      <div>
        <div className=' border-b p-4 border-[#1E1E1E38]'>
          <p className='text-lg'>Welcome</p>
          <p className='font-medium text-lg capitalize'>{user.fullName}</p>
        </div>
        <div className='p-4'>
          <p>Confirm Your Skill & Technical Level ( {assesment?.title} )</p>
          {assesment?.assesment.map((question: AssesmentElement, index: any) => <div key={index} className='bg-[#FFFFFFCC] p-4 my-3 rounded-md'>
            <div className='flex'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='ml-2'>Question {index + 1}</p>
            </div>
            <input value={question.question} disabled type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>A</p>
              <input value={question.answerA} disabled type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {/* {
                question.correctAnswerIndex === 0 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> : <img onClick={() => handleInputChange(index, "correctAnswerIndex", 0)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />
              } */}
            </div>
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>B</p>
              <input value={question.answerB} disabled type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {/* {
                question.correctAnswerIndex === 1 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> : <img onClick={() => handleInputChange(index, "correctAnswerIndex", 1)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />
              } */}
            </div>
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>C</p>
              <input value={question.answerC} disabled type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {/* {
                question.correctAnswerIndex === 2 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> : <img onClick={() => handleInputChange(index, "correctAnswerIndex", 2)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />
              } */}
            </div>
          </div>)}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SingleAssesment;