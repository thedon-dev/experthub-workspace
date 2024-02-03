"use client"

import axios from 'axios';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const test = () => {
  const [steps, setSteps] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const role = useSearchParams().get("role")

  const [computer, setComputer] = useState("")
  const [internet, setInternet] = useState("")
  const [gender, setGender] = useState("")
  const [status, setStatus] = useState("")
  const [time, setTime] = useState("")
  const [age, setAge] = useState("")
  const [course, setCourse] = useState("")
  const [experience, setExperience] = useState("")
  const [education, setEducation] = useState("")
  const [accomplishment, setAccomplishment] = useState("")

  const submit = async () => {
    setLoading(true)
    try {
      axios.post(`https://shark-app-2-k9okk.ondigitalocean.app/user/survey`, {
        computerAccess: computer,
        internetAccess: internet,
        gender,
        employmentStatus: status,
        trainingHours: time,
        age,
        preferedCourse: course,
        yearsOfExperience: experience,
        currentEducation: education,
        joiningAccomplishment: accomplishment
      })
        .then(function (response) {
          console.log(response.data)
          setLoading(false)
          router.push(`/auth/verify`)
        })
        .catch(err => {
          setLoading(false)
          // console.log(err.response.data.message)
        })
    } catch (e) {
      setLoading(false)
    }
  }
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
                    <input onChange={e => setComputer(e.target.value)} type="radio" value={"yes"} checked={computer === "yes"} />
                    <p className='ml-3'>Yes</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setComputer(e.target.value)} type="radio" value={"no"} checked={computer === "no"} />
                    <p className='ml-3'>No</p>
                  </div>
                </div>
              case 1:
                return <div>
                  <p className='font-medium text-sm'>Do you have access to an internet?</p>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setInternet(e.target.value)} type="radio" value={"yes"} checked={internet === "yes"} />
                    <p className='ml-3'>Yes</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setInternet(e.target.value)} type="radio" value={"no"} checked={internet === "no"} />
                    <p className='ml-3'>No</p>
                  </div>
                </div>
              case 2:
                return <div>
                  <p className='font-medium text-sm'>Gender</p>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setGender(e.target.value)} type="radio" value={"male"} checked={gender === "male"} />
                    <p className='ml-3'>Male</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setGender(e.target.value)} type="radio" value={"female"} checked={gender === "female"} />
                    <p className='ml-3'>Female</p>
                  </div>
                </div>
              case 3:
                return <div>
                  <p className='font-medium text-sm'>What is your employment status?</p>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setStatus(e.target.value)} type="radio" value={"student"} checked={status === "student"} />
                    <p className='ml-3'>Student</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setStatus(e.target.value)} type="radio" value={"Unemployed"} checked={status === "Unemployed"} />
                    <p className='ml-3'>Unemployed</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setStatus(e.target.value)} type="radio" value={"Part time employment"} checked={status === "Part time employment"} />
                    <p className='ml-3'>Part time employment</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setStatus(e.target.value)} type="radio" value={"Full time employment"} checked={status === "Full time employment"} />
                    <p className='ml-3'>Full time employment</p>
                  </div>
                </div>
              case 4:
                return <div>
                  <p className='font-medium text-sm'>How many hours can you commit to your training a week?</p>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setTime(e.target.value)} type="radio" value={"6-12"} checked={time === "6-12"} />
                    <p className='ml-3'>6-12 hours</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setTime(e.target.value)} type="radio" value={"24"} checked={time === "24"} />
                    <p className='ml-3'>24 hours</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setTime(e.target.value)} type="radio" value={"48"} checked={time === "48"} />
                    <p className='ml-3'>48 hours</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setTime(e.target.value)} type="radio" value={"anytime"} checked={time === "anytime"} />
                    <p className='ml-3'>I’m open for anytime</p>
                  </div>
                </div>
              case 5:
                return <div>
                  <p className='font-medium text-sm'>What is your age?</p>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setAge(e.target.value)} type="radio" value={"10-15"} checked={age === "10-15"} />
                    <p className='ml-3'>10-15 years</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setAge(e.target.value)} type="radio" value={"16-20"} checked={age === "16-20"} />
                    <p className='ml-3'>16-20 years</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setAge(e.target.value)} type="radio" value={"21-25"} checked={age === "21-25"} />
                    <p className='ml-3'>21-25 years</p>
                  </div>
                  <div className='flex text-sm my-2'>
                    <input onChange={e => setAge(e.target.value)} type="radio" value={"26 and above"} checked={age === "26 and above"} />
                    <p className='ml-3'>26 and above</p>
                  </div>
                </div>
              case 6:
                return <div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>Prefred course</label>
                    <select onChange={e => setCourse(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm'>
                      <option value="Virtual Assistant">Virtual Assistant</option>
                      <option value="Product Management">Product Management</option>
                      <option value="Cybersecurity">Cybersecurity </option>
                      <option value="Software Development">Software Development</option>
                      <option value="AI / Machine Learning">AI / Machine Learning</option>
                      <option value="Data Analysis & Visualisation">Data Analysis & Visualisation</option>
                      <option value="Story Telling">Story Telling</option>
                      <option value="Animation">Animation</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="Dev Ops">Dev Ops</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Journalism">Journalism</option>
                      <option value="Game development">Game development</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Advocacy">Advocacy</option>
                    </select>
                  </div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>Years of experience</label>
                    <input onChange={e => setExperience(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='3 years' />
                  </div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>What is your current education</label>
                    <input onChange={e => setEducation(e.target.value)} className='w-full border my-1 border-[#FA815136] p-2 rounded-sm' type="text" placeholder='Bachelors degree' />
                  </div>
                  <div className='my-2 text-sm'>
                    <label className='font-medium'>Tell us what you will accomplish by joining</label>
                    <textarea onChange={e => setAccomplishment(e.target.value)} className='w-full border h-32 my-1 border-[#FA815136] p-2 rounded-sm' placeholder='Text'></textarea>
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
          {steps < 6 ? <button onClick={() => setSteps(steps + 1)} className='w-44  p-3 my-3 rounded-sm bg-primary text-white'>Next</button> : <button onClick={() => submit()} disabled={steps < 6} className='w-44  p-3 my-3 rounded-sm bg-gray text-white'>{loading ? "Loading..." : "Sumbit"}</button>}

        </div>
      </section>
    </main>
  );
};

export default test;