"use client"

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const aptitudeTest = () => {
  const [time, setTime] = useState("")
  const [personality, setPersonality] = useState("")
  const [description, setDescription] = useState("")
  const [fun, setFun] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const role = useSearchParams().get("role")

  const submit = async () => {
    setLoading(true)
    try {
      axios.post(`https://api.experthubllc.com/student/aptitude-test`, {
        willDadicate6Hours: time,
        describeSelf: description,
        personality: personality,
        doForFun: fun
      })
        .then(function (response) {
          console.log(response.data)
          setLoading(false)
          router.push(`/auth/verify`)
        })
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <main >
      <div className='w-[80%] mx-auto mt-20'>
        <p className='text-center font-medium text-lg'>Take the aptitude test below</p>
        <div className='my-3'>
          <label className='font-medium'>Can you dedicate 6 hours per day?</label>
          <div className='flex text-sm my-2'>
            <input onChange={e => setTime(e.target.value)} type="radio" value={"yes"} checked={time === "yes"} />
            <p className='ml-3'>Yes</p>
          </div>
          <div className='flex text-sm my-2'>
            <input onChange={e => setTime(e.target.value)} type="radio" value={"no"} checked={time === "no"} />
            <p className='ml-3'>No</p>
          </div>
        </div>
        <div className='my-3'>
          <label className='font-medium'>Describe yourself in 3 words</label>
          <textarea onChange={e => setDescription(e.target.value)} className='w-full p-2 border rounded-md my-1 bg-transparent'></textarea>
        </div>
        <div className='my-3'>
          <label className='font-medium'>What is your personality</label>
          <textarea onChange={e => setPersonality(e.target.value)} className='w-full p-2 border rounded-md my-1 bg-transparent'></textarea>
        </div>
        <div className='my-3'>
          <label className='font-medium'>What do you do for fun</label>
          <textarea onChange={e => setFun(e.target.value)} className='w-full border p-2 rounded-md my-1 bg-transparent'></textarea>
        </div>
        <div className='text-center my-3'>
          <button onClick={() => submit()} className='p-2 bg-primary  px-8'>{loading ? "Loading..." : "Submit"}</button>
        </div>
      </div>
    </main>
  );
};

export default aptitudeTest;