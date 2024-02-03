"use client"


import DashboardLayout from '@/components/DashboardLayout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

const profile = () => {
  const user = useAppSelector((state) => state.value);
  const [phone, setPhone] = useState("")
  const [skill, setSkill] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [loading, setLoading] = useState(false)


  const getUser = () => {
    axios.get(`user/profile/${user.id}`)
      .then(function (response) {
        setPhone(response.data.user.phone)
        setSkill(response.data.user.skillLevel)
        setAge(response.data.user.age)
        setGender(response.data.user.gender)
        setState(response.data.user.state)
        setCountry(response.data.user.country)

        console.log(response.data)
      })
  }

  const updateUser = () => {
    setLoading(true)
    try {
      axios.put(`user/updateProfile/${user.id}`, {
        phone,
        gender,
        age,
        skillLevel: skill,
        country,
        state
      })
        .then(function (response) {
          getUser()
          setLoading(false)
          console.log(response.data)
        })
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <DashboardLayout>
      <section className='w-[25%] mt-4 mx-auto'>
        <div className='shadow-[0px_2px_4px_0px_#1E1E1E21] p-3 text-center rounded-md'>
          <p className='font-medium text-lg'>Personal Details</p>
          <img src="/images/user.png" className='w-10 h-10 mx-auto my-3' alt="" />
          <p className='font-medium'>{user.fullName}</p>
          <p className='text-xs'>{user.email} </p>
          <button className='bg-primary p-2 px-6 my-4 font-medium'>Edit profile</button>
        </div>
        <div className='my-4 text-center p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
          <p className='font-medium text-sm'>Highlights</p>
        </div>
        <div className='my-4 p-3 shadow-[0px_2px_4px_0px_#1E1E1E21] rounded-md'>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Phone Number</label>
            <input onChange={e => setPhone(e.target.value)} value={phone} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="number" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Gender</label>
            <input onChange={e => setGender(e.target.value)} value={gender} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Age</label>
            <input onChange={e => setAge(e.target.value)} value={age} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="number" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Country of Residence</label>
            <input onChange={e => setCountry(e.target.value)} value={country} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>State of Residence</label>
            <input onChange={e => setState(e.target.value)} value={state} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='my-2'>
            <label className='text-sm font-medium my-1'>Skill Level</label>
            <input onChange={e => setSkill(e.target.value)} value={skill} className='bg-transparent border-b border-[#1E1E1E66] w-full' type="text" />
          </div>
          <div className='text-center'><button onClick={updateUser} className='bg-primary p-2 px-6 my-4 font-medium'>{loading ? "updating..." : "Edit highlights"}</button></div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default profile;