"use client"

import DashboardLayout from '@/components/DashboardLayout';
import React, { useEffect, useState } from 'react';
import AdmissionCard from '@/components/cards/AdmissionCard';
import SearchNav from '@/components/SearchNav';
import axios from 'axios';

const addmissions = () => {
  const [active, setActive] = useState("students")

  const getStudents = () => {
    axios.get('https://shark-app-2-k9okk.ondigitalocean.app/user/students')
      .then(function (response) {
        // setReccomended(response.data.courses)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getStudents()
  })
  return (
    <DashboardLayout>
      <SearchNav />
      <section className='m-4'>
        <div className='flex justify-between w-1/2'>
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
                {/* <AdmissionCard />
                <AdmissionCard /> */}
              </div>
            case 'mentees':
              return <div>

              </div>
            case 'graduates':
              return <div>

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