"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import AdmissionCard from '@/components/cards/AdmissionCard';
import SearchNav from '@/components/SearchNav';
import axios from 'axios';

const addmissions = () => {
  const [active, setActive] = useState("students")
  const [students, setStudents] = useState([])
  const [tutors, setTutors] = useState([])


  const getStudents = () => {
    axios.get('user/students')
      .then(function (response) {
        setStudents(response.data.students)
        console.log(response.data)
      })
  }
  const getTutors = () => {
    axios.get('user/instructors')
      .then(function (response) {
        setTutors(response.data.instructors)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getStudents()
    getTutors()
  }, [])
  return (
    <DashboardLayout>
      <SearchNav />
      <section className='m-4'>
        <div className='flex justify-between w-[40%]'>
          <div onClick={() => setActive("students")} className={active === "students" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>My Students</p>
          </div>
          <div onClick={() => setActive("mentors")} className={active === "mentors" ? "border-b-2 border-[#DC9F08] py-2" : "py-2 cursor-pointer"}>
            <p className='font-medium text-lg'>Training Providers</p>
          </div>
        </div>
        {(() => {
          switch (active) {
            case 'students':
              return <div>
                {
                  students.map((student, index) => <AdmissionCard role={active} tutor={student} key={index} />)
                }

              </div>
            case 'mentors':
              return <div>
                {
                  tutors.map((student, index) => <AdmissionCard role={active} tutor={student} key={index} />)
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