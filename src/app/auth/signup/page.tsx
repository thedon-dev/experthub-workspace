"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const signup = () => {
  const [active, setActive] = useState(false)
  const [role, setRole] = useState("student")
  const [fullname, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [country, setCountry] = useState("")
  const [state, setState] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams().get("role")
  const states_in_nigeria = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Federal Capital Territory"
  ]


  useEffect(() => {
    params != null && setRole(params)
  }, [])

  const signupApplicant = async () => {
    setLoading(true)
    try {
      axios.post(`https://shark-app-2-k9okk.ondigitalocean.app/auth/register`, {
        fullname,
        email,
        phone,
        country,
        state,
        address,
        password,
        userType: role
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
      <img src="/images/auth-bg.png" className='h-[100vh] w-full' alt="" />
      <section className='absolute top-10 left-0 right-0 mx-auto lg:w-[30%] w-[95%]'>
        <section className='rounded-md bg-white border border-[#FDC3327D] p-6 '>
          <h3 className='font-bold text-base text-center'>Sign up</h3>
          <div className='flex my-3 justify-evenly'>
            <button onClick={() => setRole("student")} className={role === "student" ? 'bg-primary text-sm p-1 px-6 rounded-sm' : "bg-gray p-1 px-6 text-sm rounded-sm"}>Applicant</button>
            <button onClick={() => setRole("tutor")} className={role === "tutor" ? 'bg-primary p-1 px-6 text-sm rounded-sm' : "bg-gray p-1 px-6 text-sm rounded-sm"}>Trainer</button>
          </div>

          {/* {
          role === "applicant" ? */}
          <div>
            <div className='my-2 text-xs'>
              <label className='font-medium'>Full Name</label>
              <input onChange={e => setName(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='e.g John' />
            </div>
            <div className='my-2 text-xs'>
              <label className='font-medium'>Email</label>
              <input onChange={e => setEmail(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="email" placeholder='Sample@gmail.com' />
            </div>
            <div className='flex justify-between'>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Phone number</label>
                <input onChange={e => setPhone(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="number" placeholder='eg: 0122 222 000' />
              </div>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Country</label>
                <select onChange={e => setCountry(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm'>
                  <option value="nigeria">nigeria</option>
                </select>
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>State</label>
                <select onChange={e => setState(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm'>
                  {states_in_nigeria.map(value => <option key={value} value={value}>{value}</option>)}
                </select>
              </div>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Address</label>
                <input onChange={e => setAddress(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='' />
              </div>
            </div>
            <div className='flex justify-between'>
              <div className='my-2 text-xs w-[48%]'>
                <label className='font-medium'>Password</label>
                <input onChange={e => setPassword(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="password" placeholder='************' />
              </div>
              <div className='my-2 text-xs w-[48%] relative'>
                <label className='font-medium'>Confirm Password</label>
                <input className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type={active ? "text" : "password"} placeholder='************' />
                <img onClick={() => setActive(!active)} className='absolute top-7 right-2 cursor-pointer' src="/images/icons/eyes.svg" alt="" />
              </div>
            </div>
            <div className='my-2 text-xs'>
              <button onClick={() => signupApplicant()} className='w-full bg-primary p-2 rounded-sm font-medium'>{loading ? "Loading..." : "Signup"}</button>
            </div>
          </div>
          {/* : role === "trainer" ? <div></div> : null
        } */}
        </section>
        <div className='text-xs flex justify-center mt-2'>
          <p className='text-[#052126] mr-2'>Do you have an account?</p>
          <Link href={"/auth/login"}><p className='text-[#346771]'>Login</p></Link>
        </div>
      </section>
    </main>
  );
};

export default signup;