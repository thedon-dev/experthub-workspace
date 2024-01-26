"use client"

import DashboardLayout from '@/components/DashboardLayout';
import SearchNav from '@/components/SearchNav';
import AdmissionCard from '@/components/cards/AdmissionCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const tutor = () => {
  const [instructors, setInstructors] = useState([])

  const getTutors = () => {
    axios.get('https://shark-app-2-k9okk.ondigitalocean.app/user/instructors')
      .then(function (response) {
        setInstructors(response.data.instructors)
        console.log(response.data)
      })
  }

  useEffect(() => {
    getTutors()
  }, [])
  return (
    <DashboardLayout>
      <SearchNav />
      <section className='m-4'>
        <p className='text-lg my-3 font-medium'>Training Providers</p>
        {instructors.map((tutor) => <AdmissionCard tutor={tutor} />)}
      </section>
    </DashboardLayout>
  );
};

export default tutor;