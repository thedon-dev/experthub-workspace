"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import AdmissionCard from '@/components/cards/AdmissionCard';
import SearchNav from '@/components/SearchNav';
import axios from 'axios';
import { UserType } from '@/types/UserType';

const addmissions = () => {
  const [active, setActive] = useState("students")
  const [students, setStudents] = useState<UserType | []>([])
  const [tutors, setTutors] = useState<UserType | []>([])
  const [all, setAll] = useState<UserType | []>([])
  const [allTutor, setAllTutor] = useState<UserType | []>([])

  const getStudents = () => {
    axios.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        setAll(response.data.students)
        console.log(response.data)
      })
  }
  const getTutors = () => {
    axios.get('user/instructors')
      .then(function (response) {
        setTutors(response.data.instructors)
        setAllTutor(response.data.instructors)
        // console.log(response.data)
      })
  }

  useEffect(() => {
    getStudents()
    getTutors()
  }, [])

  const search = (value: string) => {
    const results = all.filter((obj: UserType) => obj.fullname.toLowerCase().includes(value.toLowerCase()));
    setStudents(results)
  }

  const searchTutor = (value: string) => {
    const results = allTutor.filter((obj: UserType) => obj.fullname.toLowerCase().includes(value.toLowerCase()));
    setTutors(results)
  }

  return (
    <DashboardLayout>
      {/* <SearchNav /> */}

      <section className='m-4'>
        <div className='flex justify-between lg:w-[40%]'>
          <div onClick={() => setActive("students")} className={active === "students" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>Students</p>
          </div>
          <div onClick={() => setActive("mentors")} className={active === "mentors" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>Training Providers</p>
          </div>
        </div>
        {(() => {
          switch (active) {
            case 'students':
              return <div>
                <div className='w-1/2 relative my-4'>
                  <input onChange={e => search(e.target.value)} type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
                  <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
                </div>
                {
                  students.map((student: UserType, index: any) => <AdmissionCard role={active} tutor={student} key={index} />)
                }

              </div>
            case 'mentors':
              return <div>
                <div className='w-1/2 relative my-4'>
                  <input onChange={e => searchTutor(e.target.value)} type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
                  <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
                </div>
                {
                  tutors.map((student: UserType, index: any) => <AdmissionCard role={active} tutor={student} key={index} />)
                }
              </div>
            default:
              return null
          }
        })()}
      </section>
    </DashboardLayout>
  );
};

export default addmissions;