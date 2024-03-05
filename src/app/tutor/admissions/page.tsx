"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import AdmissionCard from '@/components/cards/AdmissionCard';
import SearchNav from '@/components/SearchNav';
import axios from 'axios';
import { useAppSelector } from '@/store/hooks';
import { UserType } from '@/types/UserType';

const addmissions = () => {
  const [active, setActive] = useState("students")
  const user = useAppSelector((state) => state.value);
  const [students, setStudents] = useState<UserType | []>([])
  const [all, setAll] = useState<UserType | []>([])

  const getStudents = () => {
    axios.put('user/mystudents', {
      course: user.assignedCourse
    })
      .then(function (response) {
        setStudents(response.data.students)
        setAll(response.data.students)
        console.log(response.data)
      })
  }

  const search = (value: string) => {
    const results = all.filter((obj: UserType) => obj.fullname.toLowerCase().includes(value.toLowerCase()));
    setStudents(results)
  }


  useEffect(() => {
    getStudents()
  }, [])
  return (
    <DashboardLayout>
      {/* <SearchNav /> */}
      <div className='w-1/2 relative m-4'>
        <input onChange={e => search(e.target.value)} type="text" className='pl-10 p-2 w-full rounded-md border border-[#1E1E1E8A] bg-transparent' placeholder='Search courses, trainer, test etc' />
        <img className='absolute top-2 w-6 left-2' src="/images/icons/search.svg" alt="" />
      </div>
      <section className='m-4'>
        <div className='flex justify-between lg:w-1/2'>
          <div onClick={() => setActive("students")} className={active === "students" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Students</p>
          </div>
          <div onClick={() => setActive("mentees")} className={active === "mentees" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Mentees</p>
          </div>
          <div onClick={() => setActive("graduates")} className={active === "graduates" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Graduates</p>
          </div>
        </div>
        {(() => {
          switch (active) {
            case 'students':
              return <div>
                {
                  students.map((student: UserType, index: any) => <AdmissionCard role={active} tutor={student} key={index} />)
                }
              </div>
            case 'mentees':
              return <div>
                {
                  students.map((student: UserType, index: any) => <AdmissionCard role={active} tutor={student} key={index} />)
                }
              </div>
            case 'graduates':
              return <div>
                {
                  students.map((student: UserType, index: any) => student.graduate && <AdmissionCard role={active} tutor={student} key={index} />)
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