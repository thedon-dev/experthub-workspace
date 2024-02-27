"use client"

import DashboardLayout from '@/components/DashboardLayout';
import axios from 'axios';
import React, { useState } from 'react';

const newAssesment = () => {
  let layout = {
    question: "",
    answerA: "",
    answerB: "",
    answerC: "",
    correctAnswerIndex: NaN
  }
  const [questions, setQuestions] = useState([
    layout
  ])
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [file, setFile] = useState<FileList | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    const files = e.target.files
    setFile(e.target.files)

    const reader = new FileReader()
    if (files && files.length > 0) {

      reader.readAsDataURL(files[0])
      reader.onloadend = () => {
        if (reader.result) {
          // const type = files[0].name.substr(files[0].name.length - 3)
          setImage(reader.result as string)
        }
      }
    }
  }


  const handleInputChange = (index: number, field: string, value: string | number) => {
    const updatedObjects = [...questions];
    updatedObjects[index] = { ...updatedObjects[index], [field]: value };
    setQuestions(updatedObjects);
  };
  const submit = () => {
    try {
      setLoading(true)
      // const formData = new FormData()
      // file && formData.append("image", file[0])
      // formData.append("title", title)
      // formData.append("assesment", questions)
      axios.post('assessment/create-assessment',
        {
          title,
          image,
          assesment: questions
        }
      )
        .then(function (response) {
          console.log(response.data)
          setLoading(false)
        })
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  return (
    <DashboardLayout>
      <div className=''>
        <div className='text-center border-b p-4 border-[#1E1E1E38]'>
          <p className='text-xl'>Start Assessment</p>
        </div>
        <div className='p-3'>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter Assesment Title' type="text" className='p-2 bg-[#D9D9D94D] w-full' />
        </div>
        <div className='p-3'>
          {questions.map((question, index) => <div key={index} className='bg-[#FFFFFFCC] p-4 my-3 rounded-md'>
            <div className='flex'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='ml-2'>Question {index + 1}</p>
            </div>
            <input value={question.question} onChange={e => handleInputChange(index, "question", e.target.value)} placeholder='Enter Question' type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>A</p>
              <input value={question.answerA} onChange={e => handleInputChange(index, "answerA", e.target.value)} placeholder='Enter Option A' type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {
                question.correctAnswerIndex === 0 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> : <img onClick={() => handleInputChange(index, "correctAnswerIndex", 0)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />

              }

            </div>
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>B</p>
              <input value={question.answerB} onChange={e => handleInputChange(index, "answerB", e.target.value)} placeholder='Enter Option B' type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {
                question.correctAnswerIndex === 1 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> : <img onClick={() => handleInputChange(index, "correctAnswerIndex", 1)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />

              }

            </div>
            <div className='flex relative'>
              <img src="/images/icons/heroicons_list-bullet.svg" alt="" />
              <p className='mx-2 my-auto'>C</p>
              <input value={question.answerC} onChange={e => handleInputChange(index, "answerC", e.target.value)} placeholder='Enter Option C' type="text" className='p-2 bg-[#D9D9D94D] my-3 w-full' />
              {
                question.correctAnswerIndex === 2 ? <img src="/images/checked.png" className='absolute right-4 top-5 cursor-pointer w-6' alt="" /> : <img onClick={() => handleInputChange(index, "correctAnswerIndex", 2)} src="/images/icons/game-icons_check-mark.svg" className='absolute right-4 top-6 cursor-pointer w-4' alt="" />

              }

            </div>
          </div>)}
          <div className='my-4'>
            <button onClick={() => setQuestions([...questions, layout])} className='p-2 px-4 bg-[#D9D9D9]'>+ Add</button>
          </div>
          <div className='text-center'>
            <button onClick={() => submit()} className='p-2 px-10 bg-[#FDC332]'>{loading ? 'loading...' : 'Save'}</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default newAssesment;