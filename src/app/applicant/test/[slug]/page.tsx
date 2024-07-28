"use client"


import DashboardLayout from '@/components/DashboardLayout';
import { useAppSelector } from '@/store/hooks';
import { AssesmentElement, AssesmentType } from '@/types/AssesmentType';
import apiService from '@/utils/apiService';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SingleAssesment = () => {
  const pathname = usePathname()
  const [assesment, setAssesment] = useState<AssesmentType | null>(null)
  const user = useAppSelector((state) => state.value);
  const [score, setScore] = useState<any | []>([]);
  const [grade, showGrade] = useState(false)

  const getAssesment = async () => {
    await apiService.get(`assessment/single/${pathname.slice(16)}`)
      .then(function (response) {
        console.log(response.data)
        setAssesment(response.data.myAssesment[0])
        // console.log()
      })
  }

  const select = (question: AssesmentElement, index: Number) => {
    
    if (question.correctAnswerIndex === index) {
      setScore([...score, index]);
    } else {
      setScore([...score, index])
    }
  };

  const submit = () => {
    if (score.length !== assesment?.assesment.length) {
      alert("Answer all questions to submit")
      return;
    }
    showGrade(true)
  }
  const getGrade = () => {
    let matchingIndexCount = 0;

    for (let i = 0; i < score.length; i++) {
      if (score[i] === assesment?.assesment[i].correctAnswerIndex) {
        matchingIndexCount++;
      }
    }
    return matchingIndexCount
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
          <p>Answer all questions orderly</p>
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
              {
                score[index] === 0 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> :
                  <img onClick={() => select(question, 0)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />
              }
            </div>
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>B</p>
              <input value={question.answerB} disabled type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {
                score[index] === 1 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> :
                  <img onClick={() => select(question, 1)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />
              }
            </div>
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>C</p>
              <input value={question.answerC} disabled type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {
                score[index] === 2 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> :
                  <img onClick={() => select(question, 2)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />
              }
            </div>
          </div>)}
          <button onClick={() => submit()} className='p-2 px-10 bg-[#FDC332]'>{'Submit'}</button>
        </div>
        {
          grade && <div>
            <div className='fixed cursor-pointer bg-[#000000] opacity-50 top-0 left-0 right-0 w-full h-[100vh] z-10'></div>
            <div className='fixed top-10 bottom-10 left-0 rounded-md right-0 lg:w-[50%] w-[90%] h-[40%] mx-auto z-20 bg-[#F8F7F4]'>
              <div className='shadow-[0px_1px_2.799999952316284px_0px_#1E1E1E38] p-4 lg:px-12 flex justify-between'>
                <p className='font-medium'>Assesment Grade</p>
                <img onClick={() => showGrade(false)} className='w-6 h-6 cursor-pointer' src="/images/icons/material-symbols_cancel-outline.svg" alt="" />
              </div>
              <div className='lg:p-10 p-4'>
                <div className='text-center'>
                  <h1 className='text-4xl capitalize'>Congratulations {user.fullName}</h1>
                  <p className='my-2 text-lg'>Your score is {getGrade()} / {score.length}</p>
                </div>
                <div>
                  <div className='flex justify-center mt-6'>
                    <Link href={"/applicant/test"}>
                      <button className='p-2 bg-primary font-medium w-40 rounded-md text-sm'> Back</button>
                    </Link>
                    <Link href={"/applicant/test"}>
                      <button className='mx-4'>Cancel</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </DashboardLayout>
  );
};

export default SingleAssesment;